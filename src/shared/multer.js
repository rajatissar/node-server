import path from 'path';
import multer from 'multer';
import { set, includes } from 'lodash';

import { ERROR_MESSAGES } from '../helpers/messages';
import { FILE_UPLOAD_EXTENSIONS_SUPPORTED, DIRECTORY } from '../helpers/constants';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `../../${DIRECTORY.TEMPORARY}`));
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split('.')[0];
    const fileExtension = file.originalname.split('.')[1];
    if (!includes(FILE_UPLOAD_EXTENSIONS_SUPPORTED, fileExtension)) {
      cb(new Error(ERROR_MESSAGES.FILE_EXTENSION_NOT_SUPPORTED));
    } else {
      const changedFileName = `${fileName}-${Date.now()}.${fileExtension}`;
      set(req, 'changedFileName', changedFileName, null);
      cb(null, changedFileName);
    }
  }
});
const upload = multer({ storage });

export default upload;
