import { X } from 'lucide-react';

const PlayerModal = ({ player, isOpen, onClose }) => {
  if (!isOpen || !player) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header com botão fechar */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Detalhes do Jogador</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Seção de destaque estilo Chelsea */}
        <div className="relative h-96 overflow-hidden chelsea-hero-section">
          {/* Degradê vermelho de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E5050F] via-[#C20C18] to-[#A01015]"></div>
          
          {/* Nome estilizado ao fundo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="chelsea-player-name text-white font-black text-6xl md:text-8xl lg:text-9xl opacity-20 select-none pointer-events-none">
              {player.name.split(' ').pop().toUpperCase()}
            </h1>
          </div>
          
          {/* Foto do jogador */}
          <div className="absolute right-8 top-8 bottom-8 w-80">
            {player.photoData?.url || player.photoUrl ? (
              <img 
                src={player.photoData?.url || player.photoUrl} 
                alt={player.name}
                className="w-full h-full object-cover object-center rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center shadow-2xl">
                <span className="text-gray-400 text-lg">Sem foto</span>
              </div>
            )}
          </div>
          
          {/* Informações principais */}
          <div className="absolute left-8 bottom-8 text-white">
            <p className="text-lg font-medium mb-2">{player.name.split(' ')[0]}</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4 chelsea-player-surname">
              {player.name.split(' ').slice(1).join(' ').toUpperCase()}
            </h2>
            <p className="text-xl font-medium">{player.position || 'Posição não informada'}</p>
          </div>
          
          {/* Número da camisa (se disponível) */}
          <div className="absolute top-8 left-8 text-white">
            <span className="text-6xl font-black opacity-60">
              {player.number || player.category?.replace('Sub', '')}
            </span>
          </div>
        </div>
        
        {/* Seção de informações detalhadas */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>

          {/* Observações Médicas - Seção completa */}
          <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-200">
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

