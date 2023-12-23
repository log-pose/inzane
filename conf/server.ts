import express from "express";
import router from "conf/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/monitor", router);

export default app;
