import { useState, useEffect } from 'react';
import { X, Upload, User } from 'lucide-react';
import { utils } from '../services/firebaseService';

const PlayerForm = ({ player, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    position: '',
    admissionDate: '',
    school: '',
    year: '',
    birthplace: '',
    category: 'Sub20'
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const categories = ['Sub20', 'Sub17', 'Sub16', 'Sub15', 'Sub14'];
  const positions = [
    'Goleiro',
    'Lateral-direito',
    'Lateral-esquerdo',
    'Zagueiro',
    'Volante',
    'Meio-campo',
    'Meia-atacante',
    'Ponta-direita',
    'Ponta-esquerda',
    'Atacante',
    'Centroavante'
  ];

  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || '',
        birthDate: player.birthDate || '',
        position: player.position || '',
        admissionDate: player.admissionDate || '',
        school: player.school || '',
        year: player.year || '',
        birthplace: player.birthplace || '',
        category: player.category || 'Sub20'
      });
      setPhotoPreview(player.photoUrl || '');
    }
  }, [player]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setErrors(['Por favor, selecione apenas arquivos de imagem']);
        return;
      }

      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(['A imagem deve ter no máximo 5MB']);
        return;
      }

      setPhotoFile(file);
      
      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      // Validar dados
      const validationErrors = utils.validatePlayerData(formData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      await onSubmit(formData, photoFile);
    } catch (error) {
      setErrors(['Erro ao salvar jogador']);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {player ? 'Editar Jogador' : 'Adicionar Jogador'}
          </h2>
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          {/* Upload de foto */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto do Jogador
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-32 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload size={20} />
                  <span>Selecionar Foto</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG ou WEBP. Máximo 5MB.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
                required
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
              />
            </div>

            {/* Posição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posição
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
              >
                <option value="">Selecione uma posição</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>

            {/* Admissão no Alojamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admissão no Alojamento
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
              />
            </div>

            {/* Escola */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Escola
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
              />
            </div>

            {/* Ano */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ano
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="2020"
                max="2030"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
              />
            </div>

            {/* Naturalidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naturalidade
              </label>
              <input
                type="text"
                name="birthplace"
                value={formData.birthplace}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5050F] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#E5050F] text-white rounded-lg hover:bg-[#C20C18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : (player ? 'Atualizar' : 'Adicionar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;

