const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    busId: {
      type: String,
    },
    location: {
      type: { type: String },
      coordinates: [],
    },
  },
  {
    timestamps: true,
  }
);

locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
