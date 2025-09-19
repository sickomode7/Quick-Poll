import express from "express";
import { createpoll, getPolls, deletePoll } from "../controllers/poll.controller.js";

const pollRouter = express.Router();

pollRouter.post("/", createpoll);
pollRouter.get("/", getPolls);
pollRouter.delete("/:id", deletePoll);

export default pollRouter;
