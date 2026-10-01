
import express from "express";
import multer from "multer";
import * as c from "../controllers/bookController.js";

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_, f, cb) => cb(null, Date.now() + "-" + f.originalname)
  })
});

router.get("/", c.getBooks);
router.get("/:id", c.getBook);
router.post("/", upload.single("image"), c.createBook);
router.put("/:id", upload.single("image"), c.updateBook);
router.delete("/:id", c.deleteBook);

export default router;
