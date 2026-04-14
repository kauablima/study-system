import 'dotenv/config';
import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";

const PORT = process.env.PORT || 3004;
const app: Application = express();


app.use(cors())
app.get('/', (req: Request, res: Response) => {
    return res.send('Hello world!')
});

app.get('/health', (req: Request, res: Response) => {
    return res.status(200).json({status: 'OK', message: 'serves is runnig perfectly'})
});


app.listen(PORT, "0.0.0.0" , () => {
    console.log(`Server in running at http://localhost:${PORT}`);
});