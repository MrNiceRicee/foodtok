class ErrorException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ErrorException';
    this.statusCode = statusCode;
  }
}

export default ErrorException;
