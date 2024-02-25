import mongoose, { Schema, model, models } from "mongoose";
const vehicleSchema = new Schema(
  {
    vehicleId: { type: Number, unique: true },
    vehicleName: { type: String, required: true },
    plateNumber: { type: String, required: true },
    color: { type: String },
    status: { type: String, required: true },
    requestId: { type: String },
  },
  {
    timestamps: true,
  }
);
vehicleSchema.pre("save", async function (next) {
  const vehicle = this;
  if (!vehicle.isNew) {
    return next();
  }
  try {
    const highestRequest = await mongoose
      .model("Vehicle", vehicleSchema)
      .findOne({}, {}, { sort: { vehicleId: -1 } });

    vehicle.vehicleId =
      (highestRequest && highestRequest.vehicleId
        ? highestRequest.vehicleId
        : 0) + 1;

    next();
  } catch (error: any) {
    return next(error);
  }
});
vehicleSchema.set("toJSON", {
  getters: true,
  virtuals: false,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});
const Vehicle = models.Vehicle || model("Vehicle", vehicleSchema);
export default Vehicle;
