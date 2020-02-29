const express = require("express");
const router = express.Router();
const {
  addDocument,
  deleteDocument,
  getDocument,
  updateDocument
} = require("../controllers/document");

router
  .route("/")
  .get(getDocument)
  .post(addDocument);

router
  .route("/:id")
  .delete(deleteDocument)
  .put(updateDocument);

module.exports = router;
