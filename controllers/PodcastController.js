const Podcast = require("../models/Podcast");

exports.upload = (req, res, next) => {
  let newPost = new Podcast({
    title: req.body.title,
    description: req.body.description,
    transcript: req.body.transcript,
    postedBy: req.decoded.userId,
    audio: req.files.audio ? req.files.audio[0].path : null,
    image: req.files.image ? req.files.image[0].path : null
  });

  newPost.save(err => {
    if (err) next(err);
    else {
      return res.status(200).json({
        post: newPost,
        url: newPost.url
      });
    }
  });
};

exports.getAll = (req, res, next) => {
  Podcast.find((err, docs) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        docs
      });
    }
  });
};

// GET Podcast with specific type
exports.getLatest = (req, res, next) => {
  Podcast.findOne()
    .populate("postedBy")
    .sort({ created_at: -1 })
    .exec((err, doc) => {
      if (err) next(err);
      else {
        return res.json({ doc });
      }
    });
};

exports.getOne = (req, res, next) => {
  const { id } = req.params;
  Podcast.findOne({ _id: id }, (err, doc) => {
    if (err) next(err);
    else {
      return res.json({
        doc
      });
    }
  });
};
