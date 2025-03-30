export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: any;
  protected isOperational: boolean;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors?: Array<any>,
    stack?: string,
    isOperational = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
