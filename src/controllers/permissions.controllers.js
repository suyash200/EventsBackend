import permissions from "../model/permissions.model.js";

export async function CreatePermission(req, res) {
  try {
    await permissions.create({
      ...req.body,
    });
    res.status(200);
    res.send("created permission");
  } catch (error) {
    res.status(400);
    res.send(error.message);
    throw new Error(error.message);
  }
}

export async function DeletePermission(req, res) {
  try {
    await permissions
      .findOneAndRemove({ name: req.body.name })
      .then((data) => {
        if (data != null) {
          res.status(200);
          res.send("deleted permission");
        } else {
          res.status(400);
          res.send("not a valid permission");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(400);
    res.send(error.message);
    throw new Error(error.message);
  }
}
