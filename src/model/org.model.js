import mongoose, { Schema, model } from "mongoose";

const OrganisationSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: string,
  },
});

export default model("organisation", OrganisationSchema);
