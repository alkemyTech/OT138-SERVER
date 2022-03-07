import { Organization } from "../models";
import { Links } from "../models";

export const publicDataController = async (req, res) => {
  try {
    const organization = await Organization.findByPk(
      process.env.ORGANIZATION_ID
    );
    let result = organization.dataValues;
    const links = await Links.findAll({
      where: { organizationId: process.env.ORGANIZATION_ID },
    });
    result.links = links;
    res.json({
      error: false,
      status: "200",
      message: "success",
      result,
    });
  } catch (error) {
    res.json({
      error: true,
      errorCode: "DB001",
      status: "500",
      message:
        "An unexpected error ocurred when retrieving data from database. Details:  " +
        error.message,
    });
  }
};
