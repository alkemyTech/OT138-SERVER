import sequelize, { Op } from "sequelize";
import { User } from "../models";

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
            return res.status(200).json({
                error: true,
                errorCode: 'REQ001',
                status: "404",
                message: "The user was not found."
            });
        } else {
            return res.status(200).json({
                error: false,
                status: "200",
                result: user,
            });
        }
    } catch (error) {
        return res.status(200).json({
            error: true,
            errorCode: 'SRV001',
            status: "500",
            message: "Internal error"
        });
    }
};

//LIST USERS
export const list = async (req, res) => {
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



//DELETE USER
export const userDelete = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            error: true,
            errorCode: 'REQ002',
            status: "400",
            message: "User id not provided"
        });
    } else {
        User.destroy({ where: { id } })
            .then((result) => {
                if (!result) {
                    return res.status(200).json({
                        error: true,
                        errorCode: 'REQ001',
                        status: "404",
                        message: "User not found"
                    });
                } else {
                    return res.status(200).json({
                        error: false,
                        status: "204",
                    });
                }
            })
            .catch((error) => {
                return res.status(200).json({
                    error: true,
                    errorCode: 'SRV001',
                    status: "500",
                    message: "Internal error"
                })
            });
    }
}