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
  .put(updateDocument)
  .get(getDocument)
  .post(addDocument);

router.route("/:id").delete(deleteDocument);

module.exports = router;
