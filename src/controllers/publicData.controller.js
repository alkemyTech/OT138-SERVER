import { Organization } from "../models";
import { Links } from "../models";
import { Joi } from "express-validation";
import { getJoiErrorFields, responses } from "../helpers";

export const publicDataController = async (req, res) => {
    try {
        const organization = await Organization.findByPk(
            process.env.ORGANIZATION_ID,
            {
                include: [
                    {
                        model: Links,
                        as: 'links'
                    }
                ]
            }
        );
        res.json({
            ...responses.success,
            result: organization
        });
    } catch (error) {
        console.log(error);
        res.json({
            ...responses.internalError,
            message: `An unexpected error ocurred when retrieving data from database`
        });
    }
};

const organizationSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
});
export const updatePublicDataController = async (req, res) => {
    const data = {
        name: req.body.name,
        image: req.body.image,
    };
    const { error, value } = organizationSchema.validate(data);
    if (error) {
        // Validation failed
        res.json({
            error: true,
            errorCode: "VAL001",
            errorFields: getJoiErrorFields(error),
            status: "400",
            message: error.message,
        });
    } else {
        // Validation success
        try {
            await Organization.update(
                { name: req.body.name, image: req.body.image },
                {
                    where: {
                        id: process.env.ORGANIZATION_ID,
                    },
                }
            );
            res.json({
                error: false,
                status: "200",
                message: "success",
            });
        } catch (error) {
            res.json({
                error: true,
                errorCode: "SRV001",
                status: "500",
                message: `An unexpected error ocurred when storing data to the database. Details:  ${error.message}`,
            });
        }
    }
};
