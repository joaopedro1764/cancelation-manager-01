interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex justify-between items-center border-b border-gray-200 bg-white py-3 px-5 shadow-sm">
      <h1 className="text-2xl font-bold text-blue-400 ml-16">{title}</h1>
      <div className="flex gap-3 items-center">
        <img
          className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          src="https://avatars.githubusercontent.com/u/112516752?v=4"
          alt="Avatar"
        />
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-gray-800">João Pedro</span>
          <span className="text-gray-500">Desenvolvedor</span>
        </div>
      </div>
    </header>
  );
}
