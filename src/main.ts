import { Request, Response } from "express";

interface Options {
  delay?: number;
  maxDelay?: number;
  failRate: number;
}

export const badServer = ({
  delay = 0,
  maxDelay = 0,
  failRate = 0,
}: Options) => (req: Request, res: Response, next: Function) => {
  if (process.env.NODE_ENV === "production") {
    return next();
  }

  const finalDelay = delay || Math.random() * maxDelay;
  const willFail = Math.random() < failRate;

  if (willFail) {
    return res.status(500).send("Request Failed");
  }

  setTimeout(next, finalDelay);
};
