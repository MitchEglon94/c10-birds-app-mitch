import Bird from "../models/birds/bird.model.js";
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

export const getBirds = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Bird.find(query)
    // .populate("items")
    .exec((err, birds) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && birds.length === 0)
        return res.status(404).send({ message: "No bird with that ID" });
      return res.status(200).json(birds);
    });
};

// exports.getOwnBirds = function (req, res) {
//   let query = {
//     customerID: req.user.sub, // ensure own birds only
//   };

//   if (req.params.id) {
//     query._id = req.params.id;
//   }
//   Bird.find(query)
//     .populate("items")
//     .exec((err, birds) => {
//       if (err) return errorHandler(res, err);
//       if (req.params.id && birds.length === 0)
//         return res.status(404).send({ message: "No bird with that ID" });
//       return res.status(200).json(birds);
//     });
// };

export const addBird = function (req, res) {
  const birdData = req.body;
  logger.info(`birdData ${birdData}`);
  const newBird = new Bird(birdData);
  newBird.save((err, bird) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(bird);
  });
};

// exports.addOwnBird = function (req, res) {
//   // { items: [{}, {}], customerID: '23k42lj34278' }
//   const birdData = { ...req.body, customerID: req.user.sub };
//   logger.info(`birdData ${birdData}`);
//   const newBird = new Bird(birdData);
//   newBird.save((err, bird) => {
//     if (err) return errorHandler(res, err);
//     return res.status(201).json(bird);
//   });
// };

export const updateBird = function (req, res) {
  Bird.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    logger.info(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No bird with that ID" });
    res.sendStatus(200);
  });
};

// exports.updateOwnBird = function (req, res) {
//   Bird.updateOne(
//     { _id: req.params.id, owner: req.user.sub },
//     req.body,
//     function (err, result) {
//       if (err) return errorHandler(res, err);
//       logger.info(`result ${result}`);
//       if (result.nModified === 0)
//         return res.status(404).send({ message: "No bird with that ID" });
//       res.sendStatus(200);
//     }
//   );
// };

export const removeBird = function (req, res) {
  const birdId = req.params.id;
  Bird.deleteOne({ _id: birdId }, function (err, report) {
    if (err) return errorHandler(res, err);
    logger.info(`report ${report}`);
    if (birdId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No bird with that ID" });
    }
    res.sendStatus(204);
  });
};

// exports.removeOwnBird = function (req, res) {
//   const birdId = req.params.id;
//   Bird.deleteOne({ _id: birdId, owner: req.user.sub }, function (err, report) {
//     if (err) return errorHandler(res, err);
//     logger.info(`report ${report}`);
//     if (birdId && report.deletedCount === 0) {
//       return res.status(404).send({ message: "No bird with that ID" });
//     }
//     res.sendStatus(204);
//   });
// };
