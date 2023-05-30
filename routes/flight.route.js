const express = require("express");

const flightRouter = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { FlightModel } = require("../model/flight.model");

// get

flightRouter.get("/flights", async (req, res) => {
  let flight = await FlightModel.find();
  res.status(200).send(flight);
});

// get id

flightRouter.get("/flights/:id", async (req, res) => {
  const id = req.params.id;
  let flight = await FlightModel.findOne({ _id: id });
  res.status(200).send(flight);
});

// post

flightRouter.post("/flights", async (req, res) => {
  const flight = new FlightModel(req.body);
  await flight.save();
  res.status(201).send("flight added");
});


// patch

flightRouter.patch("/flights/:id", async (req, res) => {
  const id = req.params.id;
  let flight = await FlightModel.findOne({ _id: id });
  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(204).send("update successful");
  } catch (e) {
    res.send("something went wrong");
  }
});


// delete

flightRouter.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;
  let flight = await FlightModel.findOne({ _id: id });
  try {
    await FlightModel.findByIdAndDelete({ _id: id });
    res.status(202).send("deleted successful");
  } catch (e) {
    res.send("something went wrong");
  }
});

module.exports = {
  flightRouter,
};


