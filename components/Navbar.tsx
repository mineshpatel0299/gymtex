'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: 'https://gymtexflooring.com/' },
        { label: 'About', href: 'https://gymtexflooring.com/about' },
        { label: 'Product', href: 'https://gymtexflooring.com/products' },
        { label: 'Gallery', href: 'https://gymtexflooring.com/gallery' }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
                <Link href="/" className="relative h-10 sm:h-12 w-40 sm:w-48 shrink-0 z-50">
                    <Image
                        src="https://res.cloudinary.com/djicxkd9u/image/upload/v1768300062/logo_xkjk9k.png"
                        alt="Gymtex Flooring"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
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

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    <Link
                        href="https://gymtexflooring.com/contact"
                        className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-neutral-800 transition-colors"
                    >
                        Get in touch
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden z-50 p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/20 z-30 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown Menu */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="absolute top-full left-0 right-0 bg-white shadow-xl z-40 md:hidden overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-lg font-semibold text-gray-900 hover:text-white hover:bg-[#2b1674] transition-all py-4 px-5 rounded-lg border-b border-gray-100 last:border-b-0"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="https://gymtexflooring.com/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block bg-black text-white px-5 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition-colors text-center mt-4 text-lg"
                                >
                                    Get in touch
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
