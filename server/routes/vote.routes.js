import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { castVote, deleteVote } from '../controllers/vote.controller.js';

const voteRouter = express.Router();

voteRouter.post('/', isAuth, castVote);
voteRouter.delete('/:id', isAuth, deleteVote);

export default voteRouter;