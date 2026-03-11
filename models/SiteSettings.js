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
    navigation: {
        items: [
            {
                label: String,
                href: String,
                exact: { type: Boolean, default: false },
                dropdown: [
                    {
                        label: String,
                        href: String,
                        description: String,
                        icon: String,
                    },
                ],
            },
        ],
    },
    footer: {
        year: { type: Number, default: 2026 },
        certifications: { type: String, default: '' },
        text: { type: String, default: '' },
        copyright: { type: String, default: '' },
        location: {
            address: String,
            cityState: String,
            description: String,
            mapUrl: String,
        },
        links: [
            {
                title: String,
                items: [
                    {
                        label: String,
                        href: String,
                    },
                ],
            },
        ],
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
