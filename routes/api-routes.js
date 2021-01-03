const db = require("../models")

module.exports = function (app) {
    console.log("api routes message here");

    app.get("/api/workouts", (req, res) => {
        console.log("message");
        db.Workout.find({})
            .sort({ date: -1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    //just need to add to the exercises key, bc right now it's returning the previous exercise
    app.put("/api/workouts/:id", (req, res) => {
        const filter = { _id: req.params.id };
        const update = { $push: { exercises: req.body } };
        db.Workout.findOneAndUpdate(filter, update)
            .then(dbWorkout => {
                console.log(dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    //then add next API route! createWorkout (post request) and mongoose method is create or save
    app.post("/api/workouts", ({ body }, res) =>
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            }));


    //add the getWorkoutsinRange route, which is a get route
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .sort({ date: -1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    })

}