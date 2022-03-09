import jwt from "jsonwebtoken";
import { Joi } from "express-validation";
import { InvalidArgumentsError } from "./exceptions";

/**
 * Paginates all records of the given model.
 * May throw an exception if the query fails.
 * @param {*} model Sequelize model class
 * @param {Number} limit Amount of items returned. Default: 10
 * @param {Number} page Page of the results. Default: 1
 * @param {Array} order Sequelize order array. Default: []
 * @param {Object} where Conditions (Sequelize where property) used to filter the results. Default: {}
 * @returns Object containing the results and information about the pagination
 * @throws InvalidArgumentsError if arguments limit or page are invalid.
 */
export const paginate = async (
    model,
    limit = 10,
    page = 1,
    order = [],
    where = {}
) => {
    // Validate params
    const validationSchema = Joi.object({
        limit: Joi.number().integer().greater(0),
        page: Joi.number().integer().greater(0),
    });
    const { error } = validationSchema.validate({ limit, page });

    if (error) {
        throw new InvalidArgumentsError("Invalid pagination params");
    }

    // Cast params
    limit = parseInt(limit);
    page = parseInt(page);

    const result = {};

    const data = await model.findAndCountAll({
        subQuery: false,
        limit: limit,
        offset: (page - 1) * limit, // -1 so first page starts from 1
        order: order,
        where: where,
    });

    const pages = Math.ceil(data.count / limit);

    if (page > 1 && page <= pages) {
        result.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    if (page < pages) {
        result.next = {
            page: page + 1,
            limit: limit,
        };
    }

    result.items = data.rows;
    result.count = data.rows.length;
    result.pages = pages;

    return result;
};

/**
 * Extracts field list array with error fields in a Joi validation error object
 * @param {Object} joiValidationError A instance of a Joi validation error object.
 * @returns Array containing the fields with validation error.
 * Note: by default Joi exits validation on first error so will return only one field,
 * to check all fields {abortEarly: false} must be passed as an option.
 * See https://joi.dev/api/?v=17.6.0#anyvalidatevalue-options
 */
export const getJoiErrorFields = (joiValidationError) => {
    return joiValidationError.details.map((value) => {
        return value.context.key;
    });
};

export const signAccessToken = (payload) => {
    const ACCESS_TOKEN_DURATION = process.env.ACCESS_TOKEN_DURATION || 1200;
    const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

    const { exp, ...data } = payload;

    return jwt.sign(data, JWT_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
}

export const signRefreshToken = (payload) => {
    const REFRESH_TOKEN_DURATION = process.env.REFRESH_TOKEN_DURATION || 604800;
    const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

    const { exp, ...data } = payload;

    return jwt.sign(data, JWT_SECRET, { expiresIn: REFRESH_TOKEN_DURATION });
}

export const configureAccessTokenCookie = (token) => {
    const ACCESS_TOKEN_COOKIE_NAME = process.env.ACCESS_TOKEN_COOKIE_NAME || 'access_token';
    const ACCESS_TOKEN_DURATION = process.env.ACCESS_TOKEN_DURATION || 1200;

    return [
        ACCESS_TOKEN_COOKIE_NAME,
        token,
        {
            maxAge: ACCESS_TOKEN_DURATION * 1000,
            sameSite: "none",
            path: "/",
            httpOnly: true,
            secure: true
        }
    ];
}

export const configureRefreshTokenCookie = (token) => {
    const REFRESH_TOKEN_COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refresh_token';
    const REFRESH_TOKEN_DURATION = process.env.REFRESH_TOKEN_DURATION || 604800;

    return [
        REFRESH_TOKEN_COOKIE_NAME,
        token,
        {
            maxAge: REFRESH_TOKEN_DURATION * 1000,
            sameSite: "none",
            path: "/",
            httpOnly: true,
            secure: true
        }
    ];
}