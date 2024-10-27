import { v4 as uuidv4 } from "uuid";

import eventsModel from "../model/events.model.js";
import ticketModel from "../model/ticket.model.js";

export async function IssueTicket(req, res) {
  try {
    const eventid = req.body.id;
    const { _id, firstname, lastname } = JSON.parse(req.cookies.userInfo);
    const event = await eventsModel.findOne({eventName:req.body.eventName});
    const { bookedtickets, peoplelimit, eventName } = event;

    if (peoplelimit - bookedtickets === 0) {
      res.status(200);
      res.send("all tickets sold");
    }

    const ticket = await ticketModel.create({
      userName: _id,
      ticketId: uuidv4(),
      eventName: eventid,
      userrole: req.body.role,
    });

    //function to increment no of booked tickets
    await eventsModel.findByIdAndUpdate(eventid, {
      bookedtickets: bookedtickets + 1,
    });

    res.status(200);
    res.send(
      await ticket.populate([
        {
          path: "userName",
          select: "firstname lastname",
        },
        {
          path: "eventName",
          select: "eventName",
        },
      ])
    );
  } catch (error) {
    res.status(400).send(error.message)

  }
}

export async function DeleteTicket(req, res) {
  try {
    const ticket = ticketModel.findOneAndRemove({
      ticketId: req.body.ticketId,
    });
    if (ticket === null) {
      res.status(400);
      res.send("no ticket found");
    }
    res.status(200);
    res.send("deleted ticket");
  } catch (error) {
    res.status(400);
    res.send("bad request");
  }
}
