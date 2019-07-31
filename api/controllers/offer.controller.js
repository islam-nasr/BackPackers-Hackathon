const Offer = require("../../models/offer.model");
const Trip = require("../../models/trip.model");
const Tourguide = require("../../models/user.model").Tourguide;
const Tourist = require("../../models/user.model").Tourist;

//Create Offer
const Create = (req, res) => {
  Offer.create({ tourguide: req.params.tourguideID, ...req.body })
    .then(createdOffer => {
      Trip.findByIdAndUpdate(
        req.params.tripID,
        { $push: { offers: createdOffer } },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTrip => {
          Tourist.findOneAndUpdate(
            {
              _id: req.params.touristID,
              "trips._id": req.params.tripID
            },
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
                msg: "This Offer has been created successfully",
                data: createdOffer
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
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Accept an Offer by its id
const Accept = (req, res) => {
  Offer.findById(req.params.id)
    .then(foundOffer => {
      Trip.findByIdAndUpdate(
        req.params.tripID,
        {
          $pull: { offers: { _id: req.params.id } },
          $set: { acceptedOffer: foundOffer }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTrip => {
          Tourist.findOneAndUpdate(
            {
              _id: req.params.touristID,
              "trips._id": req.params.tripID
            },
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
                msg: "This Offer has been accepted successfully",
                data: foundOffer
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
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read Offer by its id
const Read = (req, res) => {
  Offer.findById(req.params.id)
    .populate({ path: "tourguide", select: { name: 1, interests: 1 } })
    .exec()
    .then(foundOffer => {
      res.json({
        msg: "This Offer information",
        data: foundOffer
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Offers
const ReadAll = (req, res) => {
  Offer.find({})
    .populate({ path: "tourguide", select: { name: 1, interests: 1 } })
    .exec()
    .then(foundOffers => {
      res.json({
        msg: "All Offers information",
        data: foundOffers
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Offers of a certain trip by its id
const ReadAllOfTrip = (req, res) => {
  Trip.findById(req.params.tripID)
    .populate({ path: "offers.tourguide", select: { name: 1, interests: 1 } })
    .exec()
    .then(foundTrip => {
      res.json({
        msg: "This trip's Offers information",
        data: foundTrip
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all my Offers by my tourguide id
const ReadAllMy = (req, res) => {
  Tourguide.findById(req.params.tourguideID)
    .populate("offers")
    .exec()
    .then(foundTourguide => {
      res.json({
        msg: "Your offers information",
        data: foundTourguide.offers
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Update Offer by its id
const Update = (req, res) => {
  Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedOffer => {
      Trip.findOneAndUpdate(
        { _id: req.params.tripID, "offers._id": req.params.id },
        {
          "offers.$": updatedOffer
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTrip => {
          Tourist.findOneAndUpdate(
            {
              _id: req.params.touristID,
              "trips._id": req.params.tripID
            },
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
                msg: "This Offer has been updated successfully",
                data: updatedOffer
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
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Delete Offer by its id
const Delete = (req, res) => {
  Offer.findByIdAndDelete(req.params.id)
    .then(deletedOffer => {
      Trip.findByIdAndUpdate(
        req.params.tripID,
        {
          $pull: { offers: { _id: req.params.id } }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTrip => {
          Tourist.findOneAndUpdate(
            {
              _id: req.params.touristID,
              "trips._id": req.params.tripID
            },
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
                msg: "This Offer has been deleted successfully",
                data: deletedOffer
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
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};

module.exports = {
  Create,
  Accept,
  Read,
  ReadAll,
  ReadAllOfTrip,
  ReadAllMy,
  Update,
  Delete
};
