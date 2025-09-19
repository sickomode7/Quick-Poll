import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  option: { type: String, required: true },
});

export default mongoose.model("Vote", voteSchema);
