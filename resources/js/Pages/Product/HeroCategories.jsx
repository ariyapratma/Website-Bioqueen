import { Link, usePage } from "@inertiajs/react";

const HeroCategories = () => {
  const { props } = usePage();
  const dataHeroCategories = props.dataHeroCategories || [];

  return (
    <div className="container mx-auto mb-2 p-6 px-10 py-14">
      <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
        Created with Love and Passion for Cleanliness
      </h1>
      <p className="mb-4 font-lexend font-medium text-gray-600">
        Created with Love and Passion for Cleanliness
      </p>
      {/* Grid adjustments for different screen sizes */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.isArray(dataHeroCategories) && dataHeroCategories.length > 0 ? (
          dataHeroCategories.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.id}>
              <div className="flex h-full flex-col justify-between rounded-lg bg-white shadow-md hover:bg-gray-100">
                {/* Gambar full width dengan object-cover */}
                <div className="flex-shrink-0">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="h-34 object-full w-full rounded-t-lg" // Ganti object-full dengan object-cover untuk menjaga rasio gambar
                  />
                </div>
                <div className="flex h-28 flex-col items-center justify-center p-4">
                  <h2 className="text-center text-lg font-semibold">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    {category.description_categories}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No categories available</p>
        )}
      </div>
    </div>
  );
};

export default HeroCategories;
