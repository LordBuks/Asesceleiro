import { X } from 'lucide-react';

const PlayerModal = ({ player, isOpen, onClose }) => {
  if (!isOpen || !player) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
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
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              {player.photoData?.url || player.photoUrl ? (
                <img 
                  src={player.photoData?.url || player.photoUrl} 
                  alt={player.name}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Sem foto</span>
                </div>
              )}
            </div>
            
            <div className="lg:w-2/3 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#E5050F] mb-6">{player.name}</h3>
              </div>
              
              {/* Dados Pessoais */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Dados Pessoais</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Nascimento
                    </label>
                    <p className="text-gray-900">{formatDate(player.birthDate)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Naturalidade
                    </label>
                    <p className="text-gray-900">{player.birthplace || 'Não informado'}</p>
                  </div>
                </div>
              </div>

              {/* Dados Esportivos */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Dados Esportivos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Posição
                    </label>
                    <p className="text-gray-900">{player.position || 'Não informado'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <p className="text-gray-900">{player.category}</p>
                  </div>
                </div>
              </div>

              {/* Dados Acadêmicos */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Dados Acadêmicos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Escola
                    </label>
                    <p className="text-gray-900">{player.school || 'Não informado'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ano que Estuda
                    </label>
                    <p className="text-gray-900">{player.year || 'Não informado'}</p>
                  </div>
                </div>
              </div>

              {/* Dados do Alojamento */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Dados do Alojamento</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admissão no Alojamento
                    </label>
                    <p className="text-gray-900">{formatDate(player.admissionDate)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quarto
                    </label>
                    <p className="text-gray-900">{player.room || 'Não informado'}</p>
                  </div>
                </div>
              </div>

              {/* Observações Médicas */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="text-lg font-semibold text-red-800 mb-3">Observações Médicas</h4>
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-1">
                    Alergias e Observações
                  </label>
                  <p className="text-red-900 whitespace-pre-wrap">
                    {player.medicalObservations || 'Nenhuma observação médica registrada'}
                  </p>
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

