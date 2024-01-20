import { Schema, model, models } from "mongoose";
const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.set("toJSON", {
  getters: true,
  virtuals: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});
const User = models.User || model("User", userSchema);
export default User;
