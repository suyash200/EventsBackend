import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const EvnetModel = new mongoose.Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    eventName: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    hosts: [
      {
        type: String,
      },
    ],
    guestSpeakers: [
      {
        SpeakerName: { type: String },
        description: String,
        topic: [{ type: String }],
      },
    ],
    venue: {
      type: String,
    },

    categories: {
      type: Array,
    },
    mode: {
      type: String,
      require: true,
    },
    paid: {
      type: Boolean,
    },
    peoplelimit: {
      type: Number,
    },
    bookedtickets: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("event", EvnetModel);

export function ValidateEventSchema(req, res, next) {
  const schema = Joi.object({
    createdBy: Joi.string().length(24).required(),
    eventName: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date(),
    hosts: Joi.array().required(),
    guestSpeakers: Joi.array(),
    venue: Joi.string(),
    categories: Joi.array(),
    mode: Joi.string(),
    paid: Joi.bool(),
    peoplelimit: Joi.number(),
    bookedtickets: Joi.number(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }
}
