export const asyncErrorWrapper = (controllerFn) => {
  const fn = async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return fn;
};
