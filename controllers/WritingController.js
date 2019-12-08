const Writing = require("../models/WritingService");

exports.createWriting = async (req, res, next) => {
  let doc = new Writing({
    question: req.body.question,
    body: req.body.body,
    image: req.file ? req.file.path : null,
    postedBy: req.decoded.userId
  });
  try {
    const resp = await doc.save();
    return res.status(200).json({
      data: resp
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const resp = await Writing.find();
    return res.status(200).json({
      data: resp
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const resp = await Writing.findById(req.params._id);
    return res.status(200).json({
      data: resp
    });
  } catch (error) {
    next(error);
  }
};

exports.checkWriting = async (req, res, next) => {
  let writing = { ...req.body };
  writing.checkedBy = req.decoded.userId;
  writing.status = "Done";
  console.log(writing);
  try {
    const data = await Writing.findByIdAndUpdate(req.params._id, writing, {
      useFindAndModify: false
    });
    return res.status(200).json({
      data
    });
  } catch (error) {
    next(error);
  }
};
