import ServiceDetailPage, { generateMetadata as generateServiceMetadata } from '../[slug]/page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return generateServiceMetadata({ params: { slug: 'residential-lighting' } });
}

export default async function ResidentialLightingPage() {
  return ServiceDetailPage({ params: { slug: 'residential-lighting' } });
}
