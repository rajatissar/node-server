import { print } from '../helpers/functions';
import { successHandler } from '../helpers/response-handler';
import { FILE_UPLOAD_RESPONSES } from '../helpers/responses';
import { InternalServerError } from '../shared/error';

export default {
  fileUpload: async (req, res, next) => {
    try {
      print('req.file', req.file);
      return successHandler(
        res,
        FILE_UPLOAD_RESPONSES.SUCCESS,
        FILE_UPLOAD_RESPONSES.SUCCESS.statusCode
      );
    } catch (error) {
      return next(new InternalServerError(error.name, error.message, error.stack, 500));
    }
  }
};
