import mongoose from "mongoose";

const EventTypeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  color: { type: String },
  popular: { type: Boolean, default: false }
});

const EventType = mongoose.model("EventType", EventTypeSchema);
export default EventType;
