class CustomError extends Error {
  custom: boolean;

  originalError?: Error;

  constructor(message: string, originalError?: Error) {
    super(message);
    this.custom = true;
    this.originalError = originalError;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
