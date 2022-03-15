import { Joi } from 'express-validation';

const validationSchema = Joi.object({
    name: Joi.string().max(255).required(),
    categoryId: Joi.number().integer(),
    type: Joi.string().max(255),
    image: Joi.string().max(255),
    content: Joi.string().required(),
}).unknown().options({abortEarly: false});

export const updateNewsValidator = async (req, res, next) => {

    const { error, value } = validationSchema.validate(req.body);

    if(error) {
        return res.status(200).json({
            error: true,
            status: "400",
            errorCode: "VAL001",
            message: "Invalid data",
            invalidFields: error.details
        });
    }

    next();
}