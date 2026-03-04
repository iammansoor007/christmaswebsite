import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/UserModel';
import Service from '@/models/Service';
import HomepageContent from '@/models/HomepageContent';
import Testimonial from '@/models/Testimonial';
import GalleryItem from '@/models/GalleryItem';
import SiteSettings from '@/models/SiteSettings';
import path from 'path';
import { readFile } from 'fs/promises';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    // Simple guard: only allow in non-production or with a secret header
    const authHeader = request.headers.get('x-seed-secret');
    if (process.env.NODE_ENV === 'production' && authHeader !== process.env.JWT_SECRET) {
        return NextResponse.json({ error: 'Forbidden in production' }, { status: 403 });
    }

    try {
        await connectDB();

        // Load data.json
        const dataPath = path.join(process.cwd(), 'public', 'data.json');
        const raw = await readFile(dataPath, 'utf-8');
        const data = JSON.parse(raw);

        const results = {};

        // 1. Create/Update default admin user
        const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@admin.com';
        const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await User.findOneAndUpdate(
            { email: adminEmail },
            {
                name: 'Admin',
                password: hashedPassword,
                role: 'admin'
            },
            { upsert: true, new: true }
        );
        results.user = 'Updated/Created';

        // 2. Seed services
        await Service.deleteMany({});
        const servicesData = (data.services?.items || []).map((s, i) => ({
            title: s.title,
            slug: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            description: s.description,
            icon: s.icon || 'FaStar',
            image: s.image || '',
            color: s.color || '#E63946',
            number: s.number || String(i + 1).padStart(2, '0'),
            features: s.features || [],
            stat: s.stat || '',
            status: 'active',
            order: i,
        }));

        for (const s of servicesData) {
            await new Service(s).save();
        }
        results.services = servicesData.length;

        // 3. Seed homepage content
        await HomepageContent.deleteMany({});
        await HomepageContent.create({
            hero: data.hero,
            about: data.about,
            aboutPage: {
                badge: data.about?.badge,
                title: data.about?.title,
                subtitle: data.about?.subtitle,
                founder: {
                    name: 'Ethen',
                    role: 'Owner, Christmas Lights Over Columbus',
                    quote: "Hi, I'm Ethen, owner of Christmas Lights Over Columbus. We help families across Central Ohio create beautiful, welcoming holiday displays without the stress of ladders or tangled lights.",
                    expertise: 'Serving Central Ohio families',
                    philosophy: 'Making holiday memories stress-free',
                    tagline: 'Installing Christmas lights. Serving your family.',
                },
                cta: data.about?.cta,
            },
            contactPage: {
                title: data.quoteForm?.title || 'Get Your Custom Quote',
                subtitle: data.quoteForm?.subtitle || 'Complete this form for a personalized quote.',
                badge: data.quoteForm?.badge || 'INSTANT QUOTE',
            },
            services: {
                badge: data.services?.badge,
                title: data.services?.title,
                subtitle: data.services?.subtitle,
            },
            howWeWork: data.howWeWork,
            cta: data.cta,
            contact: data.contact,
            faq: data.faq?.items || [],
            modernServices: data.modernServices?.items || [],
        });
        results.homepage = 'Seeded';

        // 4. Seed testimonials
        await Testimonial.deleteMany({});
        const testimonials = (data.testimonials?.items || []).map((t, i) => ({
            quote: t.quote,
            author: t.author,
            role: t.role || '',
            company: t.company || '',
            rating: t.rating || 5,
            image: t.image || '',
            location: t.location || '',
            service: t.service || '',
            status: 'active',
            order: i,
        }));
        await Testimonial.insertMany(testimonials);
        results.testimonials = testimonials.length;

        // 5. Seed gallery items
        await GalleryItem.deleteMany({});
        const galleryImages = data.workShowcase?.images || [];
        const galleryItems = galleryImages.map((img, i) => ({
            title: `Gallery Image ${i + 1}`,
            image: img,
            category: 'Featured',
            status: 'active',
            order: i,
        }));
        await GalleryItem.insertMany(galleryItems);
        results.gallery = galleryItems.length;

        // 6. Seed site settings
        await SiteSettings.deleteMany({});
        await SiteSettings.create({
            companyName: data.footer?.companyName || 'Luminous Holiday Lighting',
            tagline: data.footer?.tagline || '',
            logo: '/images/mainlogo.png', // Default
            favicon: '/favicon.ico', // Default
            contact: data.footer?.contact || data.contact || {},
            socialMedia: data.footer?.socialMedia || [],
            footer: {
                year: data.footer?.year || 2026,
                certifications: data.footer?.certifications || '',
                location: data.footer?.location || {},
            },
            seo: {
                siteTitle: 'Christmas Lights Over Columbus',
                metaTitle: 'Professional Christmas Lighting Installation in Columbus, OH',
                metaDescription: 'Expert holiday lighting services for residents and businesses across Central Ohio.',
                keywords: 'christmas lights, holiday lighting, columbus ohio, installation',
            }
        });
        results.settings = 'Seeded';

        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error('DEBUG SEED ERROR:', error);
        return NextResponse.json({
            error: error.message || 'Seed failed',
            stack: error.stack,
            debug: 'V2'
        }, { status: 500 });
    }
}
