import bunyan from "bunyan";
import bformat from "bunyan-format";

const formatOut = bformat({ outputMode: "short" });

export const logger = bunyan.createLogger({
  name: "LMS",
  serializers: {
    err: bunyan.stdSerializers.err,
    res: bunyan.stdSerializers.res,
    req: bunyan.stdSerializers.req,
  },
  stream: formatOut,
  level: "info",
});

//prevents logs while testing
if (process.env.NODE_ENV === "test") {
  logger.level(bunyan.FATAL + 1);
}
