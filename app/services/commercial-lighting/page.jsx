import ServiceDetailPage, { generateMetadata as generateServiceMetadata } from '../[slug]/page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return generateServiceMetadata({ params: { slug: 'commercial-lighting' } });
}

export default async function CommercialLightingPage() {
  return ServiceDetailPage({ params: { slug: 'commercial-lighting' } });
}
