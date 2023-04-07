import rateLimit from "express-rate-limit";

const getIP = (req) => {
  return (
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress
  );
};

const applyMiddleware = (middleware) => (req, res) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });
};

// returns array so we could easily add more (eg express-slow-down) later
const getRateLimitMiddlewares = (
  limit = 10,
  windowMs = 60 * 1000,
  delayAfter = 5,
  delayMs = 500
) => [rateLimit({ keyGenerator: getIP, windowMs, max: limit })];

export const applyRateLimiting = async (req, res) => {
  const middlewares = getRateLimitMiddlewares();
  return await Promise.all(
    middlewares.map(applyMiddleware).map((middleware) => middleware(req, res))
  );
};
