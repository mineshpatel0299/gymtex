import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const links = [
        { label: 'About', href: 'https://gymtexflooring.com/about' },
        { label: 'Products', href: 'https://gymtexflooring.com/products' },
        { label: 'Gallery', href: 'https://gymtexflooring.com/gallery' },
        { label: 'Contact Us', href: 'https://gymtexflooring.com/contact' },
        { label: 'Become Partner', href: 'https://gymtexflooring.com/become-partner' },
    ];

    const products = [
        'Rubber Gym Tile', 'Rubber Gym Roll', 'Rubber Tracks Indoor/Outdoor',
        'Eva Sports Mat', 'Sports Flooring', 'Vinyl Flooring Roll / Planks',
        'Artificial Grass', 'Multi Sports Turf', 'Hollow mat',
        'Cushion Mat', 'Turf Mat', 'Snake Mat',
        'Outdoor Playground / Courts', 'SBR / EPDM Granules'
    ];

    const legal = [
        { label: 'Privacy Policy', href: 'https://gymtexflooring.com/privacy-policy' },
        { label: 'Terms & Condition', href: 'https://gymtexflooring.com/terms-condition' },
    ];

    return (
        <footer className="bg-white text-gray-900 pt-16 pb-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-start">

                    {/* Company Links */}
                    <div className="space-y-4">
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-[#2b1674] transition-colors font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products Column */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                            {products.map((product) => (
                                <Link
                                    key={product}
                                    href="https://gymtexflooring.com/products"
                                    className="text-gray-600 hover:text-[#2b1674] transition-colors text-sm"
                                >
                                    {product}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Legal */}
                    <div className="space-y-8">
                        <div className="space-y-4 text-gray-600">
                            <p>
                                <a href="mailto:info@gymtexflooring.com" className="hover:text-[#2b1674] transition-colors flex items-center gap-2 font-medium">
                                    info@gymtexflooring.com
                                </a>
                            </p>
                            <p>
                                <a href="tel:+919540191234" className="hover:text-[#2b1674] transition-colors flex items-center gap-2 font-medium">
                                    +91 95401 91234
                                </a>
                            </p>
                        </div>

                        <ul className="space-y-2">
                            {legal.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 hover:text-[#2b1674] transition-colors text-sm"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 mt-12 text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} Gymtex Flooring. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
