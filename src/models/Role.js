import { Schema, model } from "mongoose";

// roles que utilizaremos
export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
