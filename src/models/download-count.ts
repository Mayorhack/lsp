import { model, models, Schema } from "mongoose";

const countsSchema = new Schema({
  publicationCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  reportCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  otherCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const DownloadCounts =
  models.DownloadCounts || model("DownloadCounts", countsSchema);
export default DownloadCounts;
