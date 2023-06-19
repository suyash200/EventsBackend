import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const RolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permissions",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("roles", RolesSchema);

export function ValidateRoleSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    permissions: Joi.array().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }

}
