export const port = process.env.PORT || 8000;
export const origin = process.env.ORIGIN || `http://localhost:${exports.port}`;
const localClient = "http://localhost:3000";

export const corsOptions = {
  origin: [origin, localClient],
  optionsSuccessStatus: 200,
};
