import jwt, { TokenExpiredError } from "jsonwebtoken";
import sequelize from "sequelize";
import { User, Role } from "../models";
import { Joi } from "express-validation";

/**
 * Checks if the user is authenticated and appends the user instance (if valid) to the request object.
 */
export const isLoggedIn = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";
    let token;
    let decodedToken;

    if (!JWT_SECRET) {
        console.warn("JWT_SECRET env variable not set, using default value");
    }

    token = req.get("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(200).json({
            error: true,
            errorCode: "AUT001",
            status: "401",
            message: "Access token not found",
        });
    }

    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res
                .status(200)
                .json({
                    error: true,
                    errorCode: 'AUT003',
                    status: "401",
                    message: "Expired token"
                });
        } else {
            return res
                .status(200)
                .json({
                    error: true,
                    errorCode: 'AUT001',
                    status: "401",
                    message: "Invalid token"
                });
        }
    }

    // Find user using the email encoded in the jwt
    const user = await User.findOne({
        where: {
            email: decodedToken.email,
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
                errorCode: "AUT001",
                message: "User is not authenticated",
            });
    }

    if (user.roleId === null) {
        return res
            .status(200)
            .json({
                error: true,
                status: "403",
                errorCode: "AUT002",
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
                errorCode: "AUT002",
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
