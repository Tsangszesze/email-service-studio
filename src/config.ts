import dotenv from "dotenv";
dotenv.config();

export const serverPort = process.env.PORT || 8000;

// Origins : domain (protocol + hostname + port)
export const serverOrigin = process.env.ORIGIN || `http://localhost:${serverPort}`;
export const clientOrigins = process.env.CLIENT_LIST?.split(",") || [
  "http://localhost:3000",
];

export const corsOptions = {
  origin: [serverOrigin, ...clientOrigins],
  optionsSuccessStatus: 200,
};