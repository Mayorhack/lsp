import mongoose, { Schema, model, models } from "mongoose";

const requestSchema = new Schema(
  {
    requestId: { type: Number, unique: true },
    destination: { type: String, required: true },
    purpose: { type: String, required: true },
    officersCount: { type: String, required: true },
    tripDuration: Date,
    emailAddress: { type: String, required: true },
    initiatedBy: { type: String, required: true },
    approvedBy: { type: String },
    status: { type: String, default: "Pending" },
    driver: { type: String },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  },
  {
    timestamps: true,
  }
);

requestSchema.set("toJSON", {
  getters: true,
  virtuals: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});
const VehicleRequest =
  models.VehicleRequest || model("VehicleRequest", requestSchema);
export default VehicleRequest;
