import dotenv from "dotenv";
dotenv.config();

const { PORT, ORIGIN, CLIENT_LIST, API_KEY_LIST } = process.env;

export const SERVER_PORT = PORT || 8000;

// Origins : domain (protocol + hostname + port)
export const SERVER_ORIGIN = ORIGIN || `http://localhost:${SERVER_PORT}`;
export const CLIENT_ORIGINS = CLIENT_LIST?.split(",") || [
  "http://localhost:3000",
];

export const CLIENT_AUTH_PAIRS: { [key: string]: any } = {};
CLIENT_LIST?.split(",").forEach(
  (client, i) => (CLIENT_AUTH_PAIRS[client] = API_KEY_LIST?.split(",")[i]),
);

export const corsOptions = {
  origin: [SERVER_ORIGIN, ...CLIENT_ORIGINS],
  optionsSuccessStatus: 200,
};
