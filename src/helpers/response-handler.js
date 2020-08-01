const successHandler = (
  res,
  data = { data: 'unknown data' },
  status = 200
) => res.status(status).json(data);

const errorHandler = (
  res,
  err = { error: 'unknown error' },
  status = 500
) => res.status(status).json(err);

const renderHandler = (
  res,
  view = 'page-not-found',
  status = 404
) => res.status(status).render(view);

export {
  successHandler,
  errorHandler,
  renderHandler
};
