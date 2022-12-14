import myApp from "./app";
import dotenv from "dotenv";
import { logger } from "./utils/logger";

const server = myApp();
dotenv.config();
const loggerForSearchbooks = logger.child({ reqId: "sjs" }, true);
const APP_PORT = Number(process.env.APP_ENV) || 8000;
const TEST_PORT = Number(process.env.TEST_PORT) || 3300;

const PORT = process.env.NODE_ENV === "test" ? TEST_PORT : APP_PORT;
server.listen(PORT, () => {
  loggerForSearchbooks.info(`Server connected at http://localhost:${PORT}`);
});
