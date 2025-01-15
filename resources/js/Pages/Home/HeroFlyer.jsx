import { usePage } from "@inertiajs/react";

const HeroFlyer = () => {
  const { props } = usePage();
  const { dataHeroFlyer } = props;

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {dataHeroFlyer && dataHeroFlyer.length > 0 ? (
          dataHeroFlyer.map((flyer, index) => (
            <div
              key={index}
              className="w-full overflow-hidden bg-white shadow-lg sm:w-[500px] md:w-[600px] lg:w-[800px]"
            >
              <img
                src={flyer.image_url}
                loading="lazy"
                alt={`Flyer ${index + 1}`}
                className="h-auto w-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-center font-lexend font-medium text-red-500">
            No flyer available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroFlyer;
