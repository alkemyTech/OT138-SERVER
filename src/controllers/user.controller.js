import sequelize, { Op } from "sequelize";
import { serveFiles } from "swagger-ui-express";
import { User } from "../models";

/*
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
};*/

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
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(200).json({
            error: true,
            errorCode: 'REQ002',
            status: "400",
            message: "User id not provided"
        });
    }

    if(parseInt(id) !== parseInt(req.user.id)){
        return res.status(200).json({
            error: true,
            errorCode: "REQ002",
            status: "400",
            message: "The user id provided does not march with the logged user"
        })
    }

    if(parseInt(id) !== parseInt(req.user.id)){
        return res.status(200).json({
            error: true,
            errorCode: "REQ002",
            status: "400",
            message: "The user id provided does not match with the logged user id"
        });
    }

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
                    status: "200",
                    message: "User deleted successfuly"
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

/* Update the profile by the logged user
* The user id is provided in a query parameter, but
* it must match with the user id in the token
*/
export const updateProfileByUser = async (req, res) => {
    
    const id = req.params.id;

    // If id is not provided in the query parameters returns error
    if (!id) {
        return res.status(200).json({
            error: true,
            errorCode: 'REQ002',
            status: "400",
            message: "User id not provided"
        });
    }

    // If the provided id does not match with the id in the token, returns error
    if(parseInt(id) !== parseInt(req.user.id)){
        return res.status(200).json({
            error: true,
            errorCode: "REQ002",
            status: "400",
            message: "The user id provided does not match with the logged user id"
        });
    }

    const {firstName, lastName} = req.body;

    try{
        const instance = await User.findByPk(id)

        if(!instance){
            return res.status(200).json({
                error: true,
                status: "400",
                message: "The user was not found"
            })
        }
        await instance.set({
            firstName: firstName,
            lastName: lastName,
            updatedAt: Date.now()
        }, ['firstName, lastName, updatedAt']);

        await instance.save();

        return res.status(200).json({
            error: false,
            message: "The data was updated successfully"
        });
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal server error"
        });
    }
}

export const updateProfileByAdmin = async (req, res) => {

    const id = req.params.id;

    if(!id){
        return res.status(200).json({
            error: true,
            errorCore: "REQ002",
            status: "400",
            message: "The id was not provided"
        });
    }

    const { firstName, lastName, roleId } = req.body;

    const instance = User.findByPk(id);

    if(!instance){
        return res.status(200).json({
            error: true,
            errorCode: "REQ001",
            status: "404",
            message: "User not found"
        });
    }

    try{
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

export const deleteUserByAdmin = async (req, res) => {
    const id = req.user.id;

    if(!id){
        return res.status(200).json({
            error: true,
            status: "404",
            message: "User id was not provided"
        })
    }

    try{
        User.destroy({
            where: {
                id: id
            }
        }).then( result => {
            if(!result){
                return res.status(200).json({
                    error: true,
                    status: "404",
                    message: "User not found"
                });
            } else {
                return res.status(200).json({
                    error: false,
                    status: "200",
                    message: "User was successfully deleted"
                });
            }
        }) .catch(err => {
            console.log(err);
            return res.status(200).json({
                error: true,
                errorCode: "SRV001",
                status: "500",
                message: "Internal server error"
            });
        })
    } catch (err) {
        return res.status(200).json({
            error: true,
            errorCode: "SRV001",
            status: "500",
            message: "Internal server error"
        });
    }

}