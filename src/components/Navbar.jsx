import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div className="my-5 p-3 border border-gray-200 rounded-md flex justify-between items-center">
        <span className="leading-none">
          <h1 className="text-2xl font-semibold leading-none bg-gradient-to-br from-gray-300 via-black text-transparent bg-clip-text">
            PennWise
          </h1>
          <p className="text-xs">manage expense in clicks</p>
        </span>
        <span>
            <a href="https://github.com/radzhiv25/expense-tracker">
            <FaGithub className="size-8 hover:text-gray-500" />
            </a>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
