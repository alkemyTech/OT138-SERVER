import sequelize, { Op } from "sequelize";
import { serveFiles } from "swagger-ui-express";
import { responses } from "../helpers";
import { User } from "../models";

//LIST USERS
export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      error: false,
      status: "200",
      result: users
    });

  } catch (error) {
    return res.status(200).json({
      error: true,
      errorCode: 'SRV001',
      status: "500",
      message: "Internal error"
    })
  }
};

export const updateUser = async (req, res) => {

  const userId = req.params.id;

  if (!userId) {
    return res.status(200).json({
      error: true,
      errorCore: "REQ002",
      status: "400",
      message: "The id was not provided"
    });
  }

  const { firstName, lastName, roleId } = req.body;

  try {

    const instance = await User.findByPk(userId);

    if (!instance) {
      return res.status(200).json({
        error: true,
        errorCode: "REQ001",
        status: "404",
        message: "User not found"
      });
    }

    instance.set({
      firstName: firstName,
      lastName: lastName,
      roleId: roleId,
      updatedAt: Date.now()
    }, ['firstName', 'lastName', 'roleId', 'updatedAt']);

    await instance.save();

    return res.status(200).json({
      error: false,
      status: "200",
      message: "User successfully updated"
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      error: true,
      errorCode: "SRV001",
      message: "Internal server error"
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(200).json({
      ...responses.notFound,
      message: "User id was not provided"
    })
  }

  User.destroy({
    where: {
      id: userId
    }
  }).then(result => {
    if (!result) {
      return res.status(200).json({
        ...responses.notFound,
        message: 'User not found'
      });
    } else {
      return res.status(200).json({
        ...responses.success,
        message: "User was successfully deleted"
      });
    }
  }).catch(err => {
    console.log(err);
    return res.status(200).json({
      ...responses.internalError
    });
  });
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(200).json({
      error: true,
      errorCore: "REQ002",
      status: "400",
      message: "The id was not provided"
    });
  }

  try {

    const instance = await User.findByPk(id);

    if (!instance) {
      return res.status(200).json({
        error: true,
        errorCode: "REQ001",
        status: "404",
        message: "User not found"
      });
    } else {
      return res.status(200).json({
        error: false,
        status: "200",
        result: instance
      })
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      error: true,
      errorCode: "SRV001",
      status: "500",
      message: "Internal server error"
    });
  }

}