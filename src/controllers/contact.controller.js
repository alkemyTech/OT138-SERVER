import { Contacts } from '../models';
import { paginate } from '../helpers';
import { InvalidArgumentsError } from '../helpers/exceptions';

/**
 * Returns a list of contacts
 */
export const list = async (req, res) => {
    try {
        const contacts = await paginate(Contacts, req.query.limit, req.query.page);
        return res.status(200).json({
            error: false,
            status: "200",
            message: "List of contacts",
            data: contacts
        });
    } catch (err) {
        let resData = {}
        if (err instanceof InvalidArgumentsError) {
            resData = {
                error: true,
                status: "400",
                message: err.message
            }
        } else {
            resData = {
                error: true,
                status: "500",
                message: "An unexpected error occurred when retrieving data form database",
            }
        }
        console.log(err);
        return res.status(200).json(resData);
    }
};