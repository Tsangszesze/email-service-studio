import express, { NextFunction } from "express";
import { CLIENT_AUTH_PAIRS } from "./config";
import { ResBody } from "./types";

export const validateAPIKey = (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  const key = req.get("Authorization");
  const origin = req.get("client");

  // Validate correct headers provided
  if (!key || !origin) {
    return res.status(400).send(new ResBody("Required headers not provided"));
  }

  // Validate API key
  const secret = CLIENT_AUTH_PAIRS[origin];
  if (!secret) {
    return res
      .status(500)
      .send(new ResBody("Server is not well configured with API keys"));
  }

  // Validate API key
  if (secret !== key) {
    return res.status(401).send(new ResBody("Invalid API key"));
  }

  next();
};
