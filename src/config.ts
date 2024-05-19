import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
}

const { PORT, ORIGIN, CLIENT_LIST, API_KEY_LIST } = process.env;

export const MIX_SERVER_PORT = PORT || 8000;

export const MIX_SERVER_ORIGIN =
  ORIGIN || `http://localhost:${MIX_SERVER_PORT}`;
export const MIX_CLIENT_ORIGINS = CLIENT_LIST?.split(",") || [
  "http://localhost:3000",
];

const MIX_API_KEYS = API_KEY_LIST?.split(",") || ["testingLocal"];
const CLIENT_AUTH_PAIRS: { [key: string]: unknown } = {};
MIX_CLIENT_ORIGINS.forEach(
  (client, i) => (CLIENT_AUTH_PAIRS[client] = MIX_API_KEYS[i]),
);
export { CLIENT_AUTH_PAIRS };

export const corsOptions = {
  origin: [MIX_SERVER_ORIGIN, ...MIX_CLIENT_ORIGINS],
  optionsSuccessStatus: 200,
};
