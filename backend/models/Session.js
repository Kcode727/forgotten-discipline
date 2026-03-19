import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: 'anonymous' },
  poseId: { type: String, required: true },
  durationSeconds: { type: Number, required: true },
  accuracyScore: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  mode: { type: String, enum: ['practitioner', 'fresher', 'healing'], default: 'fresher' }
});

export const Session = mongoose.model('Session', SessionSchema);
