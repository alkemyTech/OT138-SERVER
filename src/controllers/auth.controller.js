import sequelize, { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Joi } from "express-validation";
import { User, Role } from "../models";
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

/**
 * Authenticates the user if the credentials are valid.
 * @returns User data, access token and refresh token
 */
export const login = async (req, res) => {
    let jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
        console.warn('JWT_SECRET env variable not set, using default value');
        jwtSecret = "SECRET_KEY";
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
                status: 401,
                message: "Incorrect email or password",
                accessToken: null,
                refreshToken: null,
            });
        }

        const { password: savedPassword } = user;

        const passwordMatch = await bcrypt.compare(password, savedPassword);

        if (passwordMatch) {
            const accessToken = jwt.sign({ email: email }, jwtSecret, {
                expiresIn: "30m",
            });
            const refreshToken = jwt.sign({ email: email }, jwtSecret, {
                expiresIn: "7d",
            });

            // Remove sensitive information
            const { password, ...userData } = user.dataValues;

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
                    user: userData,
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
        console.log(error);
        return res.status(200).json({
            error: true,
            status: "500",
            message: "An error occurred while logging the User.",
            content: error,
        });
    }
};

export const refresh = async (req, res) => {
    let jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
        console.warn('JWT_SECRET env variable not set, using default value');
        jwtSecret = "SECRET_KEY";
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
    const accessToken = jwt.sign({ email: email }, jwtSecret, {
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
