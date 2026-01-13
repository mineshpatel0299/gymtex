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
        <footer className="bg-white text-gray-900 pt-12 md:pt-16 pb-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-10 md:mb-12">

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-5 border-b-2 border-[#2b1674] pb-2 inline-block">Company</h3>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-base text-gray-600 hover:text-[#2b1674] hover:pl-2 transition-all duration-200 font-medium flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#2b1674] transition-all duration-200"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products Column */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 mb-5 border-b-2 border-[#2b1674] pb-2 inline-block">Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {products.map((product) => (
                                <Link
                                    key={product}
                                    href="https://gymtexflooring.com/products"
                                    className="text-sm text-gray-600 hover:text-[#2b1674] transition-colors py-1.5 flex items-start gap-2 group"
                                >
                                    <span className="text-[#2b1674] opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                                    <span>{product}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Legal */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-5 border-b-2 border-[#2b1674] pb-2 inline-block">Contact</h3>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    <a href="mailto:info@gymtexflooring.com" className="hover:text-[#2b1674] transition-colors flex items-center gap-3 font-medium text-base group">
                                        <span className="text-[#2b1674] text-lg">📧</span>
                                        <span className="group-hover:underline">info@gymtexflooring.com</span>
                                    </a>
                                </p>
                                <p>
                                    <a href="tel:+919540191234" className="hover:text-[#2b1674] transition-colors flex items-center gap-3 font-medium text-base group">
                                        <span className="text-[#2b1674] text-lg">📱</span>
                                        <span className="group-hover:underline">+91 95401 91234</span>
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-5 border-b-2 border-[#2b1674] pb-2 inline-block">Legal</h3>
                            <ul className="space-y-3">
                                {legal.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-gray-600 hover:text-[#2b1674] transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-[#2b1674] transition-all duration-200"></span>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-10 text-center">
                    <p className="text-gray-500 text-sm">&copy; {currentYear} Gymtex Flooring. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
