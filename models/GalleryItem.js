import mongoose from 'mongoose';

const GalleryItemSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: { type: String, default: 'General', trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.GalleryItem ||
    mongoose.model('GalleryItem', GalleryItemSchema);
