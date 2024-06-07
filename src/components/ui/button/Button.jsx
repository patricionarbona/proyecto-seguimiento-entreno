export default function Button({ text, variant = "blue", onClick, type }) {
    return (
        variant === "blue" ? 
            <button 
                type={type}
                className="border-2 border-blue-400 bg-blue-400 py-1 rounded text-gray-50 hover:bg-blue-300 px-1 text-base"
                onClick={onClick}
            >
                {text}
            </button>
            :
            <button 
                type={type}
                className="border-2 border-blue-400 py-1 rounded hover:bg-gray-100 px-1 text-base"
                onClick={onClick}
            >
                {text}
            </button>
    );
}
