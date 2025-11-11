import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "DRY_RUN" }),
    // detectBot({
    //   mode: "LIVE",
    //   allow: ["CATEGORY:SEARCH_ENGINE"],
    // }),
    tokenBucket({
      mode: "DRY_RUN",
      refillRate: 1,
      interval: 30, 
      capacity: 10, 
    }),
  ],
});

export const isKeyWorking = ()=>{
  console.log(`The arcjet key is:  ${process.env.ARCJET_KEY}`);
  
}


//export default aj;
