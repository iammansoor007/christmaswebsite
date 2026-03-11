import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export default mongoose.models.PageContent ||
  mongoose.model('PageContent', PageContentSchema);
