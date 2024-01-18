import logger from "conf/logger";
import app from "conf/server";
import { mysqlClient, redisClient } from "conf/db";
import { checkInfluxConnection } from "utils/db/influx";

redisClient.connect().then(() => {
  logger.info("Redis client connected");
});

checkInfluxConnection()
  .then(() => {
    logger.info("InfluxDB client connected");
  })
  .catch((err) => {
    logger.error(err);
  });

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
