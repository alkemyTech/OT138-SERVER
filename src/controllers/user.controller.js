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
        res.status(400).json({
            message: "ID is not provided",
            error: true,
            status: "400"
        })
    } else {
        User.destroy({ where: { id } })
            .then((result) => {
                if (!result) {
                    res.status(404).json({ message: "No user", status: "404", error: true });
                } else {
                    res.status(200).json({ message: "deleted users", result, status: "200", error: false });
                }
            })
            .catch((error) => {
                res.status(400).json({ message: error, status: "400", error: true });
            });

    }

}