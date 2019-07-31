const Trip = require("../../models/trip.model");
const Tourist = require("../../models/user.model").Tourist;

//Create Trip
const Create = (req, res) => {
  Trip.create({ tourist: req.params.touristID, ...req.body })
    .then(createdTrip => {
      Tourist.findByIdAndUpdate(
        req.params.touristID,
        { $push: { trips: createdTrip } },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourist => {
          res.json({
            msg: "This Trip has been created successfully",
            data: createdTrip
          });
        })
        .catch(error => {
          res.json({
            err: error.message
          });
        });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read Trip by its id
const Read = (req, res) => {
  Trip.findById(req.params.id)
    .populate({ path: "tourist", select: { _id: 1, name: 1, interests: 1 } })
    .exec()
    .then(foundTrip => {
      res.json({
        msg: "This Trip information",
        data: foundTrip
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Trips
const ReadAll = (req, res) => {
  Trip.find({})
    .populate({ path: "tourist", select: { _id: 1, name: 1, interests: 1 } })
    .exec()
    .then(foundTrips => {
      res.json({
        msg: "All Trips information",
        data: foundTrips
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Trips of a certain user by his id
const ReadAllOfUser = (req, res) => {
  Tourist.findById(req.params.id)
    .then(foundTourist => {
      res.json({
        msg: "This Tourist's trips information",
        data: foundTourist.trips
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read Trip by tourguide id
const ReadByTourguide = (req, res) => {
  Trip.find({ "acceptedOffer.tourguide": req.params.tourguideID })
    .then(foundTrips => {
      res.json({
        msg: "These Trips information",
        data: foundTrips
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Update Trip by its id
const Update = (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedTrip => {
      Tourist.findOneAndUpdate(
        { _id: req.params.touristID, "trips._id": req.params.id },
        {
          "trips.$": updatedTrip
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourist => {
          res.json({
            msg: "This Trip has been updated successfully",
            data: updatedTrip
          });
        })
        .catch(error => {
          res.json({
            err: error.message
          });
        });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Delete Trip by its id
const Delete = (req, res) => {
  Trip.findByIdAndDelete(req.params.id)
    .then(deletedTrip => {
      Tourist.findByIdAndUpdate(
        req.params.touristID,
        {
          $pull: { trips: { _id: req.params.id } }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourist => {
          res.json({
            msg: "This Trip has been deleted successfully",
            data: deletedTrip
          });
        })
        .catch(error => {
          res.json({
            err: error.message
          });
        });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};

module.exports = {
  Create,
  Read,
  ReadAll,
  ReadAllOfUser,
  ReadByTourguide,
  Update,
  Delete
};
