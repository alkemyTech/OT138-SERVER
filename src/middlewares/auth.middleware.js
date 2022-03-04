import jwt from "jsonwebtoken";
import sequelize from "sequelize";
import { User, Role } from "../models";
import { Joi } from "express-validation";

/**
 * Checks if the user is authenticated and appends the user instance (if valid) to the request object.
 */
export const isLoggedIn = async (req, res, next) => {
  let token = req.get("Authorization");
  let decoded = {};
  let jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.warn("JWT_SECRET env variable not set, using default value");
    jwtSecret = "SECRET_KEY";
  }

  // Authorization header not set
  if (!token) {
    return res.status(200).json({
      error: true,
      status: "401",
      message: "Authorization header not set",
    });
  }

  token = token.split(" ")[1];

  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (error) {
    return res
      .status(200)
      .json({ error: true, status: "401", message: "Invalid token" });
  }

  // Find user using the email encoded in the jwt
  const user = await User.findOne({
    where: {
      email: decoded.email,
    },
    attributes: {
      include: [[sequelize.col("role.name"), "roleName"]],
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

  // No user found with the email provided
  if (user === null) {
    return res
      .status(200)
      .json({ error: true, status: "404", message: "User not found" });
  }

  // Append user object to request object
  req.user = user;

  next();
};

/**
 * If the user has the Admin role, continues execution, otherwise returns an error response.
 * This middleware needs to be placed after isLoggedIn in the chain, since it checks the user instance provided in the request.
 */
export const isAdmin = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res
      .status(200)
      .json({
        error: true,
        status: "401",
        message: "User is not authenticated",
      });
  }

  if (user.roleId === null) {
    return res
      .status(200)
      .json({
        error: true,
        status: "403",
        message: "User does not have the admin Role",
      });
  }

  const userRole = await Role.findOne({
    where: {
      id: user.roleId,
    },
  });

  if (userRole === null || userRole.name !== "Admin") {
    return res
      .status(200)
      .json({
        error: true,
        status: "403",
        message: "User does not have the admin Role",
      });
  }

  next();
};

/**
 * Verifies that the request body contains the properties email and password required to authenticate the user.
 */
export const loginValidator = async (req, res, next) => {
  const loginValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
    .unknown()
    .options({ abortEarly: false });

  const { error, value } = loginValidationSchema.validate(req.body);

  if (error) {
    return res.status(200).json({
      error: true,
      status: "400",
      message: "Invalid request",
      invalidFields: error.details,
    });
  }

  next();
};
