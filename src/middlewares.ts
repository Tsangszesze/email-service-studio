import express, { NextFunction } from "express";
import { CLIENT_AUTH_PAIRS } from "./config";
import { ResBody } from "./types";

export const validateAPIKey = (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  const key = req.get("Authorization");
  const origin = req.get("origin");

  // Validate correct headers provided
  if (!key || !origin) {
    return res.status(400).send(new ResBody("Required headers not provided"));
  }

  // Get preserved API key
  const secret = CLIENT_AUTH_PAIRS[origin];
  if (!secret) {
    return res.status(500).send(new ResBody("API key is not configured"));
  }

  // Validate API key
  if (secret !== key) {
    return res.status(401).send(new ResBody("Invalid API key"));
  }

  next();
};
