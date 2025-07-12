const PlayerCard = ({ player, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onClick(player)}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={player.photoUrl} 
          alt={player.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{player.name}</h3>
        <p className="text-sm text-gray-600">{player.position}</p>
      </div>
    </div>
  );
};

export default PlayerCard;

