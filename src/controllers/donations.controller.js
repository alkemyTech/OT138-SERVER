import { Joi } from "express-validation";
import { Donations, UserDonations, User } from "../models";
import { Op } from "sequelize";
import { responses, formatValidationErrors, paginate } from "../helpers";
import { InvalidArgumentsError } from "../helpers/exceptions";

export const getDonations = async (req, res) => {
  try {
    const donations = await paginate(
      Donations,
      req.query.limit,
      req.query.page,
      [["createdAt", "DESC"]],
      { status: { [Op.ne]: 0 } },
      {
        include: [
          {
            model: UserDonations,
            attributes: ["id_user"],
            include: [
              {
                model: User,
                attributes: ["image"],
              },
            ],
          },
        ],
      }
    );

    let status = "200";
    let message = "success";

    if (donations?.count === 0) {
      status = "204";
      message = "No donations found";
    }

    return res.status(200).json({
      ...responses.success,
      status,
      message,
      result: donations,
    });
  } catch (err) {
    let resData = {};

    if (err instanceof InvalidArgumentsError) {
      resData = {
        ...responses.validationError,
        errorFields: formatValidationErrors(err.errors),
        message: "Invalid query params",
      };
    } else {
      console.log(err);
      resData = {
        ...responses.internalError,
        message:
          "An unexpected error occurred when retrieving data form database",
      };
    }
    return res.status(200).json(resData);
  }
};
