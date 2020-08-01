import { isAuthorized } from '../helpers/functions';

export default (router) => {
  router.use(isAuthorized);
};
