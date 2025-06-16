"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default("../main.db");
db.pragma("journal_mode = WAL");
let row;
let a = [];
router.get("/", (req, res) => {
    const q = db.prepare("select * from images");
    for (row of q.iterate()) {
        a.push(row.uri);
    }
    res.send(JSON.stringify(a));
    a = [];
});
exports.default = router;
