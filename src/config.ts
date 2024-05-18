import dotenv from "dotenv";
dotenv.config();

const { PORT, ORIGIN, CLIENT_LIST, API_KEY_LIST } = process.env;

export const SERVER_PORT = PORT || 8000;

// Origins : domain (protocol + hostname + port)
export const SERVER_ORIGIN = ORIGIN || `http://localhost:${SERVER_PORT}`;
export const CLIENT_ORIGINS = CLIENT_LIST?.split(",") || [
  "http://localhost:3000",
];

const API_KEYS = API_KEY_LIST?.split(",") || [""];
const CLIENT_AUTH_PAIRS: { [key: string]: unknown } = {};
CLIENT_ORIGINS.forEach(
  (client, i) => (CLIENT_AUTH_PAIRS[client] = API_KEYS[i]),
);
export { CLIENT_AUTH_PAIRS }

export const corsOptions = {
  origin: [SERVER_ORIGIN, ...CLIENT_ORIGINS],
  optionsSuccessStatus: 200,
};
