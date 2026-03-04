import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    quote: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    image: { type: String, default: '' },
    location: { type: String, default: '' },
    service: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Testimonial ||
    mongoose.model('Testimonial', TestimonialSchema);
