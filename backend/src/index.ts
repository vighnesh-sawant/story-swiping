import express from "express";

import fetchStories from "./routes/fetchStories.js";

import postStories from "./routes/postStories.js"

const p: string = process.env.PORT || "8000";
const app = express();


const port: number = parseInt(p);
app.use(express.json());


app.use("/fetchStories", fetchStories);
app.use("/postStories",postStories)
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
 