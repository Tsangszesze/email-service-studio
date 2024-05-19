import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.local" });
}

export * from "./server";
export * from "./email";
export * from "./otp";
