export default function Message({ type, children }) {
    const colorClasses = {
      success: "text-green-700 bg-green-50 border-green-400",
      warning: "text-yellow-800 bg-yellow-50 border-yellow-400",
      error: "text-red-700 bg-red-50 border-red-400",
      info: "text-blue-700 bg-blue-50 border-blue-400"
    };
  
    return (
      <div className={`border px-4 py-2 rounded mt-2 ${colorClasses[type] || ""}`}>
        {children}
      </div>
    );
  }
  