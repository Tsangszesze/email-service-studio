// MIX_ : only production and default
// process.env. : production and local
const { ORIGIN, CLIENT_LIST } = process.env;

export const MIX_SERVER_PORT = 8081;

export const MIX_SERVER_ORIGIN =
  ORIGIN || `http://localhost:${MIX_SERVER_PORT}`;
export const MIX_CLIENT_ORIGINS = CLIENT_LIST?.split(",") || [
  "http://localhost:3000",
];

const API_KEYS = process.env.API_KEY_LIST?.split(",");
const CLIENT_AUTH_PAIRS: { [key: string]: unknown } = {};
if (API_KEYS?.length) {
  MIX_CLIENT_ORIGINS.forEach(
    (client, i) => (CLIENT_AUTH_PAIRS[client] = API_KEYS?.[i]),
  );
}
export { CLIENT_AUTH_PAIRS };

export const corsOptions = {
  origin: [MIX_SERVER_ORIGIN, ...MIX_CLIENT_ORIGINS],
  optionsSuccessStatus: 200,
};
