import { Member } from '../models';
import { Joi } from "express-validation";

const memberSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri().required()
})

export const getMembersController = async (req, res) => {
    
    //const { limit, offset } = req.params;
    console.log(req.query)
    const options = {}
    if(req.query.limit){
        options.limit = parseInt(req.query.limit);
    }
    if(req.query.offset){
        options.offset = parseInt(req.query.offset);
    }

    try{

        let instances = await Member.findAll({...options});

        console.log(instances)

        if(!instances){
            return res.status(200).json({
                error: true,
                status: "404",
                message: "Data not found"
            });
        }
        
        return res.status(200).json({
            error: false,
            status: "200",
            data: instances
        });

    } catch (err) {
        return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal server error"
        })
    }
};

export const updateMemberController = async ( req, res ) => {

    const memberId = req.params.id;

    const { error, value } = memberSchema.validate(req.body);

    console.log(memberSchema.validate(req.body));

    if(error){
        return res.status(200).json({
            error: true,
            status: "400",
            message: error.message
        })
    }

    try{

        const instance = await Member.findByPk(memberId);

        if(!instance){
            return res.status(200).json({
                error: true,
                status: "404",
                message: "Member not found"
            })
        }

        instance.set({
            ...value,
            createdAt: instance.createdAt,
            deletedAt: instance.deletedAt,
            updatedAt: Date.now()
        })
        await instance.save();

        return res.status(200).json({
            error: false,
            status: "200",
            data: instance,
        });
      } catch (err) {
            return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal error",
            });
      }
};

export const createMemberController = async (req, res) => {

    const {error, value} = memberSchema.validate(req.body);

    if(error){
        return res.status(200).json({
            error: true,
            status: "400",
            message: error.message
        });
    };

    try{
        const instance = await Member.create({
            ...value,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        return res.status(200).json({
            error: false,
            status: "200",
            message: "Member created successfully"
        })
    } catch (err) {
        return res.status(200).json({
            error: true,
            message: "Internal server error"
        })
    }
}

export const deleteMemberController = async (req, res) => {

    const id = req.params.id;

    try{
        const instance = await Member.findByPk(id);

        if(!instance){
            return res.status(200).json({
                error: true,
                status: "404",
                message: "Member not found"
            });
        }

        await instance.destroy();

        return res.status(200).json({
            error: false,
            message: "The member entry was successfully deleted"
        })
    } catch (err) {
        return res.status(200).json({
            error: true,
            status: "500",
            message: "Internal server error"
        })
    }

}