const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const journeyRoutes = express.Router();
const PORT = process.env.PORT || 5000;
const path = require("path");

const app = express();
let Journey = require("./journey.models");

app.use(cors());
app.use(bodyParser.json());
const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

journeyRoutes.route("/").get(function (req, res) {
    Journey.find(function (err, journeys) {
        if (err) {
            console.log(err);
        } else {
            res.json(journeys);
        }
    });
});

journeyRoutes.route("/:id").get(function (req, res) {
    let id = req.params.id;
    Journey.findById(id, function (err, journey) {
        res.json(journey);
    });
});

journeyRoutes.route("/add").post(function (req, res) {
    let journey = new Journey(req.body);
    journey
        .save()
        .then((journey) => {
            res.status(200).json({ journey: "journey added successfully" });
        })
        .catch((err) => {
            res.status(400).send("adding new journey failed");
        });
});

journeyRoutes.route("/update/:id").post(function (req, res) {
    Journey.findById(req.params.id, function (err, journey) {
        if (!journey) res.status(404).send("journey is not found");
        else {
            journey.name = req.body.name;
            journey.description = req.body.description;
            journey.priority = req.body.priority;
            journey.completed = req.body.completed;

            journey
                .save()
                .then((todo) => {
                    res.json("Journey Updated");
                })
                .catch((err) => {
                    res.status(400).send("Journey could not be updated");
                });
        }
    });
});

//Server static assets if in production
if (ProcessingInstruction.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.use("/journey", journeyRoutes);

app.listen(PORT, function () {
    console.log("Server is Running on Port: " + PORT);
});
