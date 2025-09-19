import Vote from "../models/vote.model.js";
import Poll from "../models/poll.model.js";

export const castVote = async (req, res) => {
  try {
    const { pollId, option } = req.body;
    const userId = req.userId;
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const vote = new Vote({ poll: pollId, user: userId, option });
    await vote.save();
    poll.options.find((o) => o.option === option).votes += 1;
    await poll.save();
    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteVote = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findByIdAndDelete(id);
    if (!vote) {
      return res.status(404).json({ message: "Vote not found" });
    }
    const poll = await Poll.findById(vote.poll);
    if (poll) {
      const option = poll.options.find((o) => o.option === vote.option);
      if (option) {
        option.votes -= 1;
        await poll.save();
      }
    }
    res.status(200).json({ message: "Vote deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};