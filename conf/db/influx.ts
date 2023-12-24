import { InfluxDB } from "@influxdata/influxdb-client";

const INFLUXDB_URL = process.env.INFLUXDB_URL as string;
const INFLUXDB_TOKEN = process.env.INFLUXDB_TOKEN as string;

const influxClient = new InfluxDB({ url: INFLUXDB_URL, token: INFLUXDB_TOKEN });

export default influxClient;
