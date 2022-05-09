const { model, Schema } = require("mongoose");

module.exports = model(
  "Transaction",
  new Schema({
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    nature: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  })
);
