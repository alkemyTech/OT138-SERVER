import { Joi } from "express-validation";
import { Activities } from "../models";

const createActivitiesSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri(),
  content: Joi.string().required(),
});
export const createActivitiesController = async (req, res) => {
  console.log("------activity--------");
  const { error, value } = createActivitiesSchema.validate(req.body);
  if (error) {
    //Validation failed
    res.json({
      error: true,
      status: "400",
      message: error.message,
    });
  } else {
    console.log(value);
    //meter datos en la db
    try {
      const activity = await Activities.create(value);
      console.log(activity);
      res.json({
        error: false,
        status: "200",
        message: "Activity created correctly.",
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: true,
        status: "500",
        message:
          "An error occurred while adding activity to the database. Details: " +
          error.message,
      });
    }
  }
};
