import express, { NextFunction } from "express";
import { CLIENT_AUTH_PAIRS } from "./config";

export const validateAPIKey = (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  const key = req.get("Authorization");
  const origin = req.get("origin");

  // Validate correct headers provided
  if (!key || !origin) {
    console.log("Auth Middleware: Required headers not provided")
    return res.status(400).send("Required headers not provided");
  }

  // Get preserved API key
  const secret = CLIENT_AUTH_PAIRS[origin];
  if (!secret) {
    console.log("Auth Middleware: API key is not configured")
    return res.status(500).send("API key is not configured");
  }

  // Validate API key
  if (secret !== key) {
    console.log("Auth Middleware: Invalid API key")
    return res.status(401).send("Invalid API key");
  }

  console.log("Auth Middleware: Passed")
  next();
};
