import { Joi } from "express-validation";

const createActivitiesValidation = Joi.object({
    name: Joi.string()
      .required(),
    image: Joi.string()
      .domain(),
    content: Joi.string()
      .required(),
  }),
export const createActivitiesController = async (req, res) => {
  const data = await req.json();
  console.log(data)
  res.json({success: true});
};
