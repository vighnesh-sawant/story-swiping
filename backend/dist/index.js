"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchStories_js_1 = __importDefault(require("./routes/fetchStories.js"));
const postStories_js_1 = __importDefault(require("./routes/postStories.js"));
const p = process.env.PORT || "8000";
const app = (0, express_1.default)();
const port = parseInt(p);
app.use(express_1.default.json());
app.use("/fetchStories", fetchStories_js_1.default);
app.use("/postStories", postStories_js_1.default);
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
