import { Logo } from "@/components";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col"
      style={{ backgroundImage: 'url("bg-02.jpg")' }}
    >
      <div className="fixed top-0 w-full py-4 px-4 sm:px-12">
        <Logo />
      </div>
      <Link to={"/sign-in"}>
        <div className="px-8 py-2 sm:py-4 font-medium rounded-full bg-transparent border-4 border-orange-400 sm:border-orange-500 backdrop-blur-xl shadow-2xl text-xl text-white">
          Get Started!
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
