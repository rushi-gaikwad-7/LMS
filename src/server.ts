import myApp from "./app";
import dotenv from "dotenv";
import { logger } from "./utils/logger";

const server = myApp();
dotenv.config();
const loggerForSearchbooks = logger.child(true);
const APP_PORT = Number(process.env.APP_PORT);
const TEST_PORT = Number(process.env.TEST_PORT);

const PORT = process.env.NODE_ENV === "test" ? TEST_PORT : APP_PORT;
server.listen(PORT, (): void => {
  loggerForSearchbooks.info(`Server connected at http://localhost:${PORT}`);
});
