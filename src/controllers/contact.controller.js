import { Contact } from '../models';

export const list = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        return res.status(200).json({
            error: false,
            status: "200",
            message: "List of all contacts",
            data: contacts
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            error: true,
            status: "500",
            message: "An unexpected error occurred when retrieving data form database",
        });
    }
};