import sequelize, { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Joi } from "express-validation";
import { User, Role } from "../models";
import jwt from "jsonwebtoken";
import {
  configureRefreshTokenCookie,
  signAccessToken,
  signRefreshToken,
  responses,
  formatValidationErrors,
} from "../helpers";

const registerValidationSchema = Joi.object({
  firstName: Joi.string()
    .regex(/[a-zA-Z0-9]{3,50}/)
    .required(),
  lastName: Joi.string()
    .regex(/[a-zA-Z0-9]{3,50}/)
    .required(),
  phone: Joi.number(),
  email: Joi.string()
    .email()
    .regex(/[a-zA-Z0-9]{3,50}/)
    .required(),
  password: Joi.string()
    .regex(/[a-zA-Z0-9]{3,50}/)
    .required(),
});

export const register = async (req, res) => {
  const { error, value } = registerValidationSchema.validate(req.body);

  if (error) {
    return res.status(200).json({
      ...responses.validationError,
      errorFields: formatValidationErrors(error),
    });
  }

  try {
    const { firstName, lastName, phone, email, password } = value;

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
      },
    }).then(async (response) => {
      const { id } = response[0];
      !response[1]
        ? res.status(200).json({
            ...responses.validationError,
            errorCode: "REQ002",
            errorFields: {
              email: "Email not available",
            },
            message: "Email not available",
          })
        : res.status(200).json({
            ...responses.success,
            message: "The user was created successfully",
            result: {
              id,
              firstName,
              lastName,
              phone,
              email,
            },
          });
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      ...responses.internalError,
      message: "An error occurred while creating the User",
    });
  }
};

/**
 * Authenticates the user if the credentials are valid.
 * @returns User data, access token and refresh token
 */
export const login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET ?? "SECRET_KEY";

  if (!JWT_SECRET) {
    console.warn("JWT_SECRET env variable not set, using default value");
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: {
        include: ["password", [sequelize.col("role.name"), "roleName"]],
      },
      include: [
        {
          model: Role,
          required: false,
          as: "role",
          attributes: [],
        },
      ],
    });

    if (!user) {
      /* Intentional error to avoid providing information about the existence of the user's email address. */
      return res.status(200).json({
        ...responses.invalidCredentials,
      });
    }

    const { password: savedPassword } = user;

    const passwordMatch = await bcrypt.compare(password, savedPassword);

    if (passwordMatch) {
      const payload = { email: email };
      const accessToken = signAccessToken(payload);
      const refreshToken = signRefreshToken(payload);

      // Remove sensitive information
      const { password, ...userData } = user.dataValues;

      return res
        .status(200)
        .cookie(...configureRefreshTokenCookie(refreshToken))
        .json({
          ...responses.success,
          result: {
            user: userData,
            accessToken,
            refreshToken,
          },
        });
    }
    return res.status(200).send({
      ...responses.invalidCredentials,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      ...responses.internalError,
    });
  }
};

/* Refresh token controller */
export const refresh = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET ?? "SECRET_KEY";
  const REFRESH_TOKEN_COOKIE_NAME =
    process.env.REFRESH_TOKEN_COOKIE_NAME ?? "refresh_token";

  if (!JWT_SECRET) {
    console.warn("JWT_SECRET env variable not set, using default value");
  }

  // Get the refresh token from the cookie or fall back to the request body.
  const refreshToken =
    req.cookies[REFRESH_TOKEN_COOKIE_NAME] ?? req.body.refreshToken;

  if (!refreshToken) {
    return res.status(200).json({
      ...responses.badRequest,
      message: "Refresh token not found",
    });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, JWT_SECRET);
    const newToken = signAccessToken(decodedToken);
    return res.status(200).json({
      ...responses.success,
      result: {
        accessToken: newToken,
        refreshToken: refreshToken,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      ...responses.notAuthenticated,
      message: "Invalid token",
    });
  }
};

export const imLoggedIn = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        ...responses.success,
        result: req.user,
      });
    } else {
      res.status(200).json({
        ...responses.notAuthenticated,
        message: "Not authenticated",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const profile = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    ...responses.success,
    result: user,
  });
};

export const logout = async (req, res) => {
  removeRefreshCookie(res);
  return res.status(200).json({
    ...responses.success,
    message: "Logged out",
  });
};

export const updateAccount = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(200).json({
      ...responses.badRequest,
      message: "User id not provided",
    });
  }

  const { firstName, lastName, image } = req.body;

  try {
    const instance = await User.findByPk(userId);

    if (!instance) {
      return res.status(200).json({
        ...responses.notFound,
        message: "User not found",
      });
    }

    instance.set(
      {
        firstName: firstName,
        lastName: lastName,
        image: image,
        updatedAt: new Date(),
      },
      ["firstName, lastName, image, updatedAt"]
    );

    await instance.save();

    return res.status(200).json({
      ...responses.success,
      result: instance,
      message: "The data was updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      ...responses.internalError,
    });
  }
};

export const deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    await User.destroy({ where: { id: userId } });

    removeRefreshCookie(res);

    return res.status(200).json({
      ...responses.success,
      message: "Account deleted",
    });
  } catch (err) {
    return res.status(200).json({
      ...responses.internalError,
      message: "Could not delete account due to internal error",
    });
  }
};

function removeRefreshCookie(response) {
  const REFRESH_TOKEN_COOKIE_NAME =
    process.env.REFRESH_TOKEN_COOKIE_NAME ?? "refresh_token";
  response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
}
