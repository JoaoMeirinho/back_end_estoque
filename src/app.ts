import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import userRoutes from "./routers/userRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json())

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.send('Hello World');
// })


app.use(userRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;