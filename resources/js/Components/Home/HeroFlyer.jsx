export default function HeroFlyer() {
  const data = [
    {
      imageUrl: "/Home/HeroFlyer/HeroFlyer.png",
    },
    {
      imageUrl: "/Home/HeroFlyer/HeroFlyer.png",
    },
  ];

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {data.map((data, index) => (
          <div
            key={index}
            className="w-full overflow-hidden bg-white shadow-lg sm:w-[500px] md:w-[600px] lg:w-[800px]"
          >
            <img
              src={data.imageUrl}
              loading="lazy"
              alt={`Flyer ${index + 1}`}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
