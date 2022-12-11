import myApp from "./app";
import { log } from "./utils/logger";

const server = myApp();

const APP_PORT = Number(process.env.APP_ENV) || 8000;
const TEST_PORT = Number(process.env.TEST_PORT) || 3300;

const PORT = process.env.NODE_ENV === "test" ? TEST_PORT : APP_PORT;
server.listen(PORT, () => {
  log.info({
    name: "server-start-info",
    message: `Server connected at http://localhost:${PORT}`,
  });
});
