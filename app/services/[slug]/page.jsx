import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import ServiceDetailClient from './ServiceDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  await connectDB();
  const service = await Service.findOne({ slug: params.slug }).lean();
  if (!service) {
    return { title: 'Service Not Found' };
  }

  const title =
    service.seo?.metaTitle ||
    service.detail?.heroTitle ||
    service.title ||
    'Service';
  const description =
    service.seo?.metaDescription ||
    service.detail?.heroSubtitle ||
    service.description ||
    '';
  const image = service.detail?.heroImage || service.image || '';

  return {
    title,
    description,
    openGraph: image
      ? { title, description, images: [{ url: image }] }
      : { title, description },
  };
}

export default async function ServiceDetailPage({ params }) {
  await connectDB();
  const service = await Service.findOne({ slug: params.slug }).lean();
  if (!service) notFound();

  const safeService = JSON.parse(JSON.stringify(service));
  return <ServiceDetailClient service={safeService} />;
}
