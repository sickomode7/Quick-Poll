import Poll from "../models/poll.model.js";

export const createpoll = async (req, res) => {
  try {
    const { question, options, createdBy } = req.body;
    const poll = new Poll({ question, options, createdBy });
    await poll.save();
    console.log(poll);
    console.log("Poll created successfully");
    res.status(201).json({ poll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    console.log(polls);
    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByIdAndDelete(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    if (poll.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};