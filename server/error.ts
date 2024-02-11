import { H3Error, H3Event } from "h3";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default (error: H3Error, event: H3Event) => {
  console.error(`${event.method} ${event.path} - ${error.stack}`);

  const errorData = formatError(
    error.data instanceof Error ? error.data : error,
  );

  if (!errorData.status) {
    errorData.status = 500;
  }

  setResponseStatus(event, errorData.status);
  setHeader(event, "Content-Type", "application/json");

  return send(event, JSON.stringify(errorData, null, 2));
};

type ErrorData = {
  status?: number;
  message: string;
  details?: unknown;
};

const formatError = (error: unknown): ErrorData => {
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);

    return {
      status: 400,
      message: validationError.message,
      details: error.issues,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  if (typeof error === "string") {
    return {
      message: error,
    };
  }

  return {
    message: "Unknown error",
    details: error,
  };
};
