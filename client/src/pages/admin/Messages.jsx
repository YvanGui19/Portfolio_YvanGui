import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { HiMail, HiMailOpen } from "react-icons/hi";
import contactService from "../../services/contactService";
import useFetch from "../../hooks/useFetch";
import { useMessages } from "../../context/MessagesContext";
import ConfirmModal from "../../components/common/ConfirmModal";

function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refreshUnreadCount } = useMessages();
  const {
    data: messages,
    loading,
    refetch,
  } = useFetch(() => contactService.getAll());
  const [selected, setSelected] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [deleting, setDeleting] = useState(false);

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

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await contactService.delete(deleteModal.id);
      setSelected(null);
      refetch();
      refreshUnreadCount();
      closeDeleteModal();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
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
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-mono text-[0.8rem] text-grey">Chargement...</p>
      </div>
    );
  }

  const unreadCount = messages?.filter((m) => m.status !== 'read').length || 0;

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Tag */}
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.25em] uppercase mb-2">
          // MESSAGES
        </div>

        {/* Title */}
        <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold text-off-white tracking-wide">
          Messages
        </h1>

        {/* Counter */}
        <p className="font-mono text-[0.8rem] text-grey">
          &gt; {unreadCount} non lu{unreadCount > 1 ? "s" : ""} sur {messages?.length || 0}
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste */}
        <div className="lg:col-span-1 space-y-2">
          {messages?.length === 0 ? (
            <div className="border border-white/10 bg-black/20 p-8 text-center">
              <HiMail className="w-10 h-10 text-grey/30 mx-auto mb-3" />
              <p className="font-mono text-[0.8rem] text-grey">// Aucun message</p>
            </div>
          ) : (
            messages?.map((msg, index) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  onClick={() => {
                    setSelected(msg);
                    handleMarkAsRead(msg);
                  }}
                  className={`border bg-black/20 p-4 cursor-pointer transition-all duration-200 ${
                    selected?._id === msg._id
                      ? "border-cyan bg-cyan/5"
                      : "border-white/10 hover:border-cyan/30 hover:bg-cyan/5"
                  } ${msg.status !== 'read' ? "border-l-2 border-l-cyan" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 border flex items-center justify-center font-mono text-[0.8rem] font-bold flex-shrink-0 ${
                      msg.status !== 'read'
                        ? "border-cyan/40 bg-cyan/10 text-cyan"
                        : "border-white/10 bg-white/5 text-grey"
                    }`}>
                      {msg.name?.charAt(0) || "?"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`font-mono text-[0.8rem] truncate ${
                          msg.status !== 'read' ? "text-off-white font-medium" : "text-grey"
                        }`}>
                          {msg.name}
                        </p>
                        <span className="font-mono text-[0.65rem] text-grey/60 flex-shrink-0">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                      <p className="font-mono text-[0.7rem] text-grey/60 truncate">
                        {msg.message}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {msg.status !== 'read' && (
                      <span className="w-2 h-2 bg-cyan rounded-full flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Détail */}
        <div className="lg:col-span-2">
          {selected ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="border border-white/10 bg-black/20">
                {/* Header */}
                <div className="flex items-center gap-4 p-6 border-b border-white/10">
                  <div className="w-14 h-14 border border-cyan/30 bg-cyan/10 flex items-center justify-center text-cyan font-mono text-xl font-bold">
                    {selected.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-mono text-[1rem] text-off-white font-medium mb-1">
                      {selected.name}
                    </h2>
                    <p className="font-mono text-[0.75rem] text-cyan">
                      {selected.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selected.status === 'read' ? (
                      <HiMailOpen className="w-5 h-5 text-grey/40" />
                    ) : (
                      <HiMail className="w-5 h-5 text-cyan" />
                    )}
                  </div>
                </div>

                {/* Message content */}
                <div className="p-6">
                  <div className="font-mono text-[0.65rem] text-grey/50 mb-3">
                    // message.content
                  </div>
                  <p className="font-mono text-[0.85rem] text-grey leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-6 border-t border-white/10">
                  <a
                    href={`mailto:${selected.email}`}
                    className="px-5 py-2.5 font-mono text-[0.75rem] bg-cyan text-dark-navy font-semibold tracking-wider uppercase hover:bg-cyan/90 transition-colors"
                  >
                    Répondre
                  </a>
                  <button
                    onClick={() => openDeleteModal(selected._id)}
                    className="px-5 py-2.5 font-mono text-[0.75rem] border border-red/30 text-red tracking-wider uppercase hover:bg-red/10 transition-colors cursor-pointer"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="border border-white/10 bg-black/20 p-12 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
              <HiMail className="w-12 h-12 text-grey/20 mb-4" />
              <p className="font-mono text-[0.85rem] text-grey">
                // Sélectionnez un message pour le lire
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Supprimer le message"
        message="Voulez-vous vraiment supprimer ce message ? Cette action est irréversible."
        confirmText="Supprimer"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}

export default Messages;
