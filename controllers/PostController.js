const Post = require("../models/Post");

exports.uploadPost = async (req, res, next) => {
  let newPost = new Post({
    type: req.body.type,
    title: req.body.title,
    body: req.body.body,
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

exports.getPosts = (req, res, next) => {
  Post.find((err, docs) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        docs
      });
    }
  });
};

// GET Post with specific type
exports.getPostsByType = (req, res, next) => {
  Post.find({ type: req.params.type }, (err, docs) => {
    if (err) next(err);
    else {
      return res.json({
        docs
      });
    }
  });
};

exports.getPost = (req, res, next) => {
  const { type, id } = req.params;
  if (id === "latest") {
    Post.findOne({ type })
      .sort({ created_at: -1 })
      .exec((err, doc) => {
        if (err) next(err);
        else {
          return res.json({ doc });
        }
      });
  } else {
    Post.findOne({ type, _id: id }, (err, doc) => {
      if (err) next(err);
      else {
        return res.json({
          doc
        });
      }
    });
  }
};
