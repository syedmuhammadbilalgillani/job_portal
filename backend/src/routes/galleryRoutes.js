import express from "express";

import { upload } from "../middlewares/multer_middleware.js";
import {
    deleteAllImages,
    deleteImages,
    getImages,
    uploadImage,
} from "../controllers/galleryController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/uploadImageInGallery", verifyToken, upload.array("images", 10), uploadImage);
router.get("/readAllGalleryImages", verifyToken, getImages);
router.delete("/deleteSelectedImage", verifyToken, deleteImages);
router.delete("/deleteAllGalleryImages", verifyToken, deleteAllImages);
export default router;
