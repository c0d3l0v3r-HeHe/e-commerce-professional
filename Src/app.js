import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        // options for CORS
        origin: process.env.CORS_ORIGIN,
        credentials: true, // allow credentials
    })
);

app.use(
    express.json({
        // options for JSON body parsing
        limit: "16kb", // limit the size of JSON body
    })
); // parse JSON bodies
app.use(
    express.urlencoded({
        // options for URL-encoded body parsing
        extended: true, // allow rich objects and arrays to be encoded into the URL-encoded format
        limit: "16kb", // limit the size of URL-encoded body
    })
);
app.use(express.static("public")); // serve static files from the 'public' directory
app.use(cookieParser()); // parse cookies from the request headers

// routes import
import userRouter from "./Routes/user.routes.js";

// rooutes declaration
app.use("/api/v1/users", userRouter);

export default app;
