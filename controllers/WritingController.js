const message = require("../constants/message");
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
      message: message.CREATE_SUCCESSFULLY,
      data: resp
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const resp = await Writing.find().populate(["postedBy", "checkedBy"]);
    return res.status(200).json({
      data: resp
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const resp = await Writing.findById(req.params._id).populate("postedBy");
    return res.status(200).json({
      data: resp
    });
  } catch (error) {
    next(error);
  }
};

exports.checkWriting = async (req, res, next) => {
  console.log(req.body);
  if (!req.body["responsePost"]) {
    return res.status(404).json({
      message: "No response"
    });
  }
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

exports.getAllByMe = async (req, res, next) => {
  try {
    const data = await Writing.find({ postedBy: req.decoded.userId }).populate(
      "checkedBy"
    );
    return res.status(200).json({
      data
    });
  } catch (error) {
    next(error);
  }
};
