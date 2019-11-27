const Post = require("../models/Post");

exports.uploadPost = async (req, res, next) => {
  console.log(req.body);
  let newPost = new Post({
    type: req.body.type,
    title: req.body.title,
    body: req.body.body,
    postedBy: req.decoded.userId,
    image: req.files ? req.files.image[0].path : null
  });

  newPost.save(err => {
    if (err) next(err);
    else {
      return res.status(200).json({
        post: newPost,
        url: newPost.url,
        message: "Create successfully"
      });
    }
  });
};

exports.getPosts = async (req, res, next) => {
  try {
    const resp = await Post.find().populate("postedBy");
    res.status(200).json({
      docs: resp
    });
  } catch (error) {
    next(error);
  }
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

exports.getLatest = (req, res, next) => {
  Post.findOne({ type: req.params.type.toLowerCase() })
    .populate("postedBy")
    .sort({ created_at: -1 })
    .exec((err, doc) => {
      if (err) next(err);
      else {
        return res.json({ doc });
      }
    });
};

exports.getPost = (req, res, next) => {
  const { id } = req.params;

  Post.findOne({ _id: id }, (err, doc) => {
    if (err) next(err);
    else {
      return res.json({
        doc
      });
    }
  });
};

exports.updateOne = (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  console.log(req.body);
  let post = { ...req.body };
  if (req.files.image) {
    post = { ...post, image: req.files.image[0].path };
  }
  console.log(post);
  Post.findByIdAndUpdate(_id, post, (err, doc) => {
    if (err) next(err);
    return res.json({ message: "Successfully", doc });
  });
};

exports.deleteById = (req, res, next) => {
  const { _id } = req.params;
  Post.findByIdAndDelete(_id, (err, resp) => {
    if (err) next(err);
    else
      res.status(200).json({
        message: "Delete successfully"
      });
  });
};
