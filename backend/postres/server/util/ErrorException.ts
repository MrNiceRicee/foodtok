class ErrorException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ErrorException';
    this.statusCode = statusCode;
    this.stack = undefined;
  }
}

export default ErrorException;
