import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../firebase';

// Coleção de jogadores
const PLAYERS_COLLECTION = 'players';

// Operações CRUD para jogadores
export const playersService = {
  // Buscar todos os jogadores
  async getAll() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, PLAYERS_COLLECTION), orderBy('name'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      throw error;
    }
  },

  // Buscar jogadores por categoria
  async getByCategory(category) {
    try {
      const q = query(
        collection(db, PLAYERS_COLLECTION),
        where('category', '==', category),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar jogadores por categoria:', error);
      throw error;
    }
  },

  // Adicionar novo jogador
  async add(playerData) {
    try {
      const docRef = await addDoc(collection(db, PLAYERS_COLLECTION), {
        ...playerData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar jogador:', error);
      throw error;
    }
  },

  // Atualizar jogador
  async update(id, playerData) {
    try {
      const playerRef = doc(db, PLAYERS_COLLECTION, id);
      await updateDoc(playerRef, {
        ...playerData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erro ao atualizar jogador:', error);
      throw error;
    }
  },

  // Remover jogador
  async delete(id) {
    try {
      await deleteDoc(doc(db, PLAYERS_COLLECTION, id));
    } catch (error) {
      console.error('Erro ao remover jogador:', error);
      throw error;
    }
  }
};

// Operações para upload de imagens
export const storageService = {
  // Upload de foto do jogador
  async uploadPlayerPhoto(file, playerId) {
    try {
      const fileExtension = file.name.split('.').pop();
      const fileName = `players/${playerId}.${fileExtension}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      throw error;
    }
  },

  // Deletar foto do jogador
  async deletePlayerPhoto(photoUrl) {
    try {
      if (photoUrl && photoUrl.includes('firebase')) {
        const photoRef = ref(storage, photoUrl);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      // Não propagar o erro, pois a foto pode já ter sido deletada
    }
  }
};

// Utilitários
export const utils = {
  // Validar dados do jogador
  validatePlayerData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.category) {
      errors.push('Categoria é obrigatória');
    }
    
    if (data.birthDate && new Date(data.birthDate) > new Date()) {
      errors.push('Data de nascimento não pode ser no futuro');
    }
    
    return errors;
  },

  // Formatar data para exibição
  formatDate(dateString) {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  },

  // Gerar ID único para upload
  generateUploadId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
};

