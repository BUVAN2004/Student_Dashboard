const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "my-uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + ".pdf");
  },
});

const upload = multer({ storage: storage });
router.get("/:filename", (req, res) => {
    const filename = req.params.filename + ".pdf";
    console.log(filename);
    const filePath = path.join(__dirname, "../my-uploads", filename);
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Error while sending the file:", err);
        res.status(500).send("Error downloading the file.");
      }
    });
});
router.post("/:id", upload.single("file"), async (req, res) => {
  console.log(req.params.id);
  console.log(req.file);
  res.json({ message: `file uploaded successfully`});
});


module.exports = router;
