import ServiceDetailPage, { generateMetadata as generateServiceMetadata } from '../[slug]/page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return generateServiceMetadata({ params: { slug: 'permanent-lighting' } });
}

export default async function PermanentLightingPage() {
  return ServiceDetailPage({ params: { slug: 'permanent-lighting' } });
}
