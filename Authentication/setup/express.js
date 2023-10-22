import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import { requestLogger, sendError } from "../utils/api.js";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(sendError);
app.use(bodyParser.json());

export default app;
