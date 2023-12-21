import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to={"/"}
      className="focus:ring-none focus-visible:ring-none outline-none w-full"
    >
      <div className="hover:opacity-75">
        <img src="/logo-01.png" alt="logo" className="h-[50px] w-auto" />
      </div>
    </Link>
  );
};
