const QuickAccess = () => {
  const tags = ['Your learning plan', 'Array', 'String', 'Hash table', 'SQL'];

  return (
    <div className="flex flex-col gap-2 px-4">
      {tags.map((link, index) => (
        <a key={index} href="#" className="text-[#1c110d] mb-1 text-base font-normal leading-normal">
          {link}
        </a>
      ))}
    </div>
  );
};

export default QuickAccess;