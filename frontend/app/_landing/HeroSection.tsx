import GridBackground from "@/components/ui/GridBackground";

export default function HeroSection() {
    return (
        <div className="relative min-h-[80vh]">
            <GridBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800">Twitter for Stocks</h1>
                <div className="border-2 border-black rounded-lg w-full max-w-3xl aspect-video mt-8">

                </div>
            </div>
        </div>
    );
}