import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
    companyName: { type: String, default: 'Luminous Holiday Lighting' },
    tagline: { type: String, default: '' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    contact: {
        phone: { type: String, default: '' },
        email: { type: String, default: '' },
        address: { type: String, default: '' },
        hours: { type: String, default: '' },
        support: { type: String, default: '' },
    },
    socialMedia: [
        {
            key: String,
            icon: String,
            label: String,
            href: String,
        },
    ],
    footer: {
        year: { type: Number, default: 2026 },
        certifications: { type: String, default: '' },
        location: {
            address: String,
            cityState: String,
            description: String,
            mapUrl: String,
        },
    },
    seo: {
        siteTitle: { type: String, default: 'Christmas Lighting Services' },
        metaTitle: { type: String, default: '' },
        metaDescription: { type: String, default: '' },
        keywords: { type: String, default: '' },
    },
}, { timestamps: true });

export default mongoose.models.SiteSettings ||
    mongoose.model('SiteSettings', SiteSettingsSchema);
