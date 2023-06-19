import permissionsModel from "../model/permissions.model.js";
import rolesModel from "../model/roles.model.js";

export async function CreateRole(req, res) {
  const { name, description, permissions } = req.body;
  const permissionId = await permissionsModel
    .find({
      name: req.body.permissions,
    })
    .select("_id");

  try {
    await rolesModel.create({
      name: name,
      description: description,
      permissions: permissionId,
    });

    res.send("created rol");
  } catch (error) {
    res.send(error.message);
    res.status(401);
    throw new Error(error.message);
  }
}

export async function DeleteRole(req, res) {
  try {
    const roleDelete = await rolesModel.findOneAndRemove({
      name: req.body.name,
    });
    if (roleDelete === null) {
      res.status(400);
      res.send("Invalid role");
    }
    res.status(200);
    res.send("role deleted");
  } catch (error) {
    res.send(error.message);
    res.status(401);
  }
}

export async function GetRoles(req, res) {
  try {
    await rolesModel.find().then((data) => {
      res.send(data);
    });
  } catch (error) {
    throw new Error(error);
  }
}
