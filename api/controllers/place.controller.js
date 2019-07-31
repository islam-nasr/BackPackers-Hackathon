const Place = require("../../models/place.model");

//Create Place
const Create = (req, res) => {
  Place.create(req.body)
    .then(createdPlace => {
      res.json({
        msg: "This Place has been created successfully",
        data: createdPlace
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read Place by its id
const Read = (req, res) => {
  Place.findById(req.params.id)
    .then(foundPlace => {
      res.json({
        msg: "This Place information",
        data: foundPlace
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Places
const ReadAll = (req, res) => {
  Place.find({})
    .then(foundPlaces => {
      res.json({
        msg: "All Places information",
        data: foundPlaces
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Update Place by its id
const Update = (req, res) => {
  Place.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedPlace => {
      res.json({
        msg: "This Place has been updated successfully",
        data: updatedPlace
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Delete Place by its id
const Delete = (req, res) => {
  Place.findByIdAndDelete(req.params.id)
    .then(deletedPlace => {
      res.json({
        msg: "This Place has been deleted successfully",
        data: deletedPlace
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
  Update,
  Delete
};
