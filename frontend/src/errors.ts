import { AxiosError } from 'axios';

class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleApiError = (error: unknown, customMessage: string): never => {
  console.error(customMessage, error);

  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || error.message || customMessage;
    throw new Error(errorMessage);
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(customMessage);
};

export { CustomError, handleApiError };
