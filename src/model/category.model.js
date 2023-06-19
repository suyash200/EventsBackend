import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

export default mongoose.model("category", categorySchema);

export function ValidateCategory(req, res, next) {
  try {
    const Schema = Joi.object({
      name: Joi.string(),
      description: Joi.string().required(),
    });
    const { value, error } = Schema.validate(req.body);

    if (!error) {
      next();
    } else {
      res.status(400);
      res.send(error);
    }

  } catch (error) {
    throw new Error(error);
  }
}
