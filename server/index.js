import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import pollRouter from './routes/poll.routes.js';
import userRouter from './routes/user.routes.js';
import voteRouter from './routes/vote.routes.js';

dotenv.config({quiet: true});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Quick Polls server!');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/polls', pollRouter);
app.use('/api/votes', voteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});