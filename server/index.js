import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const port = process.env.PORT || 5001;

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/ai", aiRoutes);

app.get("/", async (req, res) => {
  res.send("hello Img-AI");
});

const serverRun = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`server has running ${port}`));
  } catch (error) {
    console.log(error);
  }
};

serverRun();
