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
          {/* Degradê vermelho suave para branco */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E5050F] via-[#E5050F] to-white"></div>
          
          {/* Nome estilizado ao fundo - Layout original melhorado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="chelsea-player-name text-white font-black text-6xl md:text-8xl lg:text-9xl opacity-30 select-none pointer-events-none">
              {player.name.split(' ').slice(1).join(' ').toUpperCase()}
            </h1>
          </div>
          
          {/* Foto do jogador - Lado esquerdo, tamanho real com fundo transparente */}
          <div className="absolute left-8 top-0 bottom-0 w-80 flex items-center">
            {player.photoData?.url || player.photoUrl ? (
              <img 
                src={player.photoData?.url || player.photoUrl} 
                alt={player.name}
                className="w-full h-auto object-contain max-h-full"
                style={{ 
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                  backgroundColor: 'transparent',
                  mixBlendMode: 'normal'
                }}
              />
            ) : (
              <div className="w-full h-80 bg-transparent flex items-center justify-center">
                <span className="text-white text-lg opacity-50">Sem foto</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Seção de informações detalhadas */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dados Pessoais */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Dados Pessoais</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <p className="text-gray-900 font-semibold">{player.name}</p>
                </div>
                
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

          {/* Observações Médicas e Contato de Emergência - Seções divididas */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            {/* Contato dos Responsáveis para Emergência */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Contato dos Responsáveis para Emergência</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    Nome do Responsável
                  </label>
                  <p className="text-green-900">
                    {player.emergencyContactName || 'Não informado'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    Telefone
                  </label>
                  <p className="text-green-900">
                    {player.emergencyContactPhone || 'Não informado'}
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

