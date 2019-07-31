const Tourist = require("../../models/user.model").Tourist;

//Create a new Tourist profile
const Create = (req, res) => {
  Tourist.create(req.body)
    .then(createdTourist => {
      res.json({
        msg: "Your profile has been created successfully",
        data: createdTourist
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read my Tourist profile by my id
const Read = (req, res) => {
  Tourist.findById(req.params.id)
    .then(foundTourist => {
      res.json({
        msg: "Your profile information",
        data: foundTourist
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Read all Tourist profiles
const ReadAll = (req, res) => {
  Tourist.find({})
    .then(foundTourists => {
      res.json({
        msg: "All Tourists information",
        data: foundTourists
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Update my Tourist profile by my id
const Update = (req, res) => {
  Tourist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedTourist => {
      res.json({
        msg: "Your profile has been updated successfully",
        data: updatedTourist
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//Delete my Tourist profile by my id
const Delete = (req, res) => {
  Tourist.findByIdAndDelete(req.params.id)
    .then(deletedTourist => {
      res.json({
        msg: "Your profile has been deleted successfully",
        data: deletedTourist
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
