import app from "./server/server";
import marketController from "./controllers/market.controller";

app.use("/market", marketController);

export default app;
