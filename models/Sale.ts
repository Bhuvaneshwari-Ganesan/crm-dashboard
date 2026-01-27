import mongoose, { Schema, models } from "mongoose";

const SaleSchema = new Schema(
  {
    status: String,
    saleDate: String,
    amount: Number,
    stage: String,
    nextActivity: String,
    saleName: String,
  },
  { timestamps: true }
);

export default models.Sale || mongoose.model("Sale", SaleSchema);
