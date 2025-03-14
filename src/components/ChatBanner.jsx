// export default function ChatBanner() {
//     const currentDate = new Date().toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     return (
//       <div className="flex flex-col items-center p-4">
//         <div className="bg-gray-800 text-white text-sm font-semibold px-4 py-1 rounded-full mb-2">
//           {currentDate}
//         </div>
//         <div className="bg-gray-900 text-yellow-400 text-sm px-4 py-3 rounded-lg max-w-sm flex items-start">
//           <span className="mr-2">🔒</span>
//           <p className="text-yellow-400">
//             Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.{" "}
//             <span className="font-semibold text-yellow-500">Learn more</span>
//           </p>
//         </div>
//       </div>
//     );
//   }

  export default function ChatBanner() {
    const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    return (
      <div className="flex flex-col items-center p-4">
        <div className="bg-blue-100 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full mb-2">
          {currentDate}
        </div>
        <div className="bg-yellow-100 text-gray-500 text-sm px-4 py-3 rounded-lg max-w-sm flex items-start">
          <span className="mr-2">🔒</span>
          <p className="text-gray-500">
            Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.{" "}
            <span className="font-semibold text-gray-600">Learn more</span>
          </p>
        </div>
      </div>
    );
  }
  