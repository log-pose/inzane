import { influxClient } from "conf/db";

const INFLUXDB_ORG = process.env.INFLUXDB_ORG as string;
const INFLUXDB_BUCKET = process.env.INFLUXDB_BUCKET as string;
async function checkInfluxConnection() {
  try {
    const queryApi = influxClient.getQueryApi(INFLUXDB_ORG);
    const fluxQuery = `from(bucket: "${INFLUXDB_BUCKET}") |> range(start: -1h)`;
    await queryApi.collectRows(fluxQuery);
  } catch (error) {
    throw new Error("InfluxDB client failed to connect");
  }
}

export { checkInfluxConnection };
