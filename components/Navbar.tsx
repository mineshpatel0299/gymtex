import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
    const navLinks = [
        { label: 'Home', href: 'https://gymtexflooring.com/' },
        { label: 'About', href: 'https://gymtexflooring.com/about' },
        { label: 'Product', href: 'https://gymtexflooring.com/products' },
        { label: 'Gallery', href: 'https://gymtexflooring.com/gallery' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm">
            <Link href="/" className="relative h-12 w-48 flex-shrink-0">
                <Image
                    src="https://res.cloudinary.com/djicxkd9u/image/upload/v1768300062/logo_xkjk9k.png"
                    alt="Gymtex Flooring"
                    fill
                    className="object-contain object-left"
                    priority
                />
            </Link>

            <div className="hidden md:flex items-center justify-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="text-base font-bold text-gray-700 hover:text-[#2b1674] transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <Link
                href="https://gymtexflooring.com/contact"
                className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
                Get in touch
            </Link>
        </nav>
    );
}
