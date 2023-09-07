import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 150, 
  message: {
    message: "Too many requests from this IP try again after a minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many accounts created from this IP. Try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts from this IP. Try again after a minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
