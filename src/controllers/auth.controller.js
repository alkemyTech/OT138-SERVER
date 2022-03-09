import sequelize, { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Joi } from "express-validation";
import { User, Role } from "../models";
import jwt from "jsonwebtoken";
import {
    configureRefreshTokenCookie,
    signAccessToken,
    signRefreshToken
} from "../helpers";

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

/**
 * Authenticates the user if the credentials are valid.
 * @returns User data, access token and refresh token
 */
export const login = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET ?? 'SECRET_KEY';

    if (!JWT_SECRET) {
        console.warn('JWT_SECRET env variable not set, using default value');
    }

    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: {
                include: [
                    'password',
                    [sequelize.col('role.name'), 'roleName']
                ]
            },
            include: [{
                model: Role,
                required: false,
                as: 'role',
                attributes: []
            }],
        });

        if (!user) {
            /* Intentional error to avoid providing information about the existence of the user's email address. */
            return res.status(200).json({
                error: true,
                errorCode: 'REQ002',
                status: "400",
                message: "Invalid credentials"
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
                    error: false,
                    status: "200",
                    message: "User was authenticated successfully.",
                    user: userData,
                    accessToken,
                    refreshToken
                });

        }
        return res.status(200).send({
            error: true,
            errorCode: 'REQ002',
            status: "400",
            message: "Invalid credentials"
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error: true,
            errorCode: 'SRV001',
            status: "500",
            message: "An error occurred while logging the User."
        });
    }
};

export const refresh = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET ?? 'SECRET_KEY';
    const REFRESH_TOKEN_COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME ?? 'refresh_token';

    if (!JWT_SECRET) {
        console.warn('JWT_SECRET env variable not set, using default value');
    }

    // Get the refresh token from the cookie or fall back to the request body.
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME] ?? req.body.refreshToken;

    if (!refreshToken) {
        return res.status(200).json({
            error: true,
            errorCode: "REQ002",
            status: "401",
            message: "Refresh token not found",
        });
    }

    try {
        const decodedToken = jwt.verify(refreshToken, JWT_SECRET);
        const newToken = signAccessToken(decodedToken);
        return res
            .status(200)
            .json({
                error: false,
                status: "200",
                accessToken: newToken,
                refreshToken: refreshToken
            });

    } catch (err) {
        console.log(err)
        return res
            .status(200)
            .json({
                error: true,
                errorCode: 'AUT001',
                status: "401",
                message: "Invalid Token"
            });
    }
};

export const imLoggedIn = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({
                error: false,
                user: req.user,
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
    const user = req.user;

    return res.status(200).json({
        error: false,
        status: "200",
        message: "User was successfully found.",
        user,
    });
};
