import { X } from 'lucide-react';

const PlayerModal = ({ player, isOpen, onClose }) => {
  if (!isOpen || !player) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Detalhes do Jogador</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src={player.photoUrl} 
                alt={player.name}
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#E5050F] mb-4">{player.name}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento
                  </label>
                  <p className="text-gray-900">{formatDate(player.birthDate)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Posição
                  </label>
                  <p className="text-gray-900">{player.position || 'Não informado'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admissão no Alojamento
                  </label>
                  <p className="text-gray-900">{formatDate(player.admissionDate)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Escola
                  </label>
                  <p className="text-gray-900">{player.school || 'Não informado'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ano
                  </label>
                  <p className="text-gray-900">{player.year || 'Não informado'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Naturalidade
                  </label>
                  <p className="text-gray-900">{player.birthplace || 'Não informado'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <p className="text-gray-900">{player.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#E5050F] text-white rounded-lg hover:bg-[#C20C18] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;

