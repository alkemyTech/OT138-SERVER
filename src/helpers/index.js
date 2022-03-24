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
 * @param {Object} sequelizeOptions Object containing supported sequelize query options. Default: {}
 * @returns Object containing the results and information about the pagination
 * @throws InvalidArgumentsError if arguments limit or page are invalid.
 */
export const paginate = async (
  model,
  limit = 10,
  page = 1,
  order = [],
  where = {},
  sequelizeOptions = {}
) => {
  // Validate params
  const validationSchema = Joi.object({
    limit: Joi.number().integer().greater(0),
    page: Joi.number().integer().greater(0),
  });
  const { error } = validationSchema.validate({ limit, page });

  if (error) {
    throw new InvalidArgumentsError("Invalid pagination params", error);
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
    ...sequelizeOptions,
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

/**
 * Creates a JWT string representing an access token
 * Expiration (in seconds) is obtained from the ACCESS_TOKEN_DURATION env variable
 * The secret phrase used to sign the token is obtained from the JWT_SECRET env variable
 * @param {*} payload Object to encode
 * @returns JWT with the encoded payload
 */
export const signAccessToken = (payload) => {
  const JWT_SECRET = process.env.JWT_SECRET ?? "SECRET_KEY";
  const ACCESS_TOKEN_DURATION = parseInt(
    process.env.ACCESS_TOKEN_DURATION ?? 1200
  );

  // Remove previous timestamps
  const { iat, exp, ...data } = payload;

  return jwt.sign(data, JWT_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
};

/**
 * Creates a JWT string representing a refresh token
 * Expiration (in seconds) is obtained from the REFRESH_TOKEN_DURATION env variable
 * The secret phrase used to sign the token is obtained from the JWT_SECRET env variable
 * @param {*} payload Object to encode
 * @returns JWT with the encoded payload
 */
export const signRefreshToken = (payload) => {
  const REFRESH_TOKEN_DURATION = parseInt(
    process.env.REFRESH_TOKEN_DURATION ?? 604800
  );
  const JWT_SECRET = process.env.JWT_SECRET ?? "SECRET_KEY";

  // Remove previous timestamps
  const { iat, exp, ...data } = payload;

  return jwt.sign(data, JWT_SECRET, { expiresIn: REFRESH_TOKEN_DURATION });
};

/**
 * Generates an array containing the arguments for the 'res.cookie' function.
 * The cookie name is obtained from the ACCESS_TOKEN_COOKIE_NAME env variable
 * The maxAge attribute of the cookie is set to REFRESH_TOKEN_DURATION env variable
 * @param {*} token Content of the cookie
 * @returns Array with the format ['cookieName', 'token', cookieConfig]
 */
export const configureAccessTokenCookie = (token) => {
  const ACCESS_TOKEN_COOKIE_NAME =
    process.env.ACCESS_TOKEN_COOKIE_NAME ?? "access_token";
  const REFRESH_TOKEN_DURATION = parseInt(
    process.env.REFRESH_TOKEN_DURATION ?? 604800
  );

  return _getCookieConfig(
    ACCESS_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_DURATION,
    token
  );
};

/**
 * Generates an array containing the arguments for the 'res.cookie' function.
 * The cookie name is obtained from the REFRESH_TOKEN_COOKIE_NAME env variable
 * The maxAge attribute of the cookie is set to REFRESH_TOKEN_DURATION env variable
 * @param {*} token Content of the cookie
 * @returns Array with the format ['cookieName', 'token', cookieConfig]
 */
export const configureRefreshTokenCookie = (token) => {
  const REFRESH_TOKEN_COOKIE_NAME =
    process.env.REFRESH_TOKEN_COOKIE_NAME ?? "refresh_token";
  const REFRESH_TOKEN_DURATION = parseInt(
    process.env.REFRESH_TOKEN_DURATION ?? 604800
  );

  return _getCookieConfig(
    REFRESH_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_DURATION,
    token
  );
};

const _getCookieConfig = (name, maxAgeSeconds, payload) => {
  return [
    name,
    payload,
    {
      maxAge: maxAgeSeconds * 1000,
      sameSite: "none",
      path: "/",
      httpOnly: true,
      secure: true,
    },
  ];
};

export const responses = Object.freeze({
  conflict: {
    error: true,
    errorCode: "REQ003",
    status: "409",
    message: "Resource already exists",
  },
  badRequest: {
    error: true,
    errorCode: "REQ002",
    status: "400",
    message: "Bad request",
  },
  notFound: {
    error: true,
    errorCode: "REQ001",
    status: "404",
    message: "Resource not found",
  },
  forbidden: {
    error: true,
    errorCode: "AUT002",
    status: "403",
    message: "Forbidden",
  },
  notAuthenticated: {
    error: true,
    errorCode: "AUT001",
    status: "401",
    message: "Authentication required",
  },
  sessionExpired: {
    error: true,
    errorCode: "AUT003",
    status: "401",
    message: "Session expired",
  },
  validationError: {
    error: true,
    errorCode: "VAL001",
    errorFields: {},
    status: "400",
    message: "Validation error",
  },
  internalError: {
    error: true,
    errorCode: "SRV001",
    status: "500",
    message: "Validation error",
  },
  invalidCredentials: {
    error: true,
    errorCode: "AUT004",
    status: "400",
    message: "Invalid credentials",
  },
  success: {
    error: false,
    status: "200",
    message: "",
    result: {},
  },
});

/**
 * Returns an object where keys are field names and values are error messages.
 * @param {*} error Joi errors array.
 * @returns Object in the form { fieldName: errorMessage }
 */
export const formatValidationErrors = (error) => {
  let errorFields = {};

  if (error.details) {
    error.details.forEach((e) => {
      errorFields[e.context.key] = e.message;
    });
  }

  return errorFields;
};
