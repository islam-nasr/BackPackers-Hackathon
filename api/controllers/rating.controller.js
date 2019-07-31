const Rating = require("../../models/rating.model");
const Place = require("../../models/place.model");
const Trip = require("../../models/trip.model");
const Tourguide = require("../../models/user.model").Tourguide;
const Tourist = require("../../models/user.model").Tourist;

//Create Rating for a place
const CreateForPlace = (req, res) => {
  Rating.create({ user: req.params.userID, ...req.body })
    .then(createdRating => {
      Place.findByIdAndUpdate(
        req.params.placeID,
        { $push: { ratings: createdRating } },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedPlace => {
          res.json({
            msg: "This Rating has been created successfully",
            data: createdRating
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
//Create Rating for a trip
const CreateForTrip = (req, res) => {
  Rating.create({ user: req.params.userID, ...req.body })
    .then(createdRating => {
      Trip.findByIdAndUpdate(
        req.params.tripID,
        { $set: { rating: createdRating } },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTrip => {
          res.json({
            msg: "This Rating has been created successfully",
            data: createdRating
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
//Create Rating for a tourguide
const CreateForTourguide = (req, res) => {
  Rating.create({ user: req.params.userID, ...req.body })
    .then(createdRating => {
      Tourguide.findByIdAndUpdate(
        req.params.tourguideID,
        { $push: { ratings: createdRating } },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourguide => {
          res.json({
            msg: "This Rating has been created successfully",
            data: createdRating
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
//Create Rating for a tourist
const CreateForTourist = (req, res) => {
  Rating.create({ user: req.params.userID, ...req.body })
    .then(createdRating => {
      Tourist.findByIdAndUpdate(
        req.params.touristID,
        { $push: { ratings: createdRating } },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourist => {
          res.json({
            msg: "This Rating has been created successfully",
            data: createdRating
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
//Read Rating by its id
const Read = (req, res) => {
  Rating.findById(req.params.id)
    .then(foundRating => {
      res.json({
        msg: "This Rating information",
        data: foundRating
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Ratings
const ReadAll = (req, res) => {
  Rating.find({})
    .then(foundRatings => {
      res.json({
        msg: "All Ratings information",
        data: foundRatings
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Ratings of a certain place by its id
const ReadAllOfPlace = (req, res) => {
  Place.findById(req.params.id)
    .then(foundPlace => {
      res.json({
        msg: "This Place's ratings information",
        data: foundPlace.ratings
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Ratings of a certain trip by its id
const ReadAllOfTrip = (req, res) => {
  Trip.findById(req.params.id)
    .then(foundTrip => {
      res.json({
        msg: "This Trip's ratings information",
        data: foundTrip.rating
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all ratings of a certain tourguide by its id
const ReadAllOfTourguide = (req, res) => {
  Tourguide.findById(req.params.id)
    .then(foundTourguide => {
      res.json({
        msg: "This Tourguide's ratings information",
        data: foundTourguide.ratings
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all ratings of a certain tourist by its id
const ReadAllOfTourist = (req, res) => {
  Tourist.findById(req.params.id)
    .then(foundTourist => {
      res.json({
        msg: "This Tourist's ratings information",
        data: foundTourist.ratings
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Update Rating by its id for a place
const UpdateForPlace = (req, res) => {
  Rating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedRating => {
      Place.findOneAndUpdate(
        { _id: req.params.placeID, "ratings._id": req.params.id },
        {
          "ratings.$": updatedRating
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedPlace => {
          res.json({
            msg: "This Rating has been updated successfully",
            data: updatedRating
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
//Update Rating by its id for a trip
const UpdateForTrip = (req, res) => {
  Rating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedRating => {
      Trip.findByIdAndUpdate(
        req.params.tripID,
        {
          $set: { rating: updatedRating }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTrip => {
          res.json({
            msg: "This Rating has been updated successfully",
            data: updatedRating
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
//Update Rating by its id for a tourguide
const UpdateForTourguide = (req, res) => {
  Rating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedRating => {
      Tourguide.findOneAndUpdate(
        { _id: req.params.tourguideID, "ratings._id": req.params.id },
        {
          "ratings.$": updatedRating
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourguide => {
          res.json({
            msg: "This Rating has been updated successfully",
            data: updatedRating
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
//Update Rating by its id for a tourist
const UpdateForTourist = (req, res) => {
  Rating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedRating => {
      Tourist.findOneAndUpdate(
        { _id: req.params.touristID, "ratings._id": req.params.id },
        {
          "ratings.$": updatedRating
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourist => {
          res.json({
            msg: "This Rating has been updated successfully",
            data: updatedRating
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
//Delete Rating by its id for a place
const DeleteForPlace = (req, res) => {
  Rating.findByIdAndDelete(req.params.id)
    .then(deletedRating => {
      Place.findByIdAndUpdate(
        req.params.placeID,
        {
          $pull: { ratings: { _id: req.params.id } }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedPlace => {
          res.json({
            msg: "This Rating has been deleted successfully",
            data: deletedRating
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
//Delete Rating by its id for a trip
const DeleteForTrip = (req, res) => {
  Rating.findByIdAndDelete(req.params.id)
    .then(deletedRating => {
      Trip.findByIdAndUpdate(
        req.params.tripID,
        {
          $set: { rating: null }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTrip => {
          res.json({
            msg: "This Rating has been deleted successfully",
            data: deletedRating
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
//Delete Rating by its id for a tourguide
const DeleteForTourguide = (req, res) => {
  Rating.findByIdAndDelete(req.params.id)
    .then(deletedRating => {
      Tourguide.findByIdAndUpdate(
        req.params.tourguideID,
        {
          $pull: { ratings: { _id: req.params.id } }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourguide => {
          res.json({
            msg: "This Rating has been deleted successfully",
            data: deletedRating
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
//Delete Rating by its id for a tourist
const DeleteForTourist = (req, res) => {
  Rating.findByIdAndDelete(req.params.id)
    .then(deletedRating => {
      Tourist.findByIdAndUpdate(
        req.params.touristID,
        {
          $pull: { ratings: { _id: req.params.id } }
        },
        {
          new: true,
          runValidators: true
        }
      )
        .then(updatedTourist => {
          res.json({
            msg: "This Rating has been deleted successfully",
            data: deletedRating
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
//Read Rating by its id
// const Read = (req, res) => {
//   Rating.findById(req.params.id)
//     .populate({path : "user", select : {"ratings" : 0}})
//     .exec()
//     .then(foundRating => {
//       res.json({
//         msg: "This Rating information",
//         data: foundRating
//       });
//     })
//     .catch(error => {
//       res.json({
//         err: error.message
//       });
//     });
// };

module.exports = {
  CreateForPlace,
  CreateForTrip,
  CreateForTourguide,
  CreateForTourist,
  Read,
  ReadAll,
  ReadAllOfPlace,
  ReadAllOfTrip,
  ReadAllOfTourguide,
  ReadAllOfTourist,
  UpdateForPlace,
  UpdateForTrip,
  UpdateForTourguide,
  UpdateForTourist,
  DeleteForPlace,
  DeleteForTrip,
  DeleteForTourguide,
  DeleteForTourist
};
