import { userModel } from "../model/User.model.js";
import rolesModel from "../model/roles.model.js";
import { AssignJwt } from "../util/Jwt.js";
import { ComparePassword, HashPassword } from "../util/crypt.js";

export const Register = async (req, res) => {
  const { email, password, dob, gender, phone, firstname, lastname } = req.body;
  const isEmailTaken = await userModel.findOne({ email });

  try {
    if (isEmailTaken) {
      res.status(400);
      res.send("user exist");
    } else {
      console.log("creating new user ");
      if (req.body.roles) {
        const rolesIDFinder = await rolesModel.findOne({
          name: req.body.roles,
        });
        await userModel.create({
          roles: rolesIDFinder._id,
          email: email,
          password: await HashPassword(password),
          dob: dob,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          phone: phone,
        });

        res.status(200).json({ msg: "created user" });
      } else {
        const rolefinder = await rolesModel.findOne({ name: "user" });
        await userModel.create({
          roles: rolefinder._id.toHexString(),
          email: email,
          password: await HashPassword(password),
          dob: dob,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          phone: phone,
        });
        res.status(200);
        res.send("user Created");
      }
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    throw new Error(err);
  }
};

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const userFinder = await userModel.findOne({ email: email });
    if (userFinder) {
      const VerrifyPassowrd = await ComparePassword(
        password,
        userFinder.password
      );
      if (VerrifyPassowrd === true) {
        const jwttoken = AssignJwt(email, userFinder._id);
        res.cookie("userInfo", JSON.stringify(userFinder._doc), {
          encode: Object,
        });
        res.cookie("access_token", JSON.stringify(jwttoken), {
          encode: Object,
        });
        res.status(200);
        res.send({ token: jwttoken });
      } else {
        res.status(401);
        res.send("bad password");
      }
    } else {
      res.status(401);
      res.send("no user found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function Logout(req, res) {
  try {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("userInfo");
    res.status(200);
    res.send("cleared cookies");
  } catch (error) {
    throw new Error(error);
  }
}
