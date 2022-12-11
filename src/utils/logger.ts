import bunyan from "bunyan";

export const log = bunyan.createLogger({
  name: "lms",
  serializers: {
    err: bunyan.stdSerializers.err,
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
  },
});
