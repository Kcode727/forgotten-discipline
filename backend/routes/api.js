import express from 'express';
import { Pose } from '../models/Pose.js';
import { Session } from '../models/Session.js';

const router = express.Router();

router.get('/poses', async (req, res) => {
  try {
    // In a real app we'd fetch from DB. 
    // For MVP we'll return static data if DB is empty.
    const poses = await Pose.find();
    if (poses.length === 0) {
      return res.json([
        {
          _id: '1',
          name: 'Warrior II',
          description: 'A standing pose that builds strength and focus',
          difficulty: 'beginner',
          idealAngles: {
            leftKnee: 90,
            rightKnee: 180,
            leftElbow: 180,
            rightElbow: 180,
          }
        },
        {
          _id: '2',
          name: 'Tree Pose',
          description: 'A balancing pose to improve focus',
          difficulty: 'beginner',
          idealAngles: {
            leftKnee: 45, // approx angle for lifted leg
            rightKnee: 180,
            leftElbow: 180,
            rightElbow: 180
          }
        }
      ]);
    }
    res.json(poses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
