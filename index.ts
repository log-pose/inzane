import logger from "conf/logger";
import app from "conf/server";

const PORT = process.env.INZANE_PORT || 7450;

app.listen(PORT, () => {
  logger.info(`Nakama server listening on port ${PORT}`);
});
