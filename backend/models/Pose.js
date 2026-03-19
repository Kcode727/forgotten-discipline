import mongoose from 'mongoose';

const PoseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  idealAngles: {
    type: Map,
    of: Number, // angles for specific joints, e.g., 'leftElbow': 180
  },
  benefits: [String]
});

export const Pose = mongoose.model('Pose', PoseSchema);
