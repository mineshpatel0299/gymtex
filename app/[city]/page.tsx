import { CITIES, SEO_KEYWORDS, GYM_PRODUCTS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import CityContent from './CityContent';

export async function generateStaticParams() {
    return CITIES.map((city) => ({
        city: city.toLowerCase(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
    const { city: routeCity } = await params;
    const city = CITIES.find(c => c.toLowerCase() === routeCity.toLowerCase());

    if (!city) {
        return {
            title: 'City Not Found | Gymtex Flooring',
        };
    }

    return {
        title: `Gym Flooring in ${city} | Premium Rubber Gym Mats & Rolls`,
        description: `Leading manufacturer of gym flooring in ${city}. We provide high-quality rubber gym mats, tiles, and rolls for commercial and home gyms in ${city}.`,
        keywords: [...SEO_KEYWORDS, ...GYM_PRODUCTS, `Gym flooring ${city}`, `Gym mats ${city}`, `Rubber flooring ${city}`],
    };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city: routeCity } = await params;
    const city = CITIES.find(c => c.toLowerCase() === routeCity.toLowerCase());

    if (!city) {
        notFound();
    }

    return <CityContent city={city} />;
}
