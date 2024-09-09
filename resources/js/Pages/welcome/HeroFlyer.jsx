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
      <div className="p-6 w-full flex justify-center items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          {data.map((data, index) => (
            <div
              key={index}
              className="w-full sm:w-[500px] md:w-[600px] lg:w-[800px] bg-white shadow-lg overflow-hidden"
            >
              <img
                src={data.imageUrl}
                loading="lazy"
                alt={`Flyer ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  