import { Testimonials } from "../models";
import { responses, formatValidationErrors, paginate } from "../helpers";
import { InvalidArgumentsError } from "../helpers/exceptions";

export const getTestimony = async (req, res) => {
  try {
    const testimonials = await paginate(
      Testimonials,
      req.query.limit,
      req.query.page,
      [["id", "DESC"]]
    );

    let status = "200";
    let message = "success";

    if (testimonials.count === 0) {
      status = "204";
      message = "No testimonials found";
    }

    return res.status(200).json({
      ...responses.success,
      status,
      message,
      result: testimonials,
    });
  } catch (err) {
    let resData = {};

    if (err instanceof InvalidArgumentsError) {
      resData = {
        ...responses.validationError,
        errorFields: formatValidationErrors(err.errors),
        message: "Invalid query params",
      };
    } else {
      console.log(err);
      resData = {
        ...responses.internalError,
        message:
          "An unexpected error occurred when retrieving data form database",
      };
    }

    return res.status(200).json(resData);
  }
};

//GET ONE TESTIMONY
export const getOneTestimony = async (req, res) => {
  const { id } = req.params;
  const testimonyData = await Testimonials.findOne({ where: { id: id } });
  if (!testimonyData) {
    res.status(200).json({
      error: true,
      errorCode: "REQ001",
      errorFields: [],
      status: "404",
      message: "Testimonials not found",
      result: [],
    });
  } else {
    res.status(200).json({
      error: false,
      errorCode: "",
      errorFields: [],
      status: "200",
      message: "Testimonials found",
      result: testimonyData,
    });
  }
};

//CREATE TESTIMONY
export const postTestimony = async (req, res) => {
  try {
    const { name, image, content } = req.body;
    if (!name || !image || !content) {
      res.status(200).json({
        error: true,
        errorCode: "REQ002",
        errorFields: [],
        status: "404",
        message: "invalid request",
        result: [],
      });
    } else {
      const testimonyData = await Testimonials.create({
        name,
        image,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (!testimonyData) {
        res.status(200).json({
          error: true,
          errorCode: "REQ001",
          errorFields: [],
          status: "404",
          message: "resource not found",
          result: testimony,
        });
      } else {
        res.status(200).json({
          error: false,
          errorCode: "",
          errorFields: [],
          status: "200",
          message: "testimonial saved successfully",
          result: testimonyData,
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      error: true,
      errorCode: "SRV001",
      errorFields: [],
      status: "500",
      message: "Server error",
      result: error,
    });
  }
};

//UPDATED TESTIMONY
export const putTestimony = async (req, res) => {
  const { id } = req.params;
  const { name, image, content } = req.body;
  if (!id || !name || !image || !content) {
    res.status(200).json({
      error: true,
      errorCode: "REQ002",
      errorFields: [],
      status: "404",
      message: "invalid request",
      result: [],
    });
  } else {
    const consultation = await Testimonials.findOne({ where: { id: id } });
    if (!consultation) {
      res.status(200).json({
        error: true,
        errorCode: "REQ001",
        errorFields: [],
        status: "404",
        message: "resource not found",
        result: [],
      });
    } else {
      try {
        await Testimonials.update(
          { name: name, image: image, content: content },
          { where: { id: id } }
        );
        res.status(200).json({
          error: false,
          errorCode: "",
          errorFields: [],
          status: "200",
          message: "Updated testimony",
          result: null,
        });
      } catch (error) {
        res.status(200).json({
          error: true,
          errorCode: "SRV001",
          errorFields: [],
          status: "500",
          message: "Server error",
          result: error,
        });
      }
    }
  }
};

//DELETE TESTIMONY
export const deleteTestimony = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(200).json({
      error: true,
      errorCode: "REQ002",
      errorFields: [],
      status: "404",
      message: "invalid request",
      result: [],
    });
  } else {
    try {
      const testimonyData = await Testimonials.destroy({ where: { id: id } });
      if (!testimonyData) {
        res.status(200).json({
          error: true,
          errorCode: "REQ001",
          errorFields: [],
          status: "404",
          message: "the id does not exist",
          result: [],
        });
      } else {
        res.status(200).json({
          error: false,
          errorCode: "",
          errorFields: [],
          status: "200",
          message: "testimonial deleted",
          result: null,
        });
      }
    } catch (error) {
      res.status(200).json({
        error: true,
        errorCode: "SRV001",
        errorFields: [],
        status: "500",
        message: "Server error",
        result: error,
      });
    }
  }
};
