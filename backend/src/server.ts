import 'dotenv/config';
import express from "express";
import type { Application } from "express";
import cors from "cors";
import router from './router/main.js';

const PORT = process.env.PORT || 3004;
const app: Application = express();
app.use(express.json)
app.use(cors())

app.get('/user', router);

app.listen(PORT, () => {
    console.log(`Server in running at http://localhost:${PORT}`);
});