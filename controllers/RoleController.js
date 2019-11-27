const Role = require("../models/Role");

exports.CreateRole = async (req, res, next) => {
  const role = new Role({
    nameRole: req.body.nameRole
  });
  role.save((err, product) => {
    if (err) next(err);
    else {
      res.status(200).json({
        role: product
      });
    }
  });
};
