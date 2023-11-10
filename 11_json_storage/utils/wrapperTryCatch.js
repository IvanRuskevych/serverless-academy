const wrapperTryCatch = (controllerFn) => {
  const fn = async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};

module.exports = { wrapperTryCatch };
