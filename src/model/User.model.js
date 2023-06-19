import Joi from "joi";
import mongoose, { Schema, model } from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  interestedEventsCategory: [
    {
      type: String,
    },
  ],
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
  ],
});

export const userModel = mongoose.model("user", UserSchema);

//validate middleware for schema
export function ValidateUserSchema(req, res, next) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),

    phone: Joi.string().min(10).max(12).required(),
    dob: Joi.date().required(),
    interestedEventsCategory: Joi.array(),
    roles: Joi.array(),
    gender: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }

}

export function ValidateLoginSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }

}
