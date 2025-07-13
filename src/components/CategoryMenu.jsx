const CategoryMenu = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['Sub20', 'Sub17', 'Sub16', 'Sub15', 'Sub14'];

  return (
    <div className="bg-[#E5050F] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
         Atletas Alojados
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-white text-[#E5050F] shadow-lg'
                  : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#E5050F]'
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

