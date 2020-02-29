const Document = require("../models/Document");

exports.getDocument = async (req, res, next) => {
  try {
    const doc = await Document.find();

    return res.status(200).json({
      success: true,
      count: doc.length,
      data: doc
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error"
    });
  }
};

exports.addDocument = async (req, res, next) => {
  try {
    // const {title, body} = req.body;

    const doc = await Document.create(req.body);

    return res.status(201).json({
      success: true,
      data: doc
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }
};

exports.updateDocument = async (req, res, next) => {
  Document.findByIdAndUpdate(
    req.params._id,
    { title: req.body.title, body: req.body.body },
    (err, info) => {
      if (err) next(err);
      else
        res.json({
          success: true,
          data: req.body
        });
    }
  );
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "No doc found"
      });
    }

    await doc.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
