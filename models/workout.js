const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: String,
        trim: true,
        updated: {type:Date, default: Date.now}
    },

    excercises: {   
        type: Array,
    },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
