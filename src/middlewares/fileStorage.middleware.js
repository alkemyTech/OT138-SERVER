import mimeTypes from "mime-types";
import { v4 as uuidv4 } from "uuid";
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb("", uuidv4() + "." + mimeTypes.extension(file.mimetype));
  },
});
const upload = multer({ storage: storage });

function handleFileUpload(fieldName) {
  return (req, res, next) => {
    if (req.file) {
      if (
        req.body.json &&
        req.headers["content-type"]
          .toLowerCase()
          .includes("multipart/form-data")
      ) {
        try {
          req.body = { ...req.body, ...JSON.parse(req.body.json) };
          delete req.body.json;
        } catch (error) {
          res.json({
            error: true,
            errorCode: "REQ001",
            status: "400",
            message:
              "Failed to parse JSON at req.body.json. Details: " +
              error.message,
          });
        }
      }
      req.body[fieldName] =
        process.env.BACKEND_URL + "/" + req.file.path.replace("\\", "/");
    }
    next();
  };
}

function fileStorageMiddleware(fieldName) {
  return [upload.single(fieldName), handleFileUpload(fieldName)];
}
export default fileStorageMiddleware;
