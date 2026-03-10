import mongoose from 'mongoose';

const RecentWorkItemSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  image: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.RecentWorkItem ||
  mongoose.model('RecentWorkItem', RecentWorkItemSchema);
