// // components/debug-panel.tsx (optional for development)
// "use client";

// import { useState, useEffect } from "react";

// export default function DebugPanel() {
//   const [debugInfo, setDebugInfo] = useState<any>(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const fetchDebugInfo = async () => {
//     try {
//       const res = await fetch("/api/debug");
//       const data = await res.json();
//       setDebugInfo(data);
//     } catch (error) {
//       console.error("Debug fetch failed:", error);
//     }
//   };

//   if (process.env.NODE_ENV !== "development") return null;

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-red-500 text-white p-2 rounded-full text-sm"
//       >
//         Debug
//       </button>

//       {isOpen && (
//         <div className="absolute bottom-10 right-0 w-80 bg-black text-white p-4 rounded-lg text-xs">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-bold">System Debug</h3>
//             <button
//               onClick={fetchDebugInfo}
//               className="bg-blue-500 px-2 py-1 rounded"
//             >
//               Refresh
//             </button>
//           </div>
//           <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// app/debug/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function DebugPage() {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [orderTest, setOrderTest] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testSystem = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/debug");
      const data = await res.json();
      setSystemStatus(data);
    } catch (error) {
      console.error("System test failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const testOrderEndpoint = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order?test=db");
      const data = await res.json();
      setOrderTest(data);
    } catch (error) {
      console.error("Order endpoint test failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testSystem();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-30">
      <h1 className="text-2xl font-bold mb-6">System Debug</h1>

      <div className="space-y-4 mb-6">
        <button
          onClick={testSystem}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Test System
        </button>

        <button
          onClick={testOrderEndpoint}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 ml-4"
        >
          Test Order DB
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">System Status</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(systemStatus, null, 2)}
          </pre>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Order Endpoint Test</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(orderTest, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
