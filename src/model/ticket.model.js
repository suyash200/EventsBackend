import Joi from "joi";
import { Schema, Types, model } from "mongoose";

const TicketModel = new Schema({
  ticketId: {
    type: String,
    require: true,
  },
  eventName: {
    type: Schema.Types.ObjectId,
    ref: "event",
    require: true,
  },
  userName: {
    type: Types.ObjectId,
    ref: "user",
    require: true,
  },
  userrole: {
    type: Schema.Types.ObjectId,
    ref: "role",
    require: true,
  },
});

export default model("ticket", TicketModel);

export function ValidateTicketSchema(req, res, next) {
  const Schema = Joi.object({
    ticketId: Joi.string().required(),
    eventName: Joi.string().required(),
    role: Joi.string().required(),
  });
  const { error, value } = Schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }
}
