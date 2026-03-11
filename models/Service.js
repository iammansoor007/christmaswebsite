import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String, default: '' },
    icon: { type: String, default: 'FaStar' },
    image: { type: String, default: '' },
    color: { type: String, default: '#E63946' },
    number: { type: String, default: '01' },
    features: [{ type: String }],
    stat: { type: String, default: '' },
    detail: {
        heroTitle: { type: String, default: '' },
        heroSubtitle: { type: String, default: '' },
        heroImage: { type: String, default: '' },
        sections: [{
            title: { type: String, default: '' },
            content: { type: String, default: '' },
        }],
        gallery: [{ type: String }],
        faqs: [{
            question: { type: String, default: '' },
            answer: { type: String, default: '' },
        }],
    },
    seo: {
        metaTitle: { type: String, default: '' },
        metaDescription: { type: String, default: '' },
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Auto-generate slug from title
// Slug generation handled in seed/admin routes

export default mongoose.models.ServiceModel || mongoose.model('ServiceModel', ServiceSchema);

