import { usePage } from "@inertiajs/react";

const HeaderOrder = () => {
  const { props } = usePage();
  const { dataHeaderOrder } = props;

  return (
    <div className="relative h-[30rem] w-full overflow-hidden">
      {/* Conditional rendering for image */}
      {dataHeaderOrder?.image_url ? (
        <img
          src={dataHeaderOrder.image_url}
          loading="lazy"
          className="h-full w-full object-cover"
          alt="Header AboutUs"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200">
          <p className="font-lexend text-2xl font-medium text-red-500">
            No image available.
          </p>
        </div>
      )}

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-40 px-6 pt-6 sm:px-12 md:px-24 lg:px-36 xl:px-48">
        <h2 className="mb-4 pt-40 font-lexend text-5xl font-bold text-white">
          {dataHeaderOrder?.title || "No title available."}
        </h2>
        <p className="text-md max-w-md font-lexend font-bold text-white">
          {dataHeaderOrder?.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default HeaderOrder;
