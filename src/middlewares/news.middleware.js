import { Joi } from 'express-validation';
import { formatValidationErrors } from '../helpers';

const validationSchema = Joi.object({
    name: Joi.string().max(255).required(),
    categoryId: Joi.custom((value, helpers) => {
        if (value === null || (Number.isInteger(value) && value > 0)) {
            return value;
        }

        return helpers.message('Field must be a positive integer or null');
    }),
    type: Joi.string().max(255),
    image: Joi.string().max(255),
    content: Joi.string().required(),
}).unknown().options({ abortEarly: false });

export const updateNewsValidator = async (req, res, next) => {

    const { error, value } = validationSchema.validate(req.body);

    if (error) {
        return res.status(200).json({
            error: true,
            status: "400",
            errorCode: "VAL001",
            message: "Invalid data",
            invalidFields: formatValidationErrors(error)
        });
    }

    next();
}