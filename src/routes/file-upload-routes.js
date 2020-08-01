import express from 'express';

import { FILE_UPLOAD_ROUTES } from '../helpers/routes';
import fileUploadController from '../controllers/file-upload-controller';
import upload from '../shared/multer';

const router = express.Router();

// file upload
router.post(
  FILE_UPLOAD_ROUTES.UPLOAD,
  upload.single('imageName'),
  fileUploadController.fileUpload
);

export default router;
