'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, MapPin, CheckCircle, Sparkles } from 'lucide-react';

interface CityContentProps {
    city: string;
}

export default function CityContent({ city }: CityContentProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: city,
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'b97076a5-bad8-4415-9a72-fc753d4c0088',
                    subject: `New Gym Flooring Inquiry from ${formData.name} - ${formData.city}`,
                    from_name: 'Gymtex Website',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.city,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', city: city, message: '' });
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    const heroRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollYProgress } = useScroll();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    // Ensure video plays
    const handleVideoLoad = () => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log('Video autoplay failed:', error);
            });
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 right-20 w-96 h-96 bg-[#2b1674]/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                />
            </div>

            {/* Navbar Removed (Using Global Navbar) */}

            <main>
                {/* Hero Section with Video Background */}
                <motion.section
                    ref={heroRef}
                    className="relative min-h-screen flex items-center justify-center overflow-hidden"
                >
                    {/* Clean Video Background */}
                    <div className="absolute inset-0 w-full h-full">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            onLoadedData={handleVideoLoad}
                            className="w-full h-full object-cover brightness-[0.6]"
                            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070"
                        >
                            <source src="/videos/gym-flooring.mp4" type="video/mp4" />
                        </video>

                        {/* Gradient Overlay for better text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-32 md:pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="block text-purple-300 font-bold uppercase tracking-[0.5em] text-xs md:text-base mb-6 mt-8 md:mt-0"
                            >
                                Premium Flooring Solutions
                            </motion.span>

                            <motion.h1
                                className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-white mb-8 leading-[1.1]"
                            >
                                Gymtex
                                <span className="block italic text-gray-300 font-light">
                                    Flooring
                                </span>
                            </motion.h1>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-px w-32 bg-purple-500 mx-auto mb-10"
                            />

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
                                    Transforming fitness spaces in <span className="text-purple-300 font-medium">{city}</span> with engineering precision and aesthetic excellence.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                            >
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-neutral-200 transition-all flex items-center gap-2"
                                >
                                    Get Free Quote
                                </motion.a>
                                <motion.a
                                    href="tel:+919540191234"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-transparent border border-white/30 backdrop-blur-sm text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all"
                                >
                                    Call +91 95401 91234
                                </motion.a>
                            </motion.div>

                            {/* Minimal Stats */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex justify-center gap-12 md:gap-24 border-t border-white/10 pt-10"
                            >
                                {[
                                    { value: '500+', label: 'Projects Completed' },
                                    { value: '15+', label: 'Years Experience' },
                                    { value: '100%', label: 'Satisfaction' }
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl md:text-3xl font-display text-white mb-1">{stat.value}</div>
                                        <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Gallery Section with Real Images */}
                <section id="gallery" className="py-24 px-6 bg-white relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#2b1674]/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2b1674]/5 rounded-full blur-3xl -z-10" />

                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block mb-4"
                            >
                                <span className="text-sm font-bold text-[#2b1674] uppercase tracking-wider bg-[#2b1674]/10 px-4 py-2 rounded-full">
                                    Our Work
                                </span>
                            </motion.div>
                            <h2 className="text-5xl font-bold text-gray-900 mb-4">
                                Premium Gym Flooring <span className="text-[#2b1674]">Projects</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Discover our high-quality rubber flooring installations across {city}&apos;s top fitness centers
                            </p>
                        </motion.div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299315/01_ymew4v.jpg',
                                    title: 'Commercial Gym Setup',
                                    location: `Commercial Zone, ${city}`
                                },
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299315/02_xbdoyr.jpg',
                                    title: 'Premium Rubber Flooring',
                                    location: `City Center, ${city}`
                                },
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299314/04_edkzwv.jpg',
                                    title: 'High-Impact Area',
                                    location: `Fitness District, ${city}`
                                },
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299314/03_fsxywe.jpg',
                                    title: 'CrossFit Zone',
                                    location: `Sports Complex, ${city}`
                                },
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299313/05_1_ucoony.jpg',
                                    title: 'Professional Gym',
                                    location: `Premium Club, ${city}`
                                },
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299311/09_ecjrct.jpg',
                                    title: 'Fitness Studio',
                                    location: `Wellness Center, ${city}`
                                },
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299311/08_1_uhuouo.jpg',
                                    title: 'Cardio Zone',
                                    location: `Gym Arena, ${city}`
                                },
                                {
                                    url: 'https://res.cloudinary.com/djicxkd9u/image/upload/v1768299312/07_goo1c1.jpg',
                                    title: 'Weight Training Area',
                                    location: `Athletic Zone, ${city}`
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                                    whileHover={{ y: -12 }}
                                    className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-[0_20px_60px_rgba(43,22,116,0.3)] transition-all duration-500 cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#2b1674]/20 to-[#2b1674]/5">
                                        <motion.img
                                            src={item.url}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.15, rotate: 2 }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                        />

                                        {/* Animated Gradient Overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-[#2b1674] via-transparent to-transparent"
                                            initial={{ opacity: 0.7 }}
                                            whileHover={{ opacity: 0.85 }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Glowing Border on Hover */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                boxShadow: 'inset 0 0 40px rgba(139, 92, 246, 0.5)'
                                            }}
                                        />
                                    </div>

                                    {/* Content Overlay with Enhanced Animation */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 p-6 text-white"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 + 0.3 }}
                                    >
                                        <motion.div
                                            initial={{ x: -10 }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-bold mb-3 drop-shadow-2xl group-hover:text-purple-200 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit group-hover:bg-white/20 transition-all duration-300">
                                                <MapPin size={16} className="text-purple-300" />
                                                {item.location}
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Stylish Number Badge */}
                                    <motion.div
                                        className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[#2b1674] to-[#4a2b9f] rounded-2xl flex items-center justify-center text-white font-bold shadow-2xl border-2 border-white/30 group-hover:scale-110 transition-transform duration-300"
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 + 0.5, type: "spring", stiffness: 200 }}
                                    >
                                        <span className="text-lg">{i + 1}</span>
                                    </motion.div>

                                    {/* Corner Accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2b1674]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#2b1674]/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="text-center mt-16 bg-gradient-to-r from-[#2b1674] to-[#4a2b9f] rounded-3xl p-12 text-white"
                        >
                            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Gym?</h3>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Get premium rubber flooring for your fitness center in {city} with expert installation
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-white text-[#2b1674] rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                                >
                                    Get Free Quote
                                </motion.a>
                                <motion.a
                                    href="tel:+91 95401 91234"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                                >
                                    <Phone size={20} className="inline mr-2" />
                                    Call +91 95401 91234
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section id="why-choose-us" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.05, 0.1, 0.05],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#2b1674] rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1.1, 1, 1.1],
                                opacity: [0.05, 0.08, 0.05],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#2b1674] rounded-full blur-3xl"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block mb-6"
                            >
                                <span className="text-sm font-bold text-[#2b1674] uppercase tracking-wider bg-[#2b1674]/10 px-6 py-3 rounded-full border-2 border-[#2b1674]/20">
                                    Why Choose Us
                                </span>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b1674] to-[#4a2b9f]">Gym Flooring Solutions</span> in {city}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Discover why {city}&apos;s top fitness centers trust Gymtex for their flooring needs
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: '💎', title: 'Exceptional Durability', desc: `Rubber flooring is known for its exceptional durability and longevity. It can withstand heavy foot traffic, dropped weights, and the constant movement of gym equipment without showing signs of wear and tear. Perfect for ${city}'s growing fitness industry.`, color: 'from-[#2b1674]/10 to-[#2b1674]/5' },
                                { icon: '🛡️', title: 'Superior Shock Absorption', desc: 'Rubber flooring offers excellent shock absorption properties, which is crucial in a gym setting. It helps to reduce the impact on joints, muscles, and bones, providing a safer and more comfortable workout experience.', color: 'from-[#3a1d84]/10 to-[#3a1d84]/5' },
                                { icon: '👟', title: 'Enhanced Slip Resistance', desc: `Gym floors can become slippery due to sweat or spilled water. Rubber flooring is naturally slip-resistant, providing a secure surface for gym-goers to move and exercise without the risk of accidents.`, color: 'from-[#4a2b9f]/10 to-[#4a2b9f]/5' },
                                { icon: '🔇', title: 'Advanced Noise Reduction', desc: 'The use of heavy equipment and weights in a gym can create loud noises. Rubber flooring has excellent sound-absorbing properties, significantly reducing noise levels and creating a quieter and more pleasant environment for everyone.', color: 'from-[#5a39af]/10 to-[#5a39af]/5' },
                                { icon: '✨', title: 'Effortless Maintenance', desc: 'Rubber flooring is relatively low-maintenance and easy to clean. It can be swept or vacuumed to remove dust and debris, and can also be mopped or wiped down with a mild detergent and water solution.', color: 'from-[#6a47bf]/10 to-[#6a47bf]/5' },
                                { icon: '🎨', title: 'Custom Design Options', desc: `We offer customization options to meet your specific needs in ${city}. Whether you need custom colors, patterns, or branding elements incorporated into your gym flooring, our team is equipped to bring your vision to life.`, color: 'from-[#7a55cf]/10 to-[#7a55cf]/5' },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                    className="group relative"
                                >
                                    <motion.div
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className={`relative h-full bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-3xl p-8 border-2 border-[#2b1674]/10 hover:border-[#2b1674]/30 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#2b1674]/20`}
                                    >
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#2b1674]/0 to-[#2b1674]/0 group-hover:from-[#2b1674]/5 group-hover:to-transparent transition-all duration-500" />

                                        {/* Animated Corner Accent */}
                                        <motion.div
                                            className="absolute top-0 right-0 w-32 h-32 bg-[#2b1674]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />

                                        <div className="relative z-10">
                                            {/* Icon Container with Enhanced Animation */}
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-20 h-20 bg-gradient-to-br from-[#2b1674] to-[#4a2b9f] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#2b1674]/30 group-hover:shadow-2xl group-hover:shadow-[#2b1674]/40 transition-all duration-300"
                                            >
                                                <span className="text-4xl">{feature.icon}</span>
                                            </motion.div>

                                            {/* Number Badge */}
                                            <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-[#2b1674]/20 group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-sm font-bold text-[#2b1674]">{i + 1}</span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#2b1674] transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                                                {feature.desc}
                                            </p>

                                            {/* Decorative Bottom Line */}
                                            <motion.div
                                                className="mt-6 h-1 bg-gradient-to-r from-[#2b1674] to-transparent rounded-full"
                                                initial={{ width: "0%" }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.08 + 0.3, duration: 0.8 }}
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-center mt-16"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#2b1674] to-[#4a2b9f] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#2b1674]/30 transition-all duration-300"
                            >
                                <Sparkles size={24} />
                                Experience the Gymtex Difference
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </motion.a>
                        </motion.div>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="py-24 px-6 bg-white relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 50,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute top-1/4 -right-32 w-64 h-64 border-2 border-[#2b1674]/20 rounded-full"
                        />
                        <motion.div
                            animate={{
                                rotate: [360, 0],
                            }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bottom-1/4 -left-32 w-64 h-64 border-2 border-[#2b1674]/20 rounded-full"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block mb-6"
                            >
                                <span className="text-sm font-bold text-[#2b1674] uppercase tracking-wider bg-[#2b1674]/10 px-6 py-3 rounded-full border-2 border-[#2b1674]/20">
                                    Our Products
                                </span>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b1674] to-[#4a2b9f]">Gym Flooring Supplier</span> in {city}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive flooring solutions for {city}&apos;s fitness centers
                            </p>
                        </motion.div>

                        {/* Wide Range Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group mb-16"
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-[#2b1674]/5 to-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-12 border-2 border-[#2b1674]/10 hover:border-[#2b1674]/30 overflow-hidden"
                            >
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#2b1674]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#2b1674] to-[#4a2b9f] rounded-2xl flex items-center justify-center shadow-xl">
                                            <CheckCircle size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">Wide Range of Options</h3>
                                    </div>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Gymtex Flooring offers a wide range of gym flooring options to cater to diverse needs across {city}. Whether you require rubber flooring, PVC flooring, foam flooring, or any other type of gym flooring, we have you covered.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Quality & Support Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {[
                                {
                                    icon: '🏆',
                                    title: 'Superior Quality and Durability',
                                    desc: 'At Gymtex Flooring, quality is our utmost priority. We use high-grade materials and employ advanced manufacturing techniques to ensure that our gym flooring is durable, long-lasting, and can withstand the rigors of intense workouts and heavy equipment.',
                                    gradient: 'from-[#2b1674]/10 via-[#3a1d84]/5 to-transparent'
                                },
                                {
                                    icon: '👥',
                                    title: 'Expert Guidance and Support',
                                    desc: `Choosing the right gym flooring can be a daunting task. However, with Gymtex Flooring, you don't have to navigate the process alone. Our team of experts in ${city} is dedicated to providing guidance and support throughout the flooring selection and installation process.`,
                                    gradient: 'from-[#4a2b9f]/10 via-[#5a39af]/5 to-transparent'
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="group relative"
                                >
                                    <motion.div
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className={`relative h-full bg-gradient-to-br ${item.gradient} rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-[#2b1674]/20 p-10 border-2 border-[#2b1674]/10 hover:border-[#2b1674]/30 transition-all duration-300 overflow-hidden`}
                                    >
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#2b1674]/0 to-[#2b1674]/0 group-hover:from-[#2b1674]/5 group-hover:to-transparent transition-all duration-500" />

                                        <div className="relative z-10">
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                                transition={{ duration: 0.6 }}
                                                className="w-20 h-20 bg-gradient-to-br from-[#2b1674] to-[#4a2b9f] rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#2b1674]/30 transition-all duration-300"
                                            >
                                                <span className="text-4xl">{item.icon}</span>
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#2b1674] transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                                                {item.desc}
                                            </p>

                                            {/* Progress Line */}
                                            <motion.div
                                                className="mt-6 h-1 bg-gradient-to-r from-[#2b1674] to-transparent rounded-full"
                                                initial={{ width: "0%" }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Delivery & Installation Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl shadow-2xl"
                        >
                            {/* Animated Background */}
                            <motion.div
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    backgroundSize: '200% 100%',
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-[#2b1674] via-[#4a2b9f] to-[#2b1674]"
                            />

                            <div className="relative z-10 p-12 text-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30"
                                    >
                                        <MapPin size={32} className="text-white" />
                                    </motion.div>
                                    <h3 className="text-3xl font-bold">Timely Delivery and Installation in {city}</h3>
                                </div>

                                <p className="text-lg text-white/90 leading-relaxed mb-8">
                                    Gymtex Flooring understands the importance of timely delivery and installation for {city} businesses. We strive to deliver our gym flooring products within the agreed-upon timeline, ensuring that your gym project stays on track.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 20, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-20 right-10 w-72 h-72 bg-[#2b1674]/5 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                y: [0, 40, 0],
                                x: [0, -20, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bottom-20 left-10 w-96 h-96 bg-[#2b1674]/5 rounded-full blur-3xl"
                        />
                    </div>

                    <div className="max-w-5xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block mb-6"
                            >
                                <span className="text-sm font-bold text-[#2b1674] uppercase tracking-wider bg-[#2b1674]/10 px-6 py-3 rounded-full border-2 border-[#2b1674]/20">
                                    Get In Touch
                                </span>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Looking for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b1674] to-[#4a2b9f]">Gym Flooring</span> in {city}?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Feel free to ask for details, don&apos;t save any questions!
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            {/* Card with Enhanced Design */}
                            <div className="relative bg-white rounded-3xl shadow-2xl p-10 md:p-12 border-2 border-[#2b1674]/10 overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#2b1674]/5 to-transparent rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#2b1674]/5 to-transparent rounded-full blur-3xl" />

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter Your Name', icon: '👤' },
                                            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter Your Email', icon: '✉️' }
                                        ].map((field, i) => (
                                            <motion.div
                                                key={field.id}
                                                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                                className="relative"
                                            >
                                                <label htmlFor={field.id} className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                    <span>{field.icon}</span>
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    id={field.id}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.id as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#2b1674] focus:ring-4 focus:ring-[#2b1674]/10 outline-none transition-all bg-gray-50 focus:bg-white hover:border-[#2b1674]/50"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter Your Phone', icon: '📱' },
                                            { id: 'city', label: 'City', type: 'text', placeholder: city, icon: '📍', readOnly: true }
                                        ].map((field, i) => (
                                            <motion.div
                                                key={field.id}
                                                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                                className="relative"
                                            >
                                                <label htmlFor={field.id} className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                    <span>{field.icon}</span>
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    id={field.id}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.id as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    readOnly={field.readOnly}
                                                    required
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#2b1674] focus:ring-4 focus:ring-[#2b1674]/10 outline-none transition-all bg-gray-50 focus:bg-white hover:border-[#2b1674]/50"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                            <span>💬</span>
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Tell us about your gym flooring requirements..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#2b1674] focus:ring-4 focus:ring-[#2b1674]/10 outline-none transition-all resize-none bg-gray-50 focus:bg-white hover:border-[#2b1674]/50"
                                        ></textarea>
                                    </motion.div>

                                    {/* Success Message */}
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 text-center font-medium"
                                        >
                                            Thank you! Your inquiry has been sent successfully. We&apos;ll get back to you soon.
                                        </motion.div>
                                    )}

                                    {/* Error Message */}
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-center font-medium"
                                        >
                                            {errorMessage || 'Something went wrong. Please try again.'}
                                        </motion.div>
                                    )}

                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: isSubmitting ? "none" : "0 20px 60px rgba(43, 22, 116, 0.3)" }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-gradient-to-r from-[#2b1674] to-[#4a2b9f] text-white rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Submit Inquiry
                                                <motion.span
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    →
                                                </motion.span>
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative py-24 px-6 overflow-hidden"
                >
                    {/* Animated Gradient Background */}
                    <motion.div
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: '200% 200%',
                        }}
                        className="absolute inset-0 bg-gradient-to-br from-[#2b1674] via-[#3a1d84] via-[#4a2b9f] to-[#2b1674]"
                    />

                    {/* Animated Overlays */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.4, 0.2],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.5, 0.3],
                                rotate: [360, 180, 0]
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
                        />
                    </div>

                    {/* Content */}
                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block mb-6"
                        >
                            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider">
                                ✨ Transform Your Space
                            </div>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
                        >
                            Ready to Transform Your{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10">{city} Gym?</span>
                                <motion.span
                                    className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 -z-10"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto"
                        >
                            When it comes to gym flooring in {city}, Gymtex Flooring is the trusted manufacturer that offers a wide range of high-quality, durable, and customizable solutions.
                        </motion.p>

                        {/* CTA Buttons with Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-12 py-5 bg-white text-[#2b1674] rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-3"
                                >
                                    Get Your Quote Now
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-2xl"
                                    >
                                        →
                                    </motion.span>
                                </motion.a>
                                <motion.a
                                    href="tel:18003070272"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all flex items-center gap-3"
                                >
                                    <Phone size={24} />
                                    Call Us Today
                                </motion.a>
                            </div>

                            {/* Trust Indicators */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap items-center justify-center gap-8 text-white/90"
                            >
                                {[
                                    { icon: '✓', text: '500+ Projects' },
                                    { icon: '✓', text: '15+ Years Experience' },
                                    { icon: '✓', text: '100% Quality Guaranteed' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
                                    >
                                        <span className="text-green-400 font-bold text-xl">{item.icon}</span>
                                        <span className="font-semibold">{item.text}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>


            </main>


        </div>
    );
}
