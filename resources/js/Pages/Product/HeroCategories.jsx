import { usePage, Link, router } from "@inertiajs/react";

const HeroCategories = () => {
  const { props } = usePage();
  const dataHeroCategories = props.dataHeroCategories || [];
  const handleCategoryClick = (category) => {
    router.get(`/product/${category.slug}`);
  };

  return (
    <div className="container mx-auto mb-24 p-6 px-10 py-14">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <ul className="flex space-x-2 font-lexend font-medium">
          <li>
            <Link href="/" className="text-gray-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="font-bold text-black">Product Category</span>
          </li>
        </ul>
      </nav>

      <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
        Created with Love and Passion for Cleanliness
      </h1>
      <p className="mb-4 font-lexend font-medium text-gray-600">
        Choose a category to see products
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.isArray(dataHeroCategories) && dataHeroCategories.length > 0 ? (
          dataHeroCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="flex h-full cursor-pointer flex-col justify-between rounded-lg bg-white shadow-md hover:bg-gray-100"
            >
              <div className="flex-shrink-0">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="h-34 w-full rounded-t-lg object-cover"
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
          ))
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default HeroCategories;
