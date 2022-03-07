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
            status: '200',
            result: contacts
        });
    } catch (err) {
        let resData = {}
        if (err instanceof InvalidArgumentsError) {
            resData = {
                error: true,
                errorCode: 'REQ002',
                status: '400',
                message: err.message
            }
        } else {
            console.log(err);
            resData = {
                error: true,
                errorCode: 'SRV001',
                status: '500',
                message: 'Internal error',
            }
        }
        return res.status(200).json(resData);
    }
};