const multer = require("multer");
const upload = multer({ dest: "uploads/" });

function handleFileUpload(fieldName) {
  return (req, res, next) => {
    console.log("file handling");
    if (req.file) {
      console.log("Request has file!");
      console.log("File", req.file);
      console.log("Body", req.body);
      if (req.body.json) {
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
    console.log("Body", req.body);
    next();
  };
}

function fileStorageMiddleware(fieldName) {
  return [upload.single(fieldName), handleFileUpload(fieldName)];
}
export default fileStorageMiddleware;
