import { Organization } from "../models";
import { Links } from "../models";
import { Joi } from "express-validation";
import { getJoiErrorFields, responses } from "../helpers";

export const publicDataController = async (req, res) => {
  try {
    const organization = await Organization.findByPk(
      process.env.ORGANIZATION_ID,
      {
        include: [
          {
            model: Links,
            as: "links",
          },
        ],
      }
    );
    res.json({
      ...responses.success,
      result: organization,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ...responses.internalError,
      message: `An unexpected error ocurred when retrieving data from database`,
    });
  }
};

const organizationSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
});

export const updatePublicDataController = async (req, res) => {
  const id = process.env.ORGANIZATION_ID;

  const data = {
    name: req.body.name,
    image: req.body.image,
  };

  const { error, value } = organizationSchema.validate(data);

  if (error) {
    // Validation failed
    res.json({
      ...responses.badRequest,
      errorFields: getJoiErrorFields(error),
      message: error.message,
    });
  } else {
    // Validation success
    try {
      const org = await Organization.findOne({ where: { id: id } });

      if (!org) {
        return res.status(200).json({
          ...responses.notFound,
          message: "Organization not found",
        });
      }

      org.set({
        name: req.body.name,
        image: req.body.image,
        updatedAt: Date.now(),
      });

      await org.save();

      return res.json({
        ...responses.success,
        message: "Organization updated",
        result: org,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        ...responses.internalError,
        message: `An unexpected error ocurred when storing data to the database.`,
      });
    }
  }
};
