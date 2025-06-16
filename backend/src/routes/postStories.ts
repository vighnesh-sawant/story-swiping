import express from "express";
const router = express.Router();
import Database from 'better-sqlite3';
const db = new Database('../main.db');
db.pragma('journal_mode = WAL');
const q = db.prepare("insert into images values(?)")
router.post("/", (req, res) => {
  q.run(req.body.uri)
  res.send("test")
});
export default router;
