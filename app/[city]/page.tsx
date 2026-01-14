import { CITIES, SEO_KEYWORDS, GYM_PRODUCTS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CityContent from './CityContent';

const BASE_URL = 'https://gymtexflooring.com';

// Enhanced SEO keywords for local search
const getLocalKeywords = (city: string) => [
    // Primary keywords with city
    `gym flooring ${city}`,
    `rubber gym flooring ${city}`,
    `gym mats ${city}`,
    `gym tiles ${city}`,
    `gym rubber mats ${city}`,
    `fitness flooring ${city}`,
    `sports flooring ${city}`,
    // Commercial intent keywords
    `gym flooring price ${city}`,
    `gym flooring supplier ${city}`,
    `gym flooring dealer ${city}`,
    `buy gym flooring ${city}`,
    `gym flooring installation ${city}`,
    // Product-specific with city
    `rubber rolls for gym ${city}`,
    `interlocking gym tiles ${city}`,
    `gym rubber tiles ${city}`,
    `commercial gym flooring ${city}`,
    `home gym flooring ${city}`,
    // Long-tail keywords
    `best gym flooring in ${city}`,
    `gym flooring manufacturer near ${city}`,
    `affordable gym flooring ${city}`,
    `premium gym mats ${city}`,
];

export async function generateStaticParams() {
    return CITIES.map((city) => ({
        city: city.toLowerCase().replace(/\s+/g, '-'),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city: routeCity } = await params;
    const city = CITIES.find(c => c.toLowerCase().replace(/\s+/g, '-') === routeCity.toLowerCase());

    if (!city) {
        return {
            title: 'City Not Found',
            description: 'The requested city page was not found.',
        };
    }

    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    const canonicalUrl = `${BASE_URL}/${citySlug}/`;
    const allKeywords = [...SEO_KEYWORDS, ...GYM_PRODUCTS, ...getLocalKeywords(city)];

    // Enhanced title and description for better CTR
    const title = `Gym Flooring in ${city} | #1 Rubber Gym Mats & Tiles Supplier`;
    const description = `Looking for premium gym flooring in ${city}? Gymtex offers high-quality rubber gym mats, tiles, and rolls at best prices. ✓ Free Installation Guide ✓ Pan-India Delivery ✓ 10+ Years Warranty. Call now for ${city} gym flooring!`;

    return {
        title,
        description,
        keywords: allKeywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `Best Gym Flooring in ${city} | Gymtex Rubber Mats & Tiles`,
            description: `Premium quality gym flooring solutions in ${city}. Rubber mats, tiles, rolls for commercial gyms & home fitness. Best prices + Free installation support.`,
            url: canonicalUrl,
            siteName: 'Gymtex Flooring',
            locale: 'en_IN',
            type: 'website',
            images: [
                {
                    url: `${BASE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `Gym Flooring in ${city} - Gymtex Premium Rubber Mats`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Gym Flooring in ${city} | Premium Rubber Mats & Tiles`,
            description: `Top quality gym flooring in ${city}. Rubber mats, tiles, rolls at best prices. Pan-India delivery available.`,
            images: [`${BASE_URL}/og-image.jpg`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        other: {
            'geo.region': 'IN',
            'geo.placename': city,
            'og:locale': 'en_IN',
        },
    };
}

// JSON-LD Structured Data Component
function StructuredData({ city }: { city: string }) {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${citySlug}/#business`,
        name: `Gymtex Flooring ${city}`,
        description: `Premium gym flooring supplier in ${city}. High-quality rubber gym mats, tiles, and rolls for commercial and home gyms.`,
        url: `${BASE_URL}/${citySlug}/`,
        telephone: '+91-XXXXXXXXXX',
        email: 'info@gymtexflooring.com',
        address: {
            '@type': 'PostalAddress',
            addressLocality: city,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            addressCountry: 'IN',
        },
        areaServed: {
            '@type': 'City',
            name: city,
        },
        priceRange: '₹₹',
        openingHours: 'Mo-Sa 09:00-18:00',
        sameAs: [
            'https://www.facebook.com/gymtexflooring',
            'https://www.instagram.com/gymtexflooring',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Gym Flooring Products',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Product',
                        name: 'Rubber Gym Rolls',
                        description: 'Premium rubber gym rolls in 4mm, 6mm, 8mm, 10mm thickness',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Product',
                        name: 'Interlocking Gym Tiles',
                        description: 'Easy-to-install interlocking rubber tiles for gyms',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Product',
                        name: 'Gym Rubber Mats',
                        description: 'High-density rubber mats for weight training areas',
                    },
                },
            ],
        },
    };

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `Gym Flooring in ${city}`,
        description: `Premium quality gym flooring solutions available in ${city}. Includes rubber mats, tiles, and rolls.`,
        brand: {
            '@type': 'Brand',
            name: 'Gymtex',
        },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            lowPrice: '50',
            highPrice: '500',
            offerCount: '20+',
            availability: 'https://schema.org/InStock',
            areaServed: {
                '@type': 'City',
                name: city,
            },
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '150',
        },
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Gym Flooring Installation in ${city}`,
        description: `Professional gym flooring supply and installation services in ${city}`,
        provider: {
            '@type': 'LocalBusiness',
            name: 'Gymtex Flooring',
        },
        areaServed: {
            '@type': 'City',
            name: city,
        },
        serviceType: 'Gym Flooring Installation',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: BASE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: `Gym Flooring in ${city}`,
                item: `${BASE_URL}/${citySlug}/`,
            },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `What is the price of gym flooring in ${city}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Gym flooring prices in ${city} range from ₹50 to ₹500 per sq ft depending on the type and thickness. Rubber rolls start from ₹50/sq ft, interlocking tiles from ₹80/sq ft, and premium options go up to ₹500/sq ft.`,
                },
            },
            {
                '@type': 'Question',
                name: `Do you provide gym flooring installation in ${city}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Yes, Gymtex provides complete gym flooring solutions in ${city} including supply, installation guidance, and after-sales support. We deliver across ${city} and nearby areas.`,
                },
            },
            {
                '@type': 'Question',
                name: `Which gym flooring is best for commercial gyms in ${city}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `For commercial gyms in ${city}, we recommend 8mm-10mm rubber rolls or interlocking rubber tiles. These provide excellent durability, shock absorption, and are easy to maintain.`,
                },
            },
            {
                '@type': 'Question',
                name: `How long does gym flooring last?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Quality rubber gym flooring from Gymtex typically lasts 10-15 years with proper maintenance. We offer a 10-year warranty on most of our products.`,
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city: routeCity } = await params;
    const city = CITIES.find(c => c.toLowerCase().replace(/\s+/g, '-') === routeCity.toLowerCase());

    if (!city) {
        notFound();
    }

    return (
        <>
            <StructuredData city={city} />
            <CityContent city={city} />
        </>
    );
}
