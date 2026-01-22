import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-stone-50 py-12 px-12 w-full flex items-start justify-between">
            <div>
                <span className="text-stone-800 text-xl font-semibold tracking-tight">StockHood</span>
            </div>
            <div>
                <ul className="flex gap-6 text-sm text-stone-600">
                    <li>
                        <Link href="/" className="hover:text-stone-800 transition-colors">Trending</Link>
                    </li>
                    <li>
                        <Link href="/" className="hover:text-stone-800 transition-colors">Earnings</Link>
                    </li>
                </ul>
            </div>
        </footer>   
    );
}