import mercadopago from "mercadopago";
import axios from "axios";
import { Donations, UserDonations } from "../models";

export const processPayment = async (req, res) => {
  try {
    const { uuid, value, user_id, message } = req?.query;

    await Donations.create(
      {
        id_donation: uuid,
        id_mercadopago: null,
        message: message == "null" ? null : message?.toString(),
        value: value,
        status: 0,
      },
      { omitNull: true, ignoreDuplicates: true }
    ).catch((error) => console.log(error));

    let json = {
      userID: req?.user?.id ? req?.user?.id : null,
      donationUUID: uuid,
      value: value,
    };

    mercadopago.configure({
      access_token: process.env.MARKETPLACE_ACCESS_TOKEN,
    });

    const preference = {};

    const item = {
      title: `Donación de $${value} a Somos Más ONG`,
      unit_price: parseInt(value),
      currency_id: "UYU",
      quantity: 1,
    };

    let payer = {
      email:
        req?.user && req?.user?.email
          ? req?.user?.email
          : "anonimo@somosmas.ong",
    };

    preference.payer = payer;
    preference.items = [item];
    preference.back_urls = {
      success: `${process.env.FRONTEND_URL}`,
    };
    preference.notification_url = `${process.env.MERCADOPAGO_NOTIFICATION_URL}`;

    preference.auto_return = "approved";

    // preference.marketplace_fee = (5 / 100) * precio; // cobro comision.

    preference.external_reference = JSON.stringify(json);

    mercadopago.preferences
      .create(preference)
      .then((response) => {
        res.status(200).json({
          preferenceId: response.body.id,
          urlId: response.body.init_point,
        });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: true,
      status: "400",
      message: error,
    });
  }
};

export const instantPaymentNotification = async (req, res) => {
  if (req?.query?.topic == "payment") {
    let paymentDataParsed;
    await axios
      .get(`https://api.mercadopago.com/v1/payments/${req?.query?.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MARKETPLACE_ACCESS_TOKEN}`,
        },
      })
      .then(async (payment) => {
        if (payment?.data?.status == "approved") {
          paymentDataParsed = await JSON.parse(
            payment?.data?.external_reference
          );
          await Donations.update(
            {
              id_mercadopago: req?.query?.id,
              status: 1,
            },
            {
              where: { id_donation: paymentDataParsed?.donationUUID },
            }
          ).then(async () => {
            await UserDonations.create(
              {
                id_donation: paymentDataParsed?.donationUUID,
                id_user: paymentDataParsed?.userID
                  ? paymentDataParsed?.userID
                  : null,
              },
              { ignoreDuplicates: true }
            )
              .then(async () => {
                console.log(
                  `💵 **Somos Más ONG - Transacciones** 💵 \nPayment ID: ${paymentDataParsed?.donationUUID}\nMercadoPago ID: ${req?.query?.id}\nValor: $${paymentDataParsed?.value} UYU\nUsuario ID: ${paymentDataParsed?.userID}`
                );
              })
              .catch((error) => console.log(error));
          });
        }
      })
      .catch((error) => console.log(error));
  } else {
  }
  res.status(200).json({});
};
