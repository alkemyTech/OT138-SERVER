import sequelize, { Op } from "sequelize";
import { User } from "../models";

export const user = async (req, res) => {};

export const profile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: { [Op.eq]: req.email },
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "image",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    });
    if (!user) {
      res.status(200).json({
        error: true,
        status: "404",
        message: "The user was not found.",
        user: null,
      });
    } else {
      res.status(200).json({
        error: false,
        status: "200",
        message: "User was successfully found.",
        user,
      });
    }
  } catch (error) {
    return res.status(200).json({
      error: true,
      status: "500",
      message: "An error occurred while searching for the user.",
      content: error,
    });
  }
};