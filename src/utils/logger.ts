import bunyan from "bunyan";
import bformat from "bunyan-format";
const formatOut = bformat({ outputMode: "short" });
export const logger = bunyan.createLogger({
  name: "LMS",
  serializers: {
    req: require("bunyan-express-serializer"),
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  stream: formatOut,
  level: "info",
});
//prevents logs while testing
if (process.env.NODE_ENV === "test") {
  logger.level(bunyan.FATAL + 1);
}
