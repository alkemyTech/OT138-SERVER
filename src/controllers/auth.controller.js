import sequelize, { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Joi } from "express-validation";
import { User } from "../models";
import jwt from "jsonwebtoken";
import { verifyRefresh } from "../helpers";

export const registerValidation = {
  body: Joi.object({
    firstName: Joi.string()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
    lastName: Joi.string()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
    email: Joi.string()
      .email()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
  }),
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    }).then(async (response) => {
      const { id } = response[0];
      !response[1]
        ? res.status(200).json({
            error: true,
            status: "409",
            message: "The user already exists.",
            user: null,
          })
        : res.status(200).json({
            error: false,
            status: "200",
            message: "The user was created successfully.",
            user: {
              id,
              firstName,
              lastName,
              email,
            },
          });
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: true,
      status: "500",
      message: "An error occurred while creating the User.",
      content: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      raw: true,
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              sequelize.where(
                sequelize.fn("lower", sequelize.col("email")),
                sequelize.fn("lower", `${email}`)
              ),
            ],
          },
        ],
      },
    });
    if (!user) {
      /* Intentional error to avoid providing information about the existence of the user's email address. */
      return res.status(200).json({
        error: true,
        status: 401,
        message: "Incorrect email or password",
        accessToken: null,
        refreshToken: null,
      });
    }

    const { password: userPassword } = user;

    const passwordMatch = bcrypt.compare(password, userPassword);

    if (passwordMatch) {
      const accessToken = jwt.sign({ email: email }, "accessSecret", {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign({ email: email }, "refreshSecret", {
        expiresIn: "7d",
      });

      return res
        .status(200)
        .cookie("access-token", `${accessToken}`, {
          maxAge: 120000, // would expire after 2 minutes
          sameSite: "none",
          path: "/",
          httpOnly: true,
          secure: true,
        })
        .cookie("refresh-token", `${accessToken}`, {
          maxAge: 600000, // would expire after 10 minutes
          sameSite: "none",
          path: "/",
          httpOnly: true,
          secure: true,
        })
        .json({
          error: false,
          status: 200,
          message: "User was authenticated successfully.",
          accessToken,
          refreshToken,
        });
    }
    return res.status(200).send({
      error: true,
      status: 401,
      message: "Incorrect email or password",
      accessToken: null,
      refreshToken: null,
    });
  } catch (error) {
    return res.status(200).json({
      error: true,
      status: "500",
      message: "An error occurred while logging the User.",
      content: error,
    });
  }
};

export const refresh = async (req, res) => {
  const { email, refreshToken } = req.body;
  const isValid = verifyRefresh({ email, refreshToken });

  if (!isValid) {
    return res.status(200).json({
      error: true,
      status: "401",
      message: "Invalid token, try login again.",
    });
  }
  const accessToken = jwt.sign({ email: email }, "accessSecret", {
    expiresIn: "30m",
  });
  return res.status(200).json({ error: false, status: "200", accessToken });
};

export const imLoggedIn = async (req, res) => {
  try {
    if (req.email) {
      res.status(200).json({
        error: false,
        status: 200,
        message: "You are logged in.",
      });
    } else {
      res.status(200).json({
        error: true,
        status: 401,
        message: `You are not logged in.`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: { [Op.eq]: req.email },
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "image",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    });
    if (!user) {
      res.status(200).json({
        error: true,
        status: "404",
        message: "The user was not found.",
        user: null,
      });
    } else {
      res.status(200).json({
        error: false,
        status: "200",
        message: "User was successfully found.",
        user,
      });
    }
  } catch (error) {
    return res.status(200).json({
      error: true,
      status: "500",
      message: "An error occurred while searching for the user.",
      content: error,
    });
  }
};
