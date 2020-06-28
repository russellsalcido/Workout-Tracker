const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {useNewUrlParser: true,});

app.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);	
    })
    .catch(err => {
      res.json(err);
	});
});

  app.get("/api/workouts/:id", (req, res) => {
    // Find one Workout with the id in req.params.id and return them to the user with res.json
    db.Workout.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbWorkout => {
      res.json(dbWorkout);
	})
	.catch(err => {
		res.json(err);
	});
  });

  app.post("/api/workouts", (req, res) => {
    // Create a Workout with the data available to us in req.body
    console.log(req.body);
    db.Workout.create(req.body).then(function(dbWorkout) {
      res.json(dbWorkout);
	})
	.catch(err => {
		res.json(err);
	});
  });

  app.delete("/api/workouts/:id", (req, res) => {
    // Delete the Workouts with the id available to us in req.params.id
    db.Workout.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbWorkout) {
      res.json(dbWorkout);
	})
	.catch(err => {
		res.json(err);
	});
  });


app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
