import express from "express";
import multer from "multer";
const app = express();

/* const upload = multer({ dest: "uploads/" }); */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(undefined, "uploads");
  },
  filename: (req, file, cb) => {
    // Date.now returns unix epoch time in milliseconds
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uniqueFileName = `${uniquePrefix}_${file.originalname}`;

    cb(undefined, uniqueFileName);
  },
});

function fileFilter(req, file, cb) {
  const validTypes = ["image/png", "image/svg", "image/jpg", "image/jpeg"];

  if (!validTypes.includes(file.mimetype)) {
    cb(new Error("File type is not allowed " + file.mimetype), false);
  } else {
    cb(null, true);
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
  fileFilter, // make sure that its a valid file type
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/form", (req, res) => {
  delete req.body.password;
  console.log(req.body);
  res.send(req.body);
});

//            upload.any(), also works well because you dont specify what and where
app.post("/fileform", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
