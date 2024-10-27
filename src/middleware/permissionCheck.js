import { userModel } from "../model/User.model.js";

export default function PermissionCheck(permission) {
  return async (req, res, next) => {
    try {
      const userPraser = JSON.parse(req.cookies.userInfo);
      const user = await userModel.findById(userPraser._id).populate({
        path: "roles",
        select: "name",
        populate: {
          path: "permissions",
          select: "name",
        },
      });
      const adminChecker = user.roles.find((data) => {
        return data.name === "admin";
      });
      if (adminChecker) {
        next();
      } else {
        console.log(user.roles[0].permissions[0].name !== permission)
        if (user.roles[0].permissions[0].name !== permission) {
         return res.status(401).message("unauthorised")
        } else {
          return next();
        }
      }
    } catch (err) {
      res.status(400);
      res.send("unauthorised");
    }
  };
}
