export default function Button({ text, variant = "blue", onClick, type }) {
    let buttonClass = "border-2 py-1 rounded px-1 text-base ";

    switch (variant) {
        case "blue":
            buttonClass += "border-seagull-400 bg-seagull-400 text-gray-50 hover:bg-seagull-300";
            break;
        case "red":
            buttonClass += "border-bright-turquoise-400 bg-bright-turquoise-400 text-gray-50 hover:bg-bright-turquoise-300";
            break;
        case "green":
            buttonClass += "border-green-400 bg-green-400 text-gray-50 hover:bg-green-300";
            break;
        case "outline":
            buttonClass += "border-blue-400 hover:bg-gray-100";
            break;
        default:
            buttonClass += "border-gray-400 bg-gray-400 text-gray-50 hover:bg-gray-300";
    }

    return (
        <button 
            type={type}
            className={buttonClass}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
