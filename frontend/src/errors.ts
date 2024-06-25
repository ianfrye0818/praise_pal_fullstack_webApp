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

const handleApiError = (error: unknown, customMessage?: string): never => {
  console.error(customMessage, error);

  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || error.message || customMessage;
    throw new CustomError(errorMessage, error.response?.status || 500);
  }

  if (error instanceof Error) {
    throw new CustomError(error.message, 500);
  }

  throw new CustomError(customMessage || 'An unknown error occured', 500);
};

export { CustomError, handleApiError };
