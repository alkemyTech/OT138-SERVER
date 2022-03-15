import { Joi } from 'express-validation';
import { Activities } from '../models';
import { Op } from 'sequelize';
import { responses, formatValidationErrors, paginate } from '../helpers';
import { InvalidArgumentsError } from '../helpers/exceptions';

const createActivitiesSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri(),
    content: Joi.string().required(),
});

export const getOneActivityController = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Activities.findOne({ where: { id: id } });

        if (!result) {
            return res.status(200).json({
                ...responses.notFound,
                message: 'Activity not found'
            });
        }

        return res.status(200).json({
            ...responses.success,
            result
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            ...responses.internalError,
        });
    }
}

export const createActivitiesController = async (req, res) => {
    const { error, value } = createActivitiesSchema.validate(req.body);
    if (error) {
        // Validation failed
        res.json({
            ...responses.validationError,
            errorFields: formatValidationErrors(error)
        });
    } else {
        // Validation success
        try {
            const activity = await Activities.create(value);
            res.json({
                ...responses.success,
                result: activity
            });
        } catch (error) {
            console.log(error);
            res.json({
                ...responses.internalError,
                message: 'An error occurred while adding activity to the database'
            });
        }
    }
};

export const getActivitiesController = async (req, res) => {
    try {
        const activities = await paginate(Activities, req.query.limit, req.query.page, [['createdAt', 'DESC']]);

        let status = '200';
        let message = 'success';

        if (activities.count === 0) {
            status = '204';
            message = 'No activities found';
        }

        return res.status(200).json({
            ...responses.success,
            status,
            message,
            result: activities,
        });

    } catch (err) {
        let resData = {};

        if (err instanceof InvalidArgumentsError) {
            resData = {
                ...responses.validationError,
                errorFields: formatValidationErrors(err.errors),
                message: 'Invalid query params',
            };
        } else {
            console.log(err);
            resData = {
                ...responses.internalError,
                message: 'An unexpected error occurred when retrieving data form database'
            };
        }

        return res.status(200).json(resData);
    }
};


export const updateActivitiesController = async (req, res) => {
    const { id } = req.params;

    try {

        const instance = await Activities.findOne({ where: { id: id } });

        if (!instance) {
            return res.status(200).json({
                ...responses.notFound,
                message: 'Activity not found'
            });
        }

        instance.set({
            ...req.body,
            deletedAt: instance.deletedAt,
            createdAt: instance.createdAt,
            updatedAt: Date.now()
        });

        await instance.save();

        return res.status(200).json({
            ...responses.success,
            message: 'Activity updated',
            result: instance
        });


    } catch (err) {
        console.error(err);
        return res.status(200).json({
            ...responses.internalError
        });
    }
}