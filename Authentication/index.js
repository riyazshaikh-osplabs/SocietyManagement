import app from "./setup/express.js";
import { sendError } from "./utils/api.js";
import { PORT } from "./setup/secrets.js";
import logger from "./setup/logger.js";
import protectedRoute from "./routes/protected/index.js";
import authRoute from "./routes/open/index.js";

app.use(sendError);
app.use('/auth', authRoute);
app.use('/protected/auth', protectedRoute);

app.listen(PORT, () => {
    logger.debug(`Authentication service started on port : ${PORT}`)
})