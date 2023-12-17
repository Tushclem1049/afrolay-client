import AuthWrapper from "./form-wrapper";

const SignInUI = () => {
  return (
    <AuthWrapper>
      <form>
        <p className="flex flex-col gap-[4px]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your email"
            className="w-full bg-transparent p-2 rounded-md outline-1"
          />
        </p>
        <p className="flex flex-col gap-[4px]">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Your password"
            className="w-full bg-transparent p-2 rounded-md outline-1"
          />
        </p>
      </form>
    </AuthWrapper>
  );
};

export default SignInUI;
