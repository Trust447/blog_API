import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/api", (req, res) =>{
    res.json({
        message: "api is running fine"
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log("server is running at localhost:", process.env.SERVER_PORT);
});