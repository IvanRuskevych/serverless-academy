function wrapperTryCatch(controllerFn) {
  const fn = async (req, res) => {
    try {
      await controllerFn(req, res);
    } catch (error) {
      next(error);
    }
  };

  return fn;
}

module.exports = { wrapperTryCatch };
