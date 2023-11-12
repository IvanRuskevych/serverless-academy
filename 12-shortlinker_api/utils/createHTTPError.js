const httpStatusMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const createHTTPError = (
  status,
  message = httpStatusMessages[status]
) => {
  const error = new Error(message);
  error.status = status;

  return error;
};
