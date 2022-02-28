import jwt from "jsonwebtoken";

export const verifyRefresh = ({ email, refreshToken }) => {
    try {
        const decoded = jwt.verify(refreshToken, "refreshSecret");
        if (decoded.email === email) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

/**
 * Paginates all records of the given model.
 * May throw an exception if the query fails.
 * @param {*} model Sequelize model class
 * @param {Number} limit Amount of items returned. Default: 10
 * @param {Number} page Page of the results. Default: 1
 * @param {Array} order Sequelize order. Default: []
 * @param {Object} where Conditions used to filter the results. Default: {}
 * @returns Object containing the results and information about the pagination
 */
export const paginate = async (model, limit = 10, page = 1, order = [], where = {}) => {
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

    result.data = data.rows;
    result.count = data.rows.length;
    result.pages = pages;

    return result;
}