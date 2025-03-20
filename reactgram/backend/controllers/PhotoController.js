const Photo = require("../models/Photo");

const mongoose = require("mongoose");

// Insert a photo, with a related user
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  console.log(req.body);

  res.send("Photo inserted");
};

module.exports = { insertPhoto };
