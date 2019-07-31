const Tourguide = require("../../models/user.model").Tourguide;

//Create a new Tourguide profile
const Create = (req, res) => {
  Tourguide.create(req.body)
    .then(createdTourguide => {
      res.json({
        msg: "Your profile has been created successfully",
        data: createdTourguide
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read my Tourguide profile by my id
const Read = (req, res) => {
  Tourguide.findById(req.params.id)
    .then(foundTourguide => {
      res.json({
        msg: "Your profile information",
        data: foundTourguide
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Tourguide profiles
const ReadAll = (req, res) => {
  Tourguide.find({})
    .then(foundTourguides => {
      res.json({
        msg: "All Tourguides information",
        data: foundTourguides
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Update my Tourguide profile by my id
const Update = (req, res) => {
  Tourguide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedTourguide => {
      res.json({
        msg: "Your profile has been updated successfully",
        data: updatedTourguide
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Delete my Tourguide profile by my id
const Delete = (req, res) => {
  Tourguide.findByIdAndDelete(req.params.id)
    .then(deletedTourguide => {
      res.json({
        msg: "Your profile has been deleted successfully",
        data: deletedTourguide
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
