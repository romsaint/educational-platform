const QuickAccess = () => {
  const links = ['Your learning plan', 'JavaScript', 'Python', 'React', 'TypeScript', 'SQL'];

  return (
    <div className="flex flex-col gap-2 px-4">
      {links.map((link, index) => (
        <a key={index} href="#" className="text-[#1c110d] text-base font-normal leading-normal">
          {link}
        </a>
      ))}
    </div>
  );
};

export default QuickAccess;