const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please some text for the title of the document"]
  },
  body: {
    type: String,
    trim: true,
    required: [true, "Please some text for the body of the document"]
  },
  createdAt: {
    type: String
  }
});

module.exports = mongoose.model("Document", DocumentSchema);
