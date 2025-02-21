
export function Sidebar() {
  return (
    <div className="max-w-[30%] bg-[#f4eae7] p-4 border-r border-[#e8d5ce] flex flex-col gap-6">
      <div className="description_task">
        <h1 className="text-[#1c110d] text-3xl text-center font-bold mb-4">Description Task</h1>
        <p className="text-[#1c110d]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, suscipit cumque hic consequuntur earum
          iure quas blanditiis, eveniet odio cupiditate recusandae tempora? Aliquid unde voluptate, ducimus quo officia
          quis eius!
        </p>
      </div>
      <div>
        <h2 className="text-[#1c110d] text-lg font-bold mb-4">Tasks</h2>
        <ul className="space-y-3">
          <li className="p-3 bg-[#fcf9f8] rounded-lg text-[#1c110d] hover:bg-[#e8d5ce] cursor-pointer transition-all">Basic JavaScript</li>
          <li className="p-3 bg-[#fcf9f8] rounded-lg text-[#1c110d] hover:bg-[#e8d5ce] cursor-pointer transition-all">Functions</li>
          <li className="p-3 bg-[#fcf9f8] rounded-lg text-[#1c110d] hover:bg-[#e8d5ce] cursor-pointer transition-all">Arrays & Objects</li>
          <li className="p-3 bg-[#fcf9f8] rounded-lg text-[#1c110d] hover:bg-[#e8d5ce] cursor-pointer transition-all">DOM Manipulation</li>
        </ul>
      </div>
      <div>
        <h2 className="text-[#1c110d] text-lg font-bold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[#fcf9f8] rounded-full text-[#1c110d] text-sm hover:bg-[#e8d5ce] cursor-pointer transition-all">#javascript</span>
          <span className="px-3 py-1 bg-[#fcf9f8] rounded-full text-[#1c110d] text-sm hover:bg-[#e8d5ce] cursor-pointer transition-all">#functions</span>
          <span className="px-3 py-1 bg-[#fcf9f8] rounded-full text-[#1c110d] text-sm hover:bg-[#e8d5ce] cursor-pointer transition-all">#loops</span>
          <span className="px-3 py-1 bg-[#fcf9f8] rounded-full text-[#1c110d] text-sm hover:bg-[#e8d5ce] cursor-pointer transition-all">#arrays</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;