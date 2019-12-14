const Post = require("../models/Post");
const message = require("../constants/message");
const Comment = require("../models/Comment");

exports.uploadPost = async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  let newPost = new Post({
    type: req.body.type,
    title: req.body.title,
    body: req.body.body,
    postedBy: req.decoded.userId,
    image: req.file ? req.file.path : null
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
    const type = req.query.type;
    const resp = await Post.find(type ? { type } : null).populate("postedBy");
    const total = await Post.countDocuments(type ? { type } : null);
    res.status(200).json({
      total,
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

exports.getPost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const doc = await Post.findById(id).populate("postedBy");
    const comments = await Comment.find({ postId: id }).populate("postedBy");
    if (!doc) {
      const error = new Error();
      error.status = 404;
      error.message = message.NOT_FOUND;
      next(error);
    } else {
      return res.status(200).json({
        doc,
        comments
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateOne = (req, res, next) => {
  const { _id } = req.params;
  let post = { ...req.body };
  if (req.file) {
    post = { ...post, image: req.file.path };
  }
  console.log("day ne", post);
  Post.findByIdAndUpdate(_id, post, (err, doc) => {
    if (err) next(err);
    else {
      if (!doc) {
        let error = new Error();
        error.status = 404;
        error.message = message.NOT_FOUND;
        next(error);
      } else {
        return res.status(200).json({
          message: message.UPDATE_SUCCESSFULLY,
          doc
        });
      }
    }
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

exports.postComment = async (req, res, next) => {
  const comment = new Comment({
    ...req.body,
    postedBy: req.decoded.userId
  });
  try {
    const data = await comment.save();
    return res.status(200).json({
      message: message.POST_COMMENT_SUCCESSFULLY,
      data
    });
  } catch (error) {
    next(error);
  }
};
