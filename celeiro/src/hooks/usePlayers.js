import { useState, useEffect } from 'react';
import { playersService } from '../services/firebaseService';
import { mockPlayers } from '../data/mockPlayers';

export const usePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useFirebase, setUseFirebase] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      setError(null);

      if (useFirebase) {
        // Tentar carregar do Firebase
        try {
          const firebasePlayers = await playersService.getAll();
          setPlayers(firebasePlayers);
        } catch (firebaseError) {
          console.warn('Erro ao carregar do Firebase, usando dados mock:', firebaseError);
          // Fallback para dados mock se Firebase falhar
          setPlayers(mockPlayers);
          setUseFirebase(false);
        }
      } else {
        // Usar dados mock
        setPlayers(mockPlayers);
      }
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
      setError('Erro ao carregar jogadores');
      // Fallback para dados mock em caso de erro
      setPlayers(mockPlayers);
    } finally {
      setLoading(false);
    }
  };

  const getPlayersByCategory = (category) => {
    return players.filter(player => player.category === category);
  };

  const refreshPlayers = () => {
    loadPlayers();
  };

  return {
    players,
    loading,
    error,
    useFirebase,
    getPlayersByCategory,
    refreshPlayers
  };
};

