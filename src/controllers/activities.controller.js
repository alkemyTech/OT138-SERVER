import { Joi } from "express-validation";
import { Activities } from "../models";
import { Op } from "sequelize";
import { async } from "regenerator-runtime";
const createActivitiesSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri(),
  content: Joi.string().required(),
});
export const createActivitiesController = async (req, res) => {
  const { error, value } = createActivitiesSchema.validate(req.body);
  if (error) {
    // Validation failed
    res.json({
      error: true,
      status: "400",
      message: error.message,
    });
  } else {
    // Validation success
    try {
      const activity = await Activities.create(value);
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

const getActivitiesQueryParamsSchema = Joi.object({
  limit: Joi.number().integer().greater(0),
  page: Joi.number().integer().greater(0),
});

export const getActivitiesController = async (req, res) => {
  const id = req.params.id;
  let condition = id ? { id: { [Op.eq]: id } } : null;
  let limit = req?.query?.limit ? parseInt(req?.query?.limit) : null;
  let page = req?.query?.page ? parseInt(req?.query?.page) : null;
  const { error } = getActivitiesQueryParamsSchema.validate({ limit, page });
  if (error) {
    // Validation failed
    res.json({ error: true, status: 400, message: error.message });
  } else {
    // Validation success
    try {
      const activities = await Activities.findAndCountAll({
        subQuery: false,
        limit: limit,
        offset: (page - 1) * limit, // -1 so first page starts from 1
        order: [["createdAt", "DESC"]],
        where: condition,
      });
      const totalNumberOfPages = Math.ceil(activities.count / limit);
      let result = {};
      if (page > 1 && page <= totalNumberOfPages) {
        // if there is a previous page add previous property
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      if (page < totalNumberOfPages) {
        // if there is a next page add next property
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      // add activities to result
      result.activities = activities.rows;
      //Add number of activities to result
      result.count = activities.rows.length;
      //Add total number of pages
      result.totalNumberOfPages = totalNumberOfPages;

      // Response
      let status = "200";
      let message = "success";
      if (activities.rows.length === 0) {
        status = "204";
        message = "No activities found";
      }
      res.json({
        error: false,
        status,
        message,
        result,
      });
    } catch (error) {
      res.json({
        error: true,
        status: "500",
        message:
          "An unexpected error occurred when retrieving data form database",
        content: error,
      });
    }
  }
};


export const updateActivitiesController = async (req,res) => {

  const {id} = req.params;
  const {name,image,content} = req.body;
  if(!id || !name || !image || !content){
  res.status(200).json({
  error:true,
  message:"The required data is not received",
  status:"400"
  })
  }else{
  try {
  const activities =  await Activities.update({name:name,image:image,content:content},{where:{id:id}})
  if(activities[0] === 0){
  res.status(200).json({
  error:true,
  message:"An error occurred while trying to update an activity",
  status:"404"
  })

  }else{
  res.status(200).json({
  error:false,
  message:"The activity was updated correctly",
  status:"200"
  })}
    
  }catch (error) {
  res.status(200).json({
  error:true,
  message:"There was a mistake",
  status:"500",
  content:error
  })
  }}
  

}