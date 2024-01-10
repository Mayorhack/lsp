import mongoose, { Schema, model, models } from "mongoose";

const requestSchema = new Schema(
  {
    requestId: { type: Number, unique: true },
    vehicleType: { type: String, required: true },
    destination: { type: String, required: true },
    purpose: { type: String, required: true },
    officersCount: { type: String, required: true },
    tripDuration: Date,
    initiatedBy: { type: String, required: true },
    approvedBy: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
  },
  {
    timestamps: true,
  }
);
requestSchema.pre("save", async function (next) {
  const request = this;

  // Only increment the userId if it's a new document
  if (!request.isNew) {
    return next();
  }

  try {
    const highestRequest = await mongoose
      .model("VehicleRequest", requestSchema)
      .findOne({}, {}, { sort: { requestId: -1 } });

    request.requestId =
      (highestRequest && highestRequest.requestId
        ? highestRequest.requestId
        : 0) + 1;

    next();
  } catch (error: any) {
    return next(error);
  }
});
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
