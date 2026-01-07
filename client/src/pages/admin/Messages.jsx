import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/common/Card";
import contactService from "../../services/contactService";
import useFetch from "../../hooks/useFetch";
import { useMessages } from "../../context/MessagesContext";

function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refreshUnreadCount } = useMessages();
  const {
    data: messages,
    loading,
    refetch,
  } = useFetch(() => contactService.getAll());
  const [selected, setSelected] = useState(null);

  // Ouvrir le message si ID passé en paramètre URL
  useEffect(() => {
    const messageId = searchParams.get("id");
    if (messageId && messages) {
      const msg = messages.find((m) => m._id === messageId);
      if (msg) {
        setSelected(msg);
        // Marquer comme lu si non lu
        if (msg.status !== 'read') {
          contactService.markAsRead(msg._id).then(() => {
            refetch();
            refreshUnreadCount();
          });
        }
        // Nettoyer l'URL
        setSearchParams({});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, searchParams]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    try {
      await contactService.delete(id);
      setSelected(null);
      refetch();
      refreshUnreadCount();
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const handleMarkAsRead = async (msg) => {
    if (msg.status === 'read') return;
    try {
      await contactService.markAsRead(msg._id);
      refetch();
      refreshUnreadCount();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    if (diff < 86400000) return "Aujourd'hui";
    if (diff < 172800000) return "Hier";
    return d.toLocaleDateString("fr-FR");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-text">Messages</h1>
        <p className="text-text-muted">
          {messages?.filter((m) => m.status !== 'read').length || 0} non lu(s) sur{" "}
          {messages?.length || 0}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste */}
        <div className="lg:col-span-1 space-y-3">
          {messages?.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-text-muted">Aucun message</p>
            </Card>
          ) : (
            messages?.map((msg, index) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    selected?._id === msg._id ? "border-primary" : ""
                  } ${msg.status !== 'read' ? "border-l-4 border-l-primary" : ""}`}
                  onClick={() => {
                    setSelected(msg);
                    handleMarkAsRead(msg);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {msg.name?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm truncate text-text">
                          {msg.name}
                        </p>
                        <span className="text-xs text-text-muted">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted truncate">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Détail */}
        <div className="lg:col-span-2">
          {selected ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                    {selected.name?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text">
                      {selected.name}
                    </h2>
                    <p className="text-text-muted">{selected.email}</p>
                  </div>
                </div>
                <p className="text-text-light leading-relaxed mb-6 whitespace-pre-wrap">
                  {selected.message}
                </p>
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selected.email}`}
                    className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Répondre
                  </a>
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors cursor-pointer"
                  >
                    Supprimer
                  </button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-text-muted">
                Sélectionnez un message pour le lire
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
