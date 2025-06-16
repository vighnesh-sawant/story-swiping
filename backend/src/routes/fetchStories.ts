import express from "express";
const router = express.Router();
import Database from "better-sqlite3";
const db = new Database("../main.db");
db.pragma("journal_mode = WAL");
let row: any;
let a: string[] = [];
router.get("/", (req, res) => {
  const q = db.prepare("select * from images");
  for (row of q.iterate()) {
    a.push(row.uri);
  }
  res.send(JSON.stringify(a));
  a = [];
});
export default router;
