const db = require("../models")

module.exports = function (app) {
    console.log("api routes message here");

    app.get("/api/workouts", (req, res) => {
        console.log("message");
        db.Workout.aggregate([{
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }])
            .sort({ date: -1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })

            .catch(err => {
                res.status(400).json(err);
            });

    });

    app.put("/api/workouts/:id", (req, res) => {
        const filter = { _id: req.params.id };
        const update = { $push: { exercises: req.body } };
        db.Workout.findOneAndUpdate(filter, update, { new: true })
            .then(dbWorkout => {
                console.log(dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    app.post("/api/workouts", ({ body }, res) =>
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            }));


    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([{
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }])
            .sort({ date: -1 }).limit(7)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    })

}