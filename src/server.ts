import dotenv from 'dotenv';
import app from './app';
import { Console } from 'console';

dotenv.config();
const PORT: number = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is runnig in http://localhost:${PORT}`));
