import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    icon: { type: String, default: 'FaStar' },
    image: { type: String, default: '' },
    color: { type: String, default: '#E63946' },
    number: { type: String, default: '01' },
    features: [{ type: String }],
    stat: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Auto-generate slug from title
// Slug generation handled in seed/admin routes

export default mongoose.models.ServiceModel || mongoose.model('ServiceModel', ServiceSchema);

