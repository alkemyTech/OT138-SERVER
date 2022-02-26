import { Joi } from 'express-validation';

const validationSchema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string()
}).unknown().options({abortEarly: false});

export const createCategoryValidator = async (req, res, next) => {

    const { error, value } = validationSchema.validate(req.body);

    if(error) {
        return res.status(200).json({
            error: true,
            status: "400",
            message: "Invalid data",
            invalidFields: error.details
        });
    }

    next();
}