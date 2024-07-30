import { allowedOrigins } from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // credentials: true,
  optionsSuccessStatus: 200,
};

const cookieOptions = {
  httpOnly: true,
  sameSite: "None",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
  httpOnly: true,
  sameSite: "None",
  secure: true,
};

export { corsOptions, cookieOptions, clearCookieOptions };
