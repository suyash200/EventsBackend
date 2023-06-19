import Joi from "joi";
import mongoose from "mongoose";

const { Schema } = mongoose;

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("permissions", permissionSchema);

//func to validate incomming body

export function ValidatepermissionSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }

}


