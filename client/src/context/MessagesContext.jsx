import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import contactService from "../services/contactService";

const MessagesContext = createContext();

// Intervalle de vérification des nouveaux messages (en ms)
const POLL_INTERVAL = 30000; // 30 secondes

export function MessagesProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(async () => {
    try {
      const response = await contactService.getAll();
      const messages = response?.data || [];
      const unread = messages.filter((m) => m.status !== "read").length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Erreur chargement messages:", err);
    }
  }, []);

  // Charger au montage + polling pour les nouveaux messages
  useEffect(() => {
    // Initial fetch - async donc pas de setState synchrone
    const initialFetch = async () => {
      await refreshUnreadCount();
    };
    initialFetch();

    const interval = setInterval(refreshUnreadCount, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [refreshUnreadCount]);

  return (
    <MessagesContext.Provider value={{ unreadCount, refreshUnreadCount }}>
      {children}
    </MessagesContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
// eslint-disable-next-line react-refresh/only-export-components
export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
}
