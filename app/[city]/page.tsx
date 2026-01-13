import type { Metadata } from 'next';

type Props = {
    params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    return {
        title: `Gymtex Flooring in ${cityName} | Premium Gym Flooring`,
        description: `Best gym flooring solutions in ${cityName}. Durable, aesthetic, and professional installation.`,
    };
}

export default async function CityPage({ params }: Props) {
    const { city } = await params;
    const decodeCity = decodeURIComponent(city);
    const cityName = decodeCity.charAt(0).toUpperCase() + decodeCity.slice(1);

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500 selection:text-white">
            {/* Navbar Placeholder */}
            <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold tracking-tighter">GYMTEX</span>
                    <a href="https://gymtexflooring.com" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Back to Main Site</a>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-black -z-10" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Available in {cityName}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                            Premium Gym Flooring <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                                delivered to {cityName}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Transform your fitness facility with high-performance, shock-absorbing, and aesthetic rubber flooring solutions. tailored for modern gyms.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
                                Get {cityName} Quote
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-full font-medium transition-all backdrop-blur-sm">
                                View Product Catalog
                            </button>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Heavy Impact Protection", desc: "Dense rubber composition prevents damage to subfloors from dropped weights." },
                                { title: "Sound & Vibration Dampening", desc: "Reduce noise levels in your gym, perfect for multi-story buildings." },
                                { title: "Seamless Installation", desc: `Our expert team provides professional installation service in ${cityName}.` }
                            ].map((f, i) => (
                                <div key={i} className="group p-8 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-neutral-900/60 transition-all duration-300">
                                    <div className="h-12 w-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <div className="h-6 w-6 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 border-t border-white/5 bg-neutral-950">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upgrade your space in {cityName}?</h2>
                        <p className="text-neutral-400 mb-8">Join hundreds of premium fitness centers who trust Gymtex.</p>
                        <a href="https://gymtexflooring.com/contact" className="inline-block px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25">
                            Contact Us Now
                        </a>
                    </div>
                </section>
            </main>

            <footer className="py-8 text-center text-neutral-600 text-sm border-t border-white/5">
                <p>&copy; {new Date().getFullYear()} Gymtex Flooring. All rights reserved.</p>
            </footer>
        </div>
    );
}
