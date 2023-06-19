import eventsModel from "../model/events.model.js";

export async function CreateEvent(req, res, next) {
  try {
    await eventsModel.create({
      ...req.body,
    });
    res.send("event created");
    res.status(200);
    next();
  } catch (error) {
    res.send(error.message);
  }
}

export async function EditEvent(req, res) {
  try {
    const eventsUpdater = await eventsModel.findOneAndUpdate(
      { eventName: req.query.name },
      { $set: { eventName: req.body.name } },
      {
        upsert: true,
      }
    );
    res.send("updated user");
    res.status(200);
  } catch (err) {
    res.status(417);
    res.send("failed request");
    throw Error(err.message);
  }
}

export async function DeleteEvent(req, res) {
  try {
    const z = await eventsModel.deleteOne({ eventName: req.body.name });
    res.send(z);
    res.status(200);
  } catch (error) {
    res.send("failed request");
    res.status(201);
  }
}

export default async function GetEvents(req, res) {
  try {
    const event = await eventsModel.find();
    res.send(event);
  } catch (error) {
    throw new Error(error);
  }
}
