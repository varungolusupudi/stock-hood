export default function CTASection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-stone-800 tracking-tight">
                    Ready to join the conversation?
                </h2>
                <p className="mt-4 text-lg text-stone-500">
                    Connect with thousands of traders sharing insights, predictions, and market analysis.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-8 py-3 bg-stone-800 rounded-lg text-white font-medium hover:bg-stone-700 transition-colors duration-200">
                        Get Started — It&apos;s Free
                    </button>
                </div>
                <p className="mt-6 text-sm text-stone-400">
                    No credit card required
                </p>
            </div>
        </section>
    );
}

