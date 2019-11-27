const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const message = require("../constants/message");
const jwt = require("jsonwebtoken");
const jwt_constant = require("../constants/JWT");
const mongoose = require("mongoose");

exports.UserLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) next(err);
    else {
      if (!user) {
        let err = new Error();
        err.status = 404;
        err.message = message.NONE_EXISTED_USER;
        next(err);
      } else {
        bcryptjs.compare(req.body.password, user.password, (err, success) => {
          if (err) next(err);
          else if (!success) {
            let err = new Error();
            err.status = 404;
            err.message = message.WRONG_PASSWORD;
            next(err);
          } else if (!user.active) {
            let err = new Error();
            err.status = 404;
            err.message = message.IN_ACTIVE;
            next(err);
          } else {
            const token = jwt.sign(
              { userId: user._id },
              jwt_constant.JWT_SECRET_KEY
            );
            res.status(200).json({
              token
            });
          }
        });
      }
    }
  });
};

exports.UserRegister = (req, res, next) => {
  console.log(req.body);
  User.findOne(
    {
      email: req.body.email
    },
    (err, user) => {
      if (err) next(err);
      else {
        if (user) {
          let err = new Error();
          err.status = 404;
          err.message = "Existed account";
          next(err);
        } else {
          bcryptjs.hash(req.body.password, 10, (err, hash) => {
            if (err) next(err);
            else {
              let newUser = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                role: mongoose.Types.ObjectId(req.body.role)
              });
              newUser.save((err, newUser) => {
                if (err) next(err);
                else {
                  res.status(200).json({
                    message: "Created Successfully",
                    user: newUser
                  });
                }
              });
            }
          });
        }
      }
    }
  );
};

exports.UpdateUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.decoded.userId },
    {
      email: req.body.email,
      name: req.body.name
    },
    { new: true, useFindAndModify: false }
  )
    .exec()
    .then(doc =>
      res.status(200).json({
        doc
      })
    )
    .catch(err => next(err));
};

exports.GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("role");
    const totalCount = await User.countDocuments();
    res.status(200).json({
      totalCount,
      users
    });
  } catch (error) {
    next(error);
  }
  // User.find().then(doc => {
  //   res.status(200).json({
  //     users: doc
  //   });
  // });
};

exports.ToggleActivateUser = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        message: "Not Found"
      });
    } else {
      user.active = !user.active;
      const newUser = await user.save();
      return res.status(200).json({
        message: "Change successfully",
        user: newUser
      });
    }
  } catch (error) {
    next(error);
  }
};
