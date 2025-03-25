const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: { type: String, default: "" }, // Nội dung bài đăng (nếu có)
    image: { type: String, default: "" }, // Link ảnh bài đăng (nếu có)
    status: {
      type: String,
      enum: ["true", "false", "pending"],
      default: "pending", // Mới đăng thì chờ duyệt
    },
    userCreate: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
