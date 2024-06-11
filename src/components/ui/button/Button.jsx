export default function Button({ text, variant = "blue", onClick, type }) {
  let buttonClass = "border-2 py-1 rounded px-1 text-base ";

  switch (variant) {
    case "blue":
      buttonClass +=
        "border-picton-blue-400 bg-picton-blue-400 text-gray-50 hover:bg-picton-blue-300";
      break;
    case "red":
    case "delete":
      buttonClass +=
        "border-carnation-400 bg-carnation-400 text-gray-50 hover:bg-carnation-300";
      break;
    case "green":
      buttonClass +=
        "border-green-400 bg-green-400 text-gray-50 hover:bg-green-300";
      break;
      case "add":
        buttonClass +=
          "border-picton-blue-400 bg-picton-blue-400 text-gray-50 hover:bg-picton-blue-300";
        break;
    case "outline":
      buttonClass += "border-blue-400 hover:bg-gray-100";
      break;
    default:
      buttonClass +=
        "border-gray-400 bg-gray-400 text-gray-50 hover:bg-gray-300";
  }

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}
