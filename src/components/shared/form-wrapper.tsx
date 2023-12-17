const FormWrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div className="w-full max-w-[450px] mx-auto py-10 rounded-md border border-slate-300/30 bg-black/30 shadow-md px-8 backdrop-blur-md flex flex-col">
      {children}
    </div>
  );
};

export default FormWrapper;
