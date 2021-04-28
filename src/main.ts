import { Request, Response } from "express";

interface Options {
  delay?: number;
  maxDelay?: number;
  failRate?: number;
  httpStatus?: number;
  response?: any;
}

export const badServer = (options?: Options) => (
  req: Request,
  res: Response,
  next: Function
) => {
  const { httpStatus, response, delay, maxDelay, failRate } = options ?? {
    maxDelay: 250,
    failRate: 0.1,
  };

  if (httpStatus) {
    return res.status(httpStatus).send(response);
  }

  if (process.env.NODE_ENV === "production") {
    return next();
  }

  const finalDelay = delay || Math.random() * (maxDelay ?? 0);
  const willFail = Math.random() < (failRate ?? 0);

  if (willFail) {
    return res.status(500).send("Internal BadServer Error");
  }

  setTimeout(next, finalDelay);
};
