export default function Guest({ children, title, description }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="mt-32 mb-24 max-w-xs sm:max-w-sm md:max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 w-full">
        <h5 className="text-3xl font-bold mb-4 pt-16 font-lexend">{title}</h5>
        <p className="font-lexend text-sm mb-6 text-black whitespace-nowrap">
          {description}
        </p>
        <div className="flex flex-col space-y-4 mb-6">{children}</div>
      </div>
    </div>
  );
}
