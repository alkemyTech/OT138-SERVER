import sequelize, { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Joi } from "express-validation";
import { User, Role } from "../models";
import jwt from "jsonwebtoken";
import {
    configureAccessTokenCookie,
    configureRefreshTokenCookie,
    signAccessToken,
    signRefreshToken,
    verifyRefresh
} from "../helpers";
import { UnsupportedSessionTypeError } from '../helpers/exceptions';

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
    const SESSION_TYPE = process.env.SESSION_TYPE || 'cookie';

    if (!JWT_SECRET) {
        console.warn('JWT_SECRET env variable not set, using default value');
    }

    if (SESSION_TYPE !== 'cookie' && SESSION_TYPE !== 'token') {
        throw UnsupportedSessionTypeError('Invalid session type');
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

            switch (SESSION_TYPE) {
                case 'cookie':
                    return res
                        .status(200)
                        .cookie(...configureAccessTokenCookie(accessToken))
                        .cookie(...configureRefreshTokenCookie(refreshToken))
                        .json({
                            error: false,
                            status: "200",
                            message: "User was authenticated successfully.",
                            user: userData,
                        });
                case 'header':
                    return res
                        .status(200)
                        .json({
                            error: false,
                            status: "200",
                            message: "User was authenticated successfully.",
                            user: userData,
                            accessToken,
                            refreshToken
                        });
            }

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
    let JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        console.warn('JWT_SECRET env variable not set, using default value');
        JWT_SECRET = "SECRET_KEY";
    }

    const { email, refreshToken } = req.body;
    const isValid = verifyRefresh({ email, refreshToken });

    if (!isValid) {
        return res.status(200).json({
            error: true,
            status: "401",
            message: "Invalid token, try login again.",
        });
    }
    const accessToken = jwt.sign({ email: email }, JWT_SECRET, {
        expiresIn: "30m",
    });
    return res.status(200).json({ error: false, status: "200", accessToken });
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
