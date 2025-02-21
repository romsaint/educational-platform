
export function CodeEditor() {
  return (
    <div className="bg-[#f4eae7] rounded p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#1c110d]">Your Code</h2>
        <button className="px-4 py-2 bg-[#f14b0e] text-white rounded-lg hover:bg-[#d43d0a] transition-all">
          Run Code
        </button>
      </div>
      <textarea
        className="w-full ring-0 h-64 p-4 bg-[#fcf9f8] rounded font-mono text-[#1c110d] resize-none focus:outline-none"
        style={{border: 0, borderBottom: '5px solid #d1400a'}}
        placeholder="Write your code here..."
      />
    </div>
  );
}