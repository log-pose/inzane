import logger from "conf/logger";
import app from "conf/server";
import { mysqlClient, redisClient, influxClient } from "conf/db";

redisClient.connect().then(() => {
  logger.info("Redis client connected");
});

if (influxClient) {
  logger.info("Influx client connected");
}
mysqlClient.connect((err) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info("MySQL client connected");
});

const PORT = process.env.INZANE_PORT || 7450;

app.listen(PORT, () => {
  logger.info(`Nakama server listening on port ${PORT}`);
});
