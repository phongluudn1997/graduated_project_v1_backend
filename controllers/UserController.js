const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const message = require("../constants/message");
const jwt = require("jsonwebtoken");
const jwt_constant = require("../constants/JWT");

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
          else {
            if (!success) {
              let err = new Error();
              err.status = 404;
              err.message = message.WRONG_PASSWORD;
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
                password: hash
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
