import { ApplicationError } from "@/protocols";
<<<<<<< HEAD
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
=======
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response, next: NextFunction) {
>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
  if (err.name === "CannotEnrollBeforeStartDateError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "InvalidCredentialsError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

<<<<<<< HEAD
=======
  if (err.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err.name);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
<<<<<<< HEAD
=======

  next();
>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
}
