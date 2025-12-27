export default function SearchBar() {
    return (
        <div className="w-full">
            <input 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                          transition-all duration-200 text-gray-700 placeholder-gray-400" 
                placeholder="Search for a stock"
            />
        </div>
    );
}