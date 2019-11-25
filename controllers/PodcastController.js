const Podcast = require("../models/Podcast");

exports.upload = (req, res, next) => {
  let newPost = new Podcast({
    title: req.body.title,
    description: req.body.description,
    transcript: req.body.transcript,
    // postedBy: req.decoded.userId,
    audio: req.files.audio ? req.files.audio[0].path : null,
    image: req.files.image ? req.files.image[0].path : null
  });

  console.log(req.body);

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

exports.getAll = async (req, res, next) => {
  try {
    // let { pageSize, current } = req.query;
    // pageSize = parseInt(pageSize);
    // current = parseInt(current);
    // console.log(pageSize, current);
    const foundPodcasts = await Podcast.find();
    // .skip(pageSize * (current - 1))
    // .limit(pageSize);
    const totalCount = await Podcast.countDocuments();
    return res.json({
      totalCount,
      data: foundPodcasts
    });
  } catch (err) {
    next(err);
  }
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

exports.deleteById = (req, res, next) => {
  const { _id } = req.params;
  Podcast.findByIdAndDelete(_id, (err, resp) => {
    if (err) next(err);
    else
      res.status(200).json({
        message: "Delete successfully"
      });
  });
};

exports.updateOne = (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  // let newPost = new Podcast({
  //   title: req.body.title,
  //   description: req.body.description,
  //   transcript: req.body.transcript,
  //   //postedBy: req.decoded.userId,
  //   audio: req.files.audio ? req.files.audio[0].path : null,
  //   image: req.files.image ? req.files.image[0].path : null
  // });
  console.log(req.body);
  let podcast = { ...req.body };
  if (req.files.image) {
    podcast = { ...podcast, image: req.files.image[0].path };
  }
  if (req.files.audio) {
    podcast = { ...podcast, audio: req.files.audio[0].path };
  }
  console.log(podcast);
  Podcast.findByIdAndUpdate(_id, podcast, (err, doc) => {
    if (err) next(err);
    return res.json({ message: "Successfully", doc });
  });
};
