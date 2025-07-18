const CategoryMenu = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['Sub20', 'Sub17', 'Sub16', 'Sub15', 'Sub14'];

  return (
    <div className="bg-gradient-to-r from-[#E5050F] to-[#C20C18] py-4 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white text-center mb-4 tracking-wide">
         Atletas Alojados
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                selectedCategory === category
                  ? 'bg-white text-[#E5050F] shadow-md ring-2 ring-white ring-opacity-50'
                  : 'bg-transparent text-white border border-white border-opacity-70 hover:bg-white hover:text-[#E5050F] hover:border-opacity-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;

