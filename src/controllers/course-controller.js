import { get } from 'lodash';
import mongoose from 'mongoose';

import courseModel from '../models/course-model';
import { successHandler, errorHandler } from '../helpers/response-handler';
import { COURSE_CREATE_RESPONSES, COURSE_UPDATE_RESPONSES } from '../helpers/responses';
import { createRecord, updateOneRecord, findAllRecord } from '../shared/mongodb';

export default {
  createCourse: async (req, res) => {
    try {
      const createCourseQuery = get(req, 'body', {});
      await createRecord(courseModel, createCourseQuery);
      return successHandler(
        res,
        COURSE_CREATE_RESPONSES.SUCCESS,
        COURSE_CREATE_RESPONSES.SUCCESS.statusCode
      );
    } catch (err) {
      return errorHandler(res, err, 500);
    }
  },

  updateCourse: async (req, res) => {
    try {
      const courseId = get(req, 'params.courseId', null);
      const bodyParams = get(req, 'body', {});

      const updateQuery = {
        filter: {
          _id: mongoose.Types.ObjectId(courseId)
        },
        updateData: {
          $set: bodyParams
        },
        options: {}
      };
      await updateOneRecord(courseModel, updateQuery);
      return successHandler(
        res,
        COURSE_UPDATE_RESPONSES.SUCCESS,
        COURSE_UPDATE_RESPONSES.SUCCESS.statusCode
      );
    } catch (err) {
      return errorHandler(res, err, 500);
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const findQuery = { options: { limit: 1 } };
      const allCourses = await findAllRecord(courseModel, findQuery);
      return successHandler(
        res,
        allCourses,
        200
      );
    } catch (err) {
      return errorHandler(res, err, 500);
    }
  }
};
