import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { config } from "dotenv";
config();

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",

      allow: ["GOOGLE_CRAWLER", "GOOGLE_CRAWLER_NEWS", "BING_CRAWLER", "CURL", "POSTMAN"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 1,
      interval: 30,
      capacity: 10,
    }),
  ],
});

export default aj;
