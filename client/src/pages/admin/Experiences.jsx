import { useState } from "react";
import { motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap, HiPencil, HiTrash } from "react-icons/hi";
import experienceService from "../../services/experienceService";
import useFetch from "../../hooks/useFetch";
import ConfirmModal from "../../components/common/ConfirmModal";

const emptyForm = {
  title: "",
  company: "",
  type: "experience",
  startDate: "",
  endDate: "",
  description: "",
};

function Experiences() {
  const {
    data: experiences,
    loading,
    refetch,
  } = useFetch(() => experienceService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.company.trim()) return;

    setSaving(true);
    try {
      if (editingId) {
        await experienceService.update(editingId, formData);
      } else {
        await experienceService.create(formData);
      }
      setFormData(emptyForm);
      setShowForm(false);
      setEditingId(null);
      refetch();
    } catch {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      title: exp.title,
      company: exp.company,
      type: exp.type,
      startDate: exp.startDate ? exp.startDate.split("T")[0] : "",
      endDate: exp.endDate ? exp.endDate.split("T")[0] : "",
      description: exp.description || "",
    });
    setEditingId(exp._id);
    setShowForm(true);
    // Scroll vers le haut pour voir le formulaire
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await experienceService.delete(deleteModal.id);
      refetch();
      closeDeleteModal();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Présent";
    return new Date(date).getFullYear();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-mono text-[0.8rem] text-grey">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          {/* Tag */}
          <div className="font-mono text-[0.7rem] text-orange tracking-[0.25em] uppercase mb-2">
            // EXPERIENCES
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold text-off-white tracking-wide">
            Expériences
          </h1>

          {/* Counter */}
          <p className="font-mono text-[0.8rem] text-grey">
            &gt; {experiences?.length || 0} expérience{experiences?.length > 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
          className={`px-5 py-2.5 font-mono text-[0.75rem] tracking-wider uppercase transition-colors cursor-pointer ${
            showForm
              ? "border border-white/20 text-grey hover:text-off-white hover:border-white/40"
              : "bg-orange text-dark-navy font-semibold hover:bg-orange/90"
          }`}
        >
          {showForm ? "Annuler" : "+ Nouvelle expérience"}
        </button>
      </motion.div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-8"
        >
          <div className="border border-white/10 bg-black/20 p-6">
            <div className="font-mono text-[0.7rem] text-orange/60 tracking-[0.2em] mb-4">
              // {editingId ? "EDIT_EXPERIENCE" : "NEW_EXPERIENCE"}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Titre et Entreprise */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Développeur Web..."
                    className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-orange/50 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Nom de l'entreprise..."
                    className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-orange/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Type et Dates */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white focus:border-orange/50 focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="experience">Expérience pro</option>
                    <option value="education">Formation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                    Date début
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white focus:border-orange/50 focus:outline-none transition-colors cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                    Date fin <span className="text-grey/50">(vide = présent)</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white focus:border-orange/50 focus:outline-none transition-colors cursor-pointer"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description du poste..."
                  rows={3}
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-orange/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 font-mono text-[0.75rem] bg-orange text-dark-navy font-semibold tracking-wider uppercase hover:bg-orange/90 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {saving ? "Sauvegarde..." : editingId ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* Experiences list */}
      <div className="space-y-3">
        {experiences?.length === 0 ? (
          <div className="border border-white/10 bg-black/20 p-12 text-center">
            <HiBriefcase className="w-12 h-12 text-grey/30 mx-auto mb-4" />
            <p className="font-mono text-[0.9rem] text-grey mb-4">
              // Aucune expérience pour le moment
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 font-mono text-[0.75rem] bg-orange text-dark-navy font-semibold tracking-wider uppercase hover:bg-orange/90 transition-colors cursor-pointer"
            >
              Ajouter votre première expérience
            </button>
          </div>
        ) : (
          experiences?.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="group border border-white/10 bg-black/20 hover:border-orange/30 hover:bg-orange/5 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
                  {/* Info */}
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 ${
                      exp.type === "experience"
                        ? "border-orange/30 bg-orange/10"
                        : "border-violet/30 bg-violet/10"
                    }`}>
                      {exp.type === "experience" ? (
                        <HiBriefcase className="w-5 h-5 text-orange" />
                      ) : (
                        <HiAcademicCap className="w-5 h-5 text-violet" />
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <h3 className="font-mono text-[0.9rem] text-off-white font-medium mb-1">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-[0.75rem] text-grey">
                        // {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Date */}
                    <span className={`font-mono text-[0.75rem] ${exp.type === "education" ? "text-violet" : "text-orange"}`}>
                      {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
                    </span>

                    {/* Type badge */}
                    <span className={`px-3 py-1 font-mono text-[0.65rem] tracking-wider uppercase ${
                      exp.type === "experience"
                        ? "border border-orange/30 text-orange"
                        : "border border-violet/30 text-violet"
                    }`}>
                      {exp.type === "experience" ? "XP Pro" : "Formation"}
                    </span>

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 border border-white/10 text-grey hover:text-lime hover:border-lime/30 hover:bg-lime/10 transition-all cursor-pointer"
                      title="Modifier"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => openDeleteModal(exp._id)}
                      className="p-2 border border-white/10 text-grey hover:text-red hover:border-red/30 hover:bg-red/10 transition-all cursor-pointer"
                      title="Supprimer"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Supprimer l'expérience"
        message="Voulez-vous vraiment supprimer cette expérience ? Cette action est irréversible."
        confirmText="Supprimer"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}

export default Experiences;
