import { useState } from "react";
import { motion } from "framer-motion";
import { HiPencil, HiTrash, HiLightningBolt, HiX } from "react-icons/hi";
import skillService from "../../services/skillService";
import useFetch from "../../hooks/useFetch";
import ConfirmModal from "../../components/common/ConfirmModal";

const emptyForm = { name: "", category: "Frontend" };

const categoryColors = {
  Frontend: "lime",
  Backend: "cyan",
  Tools: "violet",
  Other: "grey",
};

function Skills() {
  const {
    data: skills,
    loading,
    refetch,
  } = useFetch(() => skillService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [showEditTable, setShowEditTable] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, skillId: null, isBulk: false });
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSaving(true);
    try {
      if (editingId) {
        await skillService.update(editingId, formData);
      } else {
        await skillService.create(formData);
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

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
    });
    setEditingId(skill._id);
    setShowForm(true);
    // Scroll vers le haut après le rendu du formulaire
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, skillId: id, isBulk: false });
  };

  const openBulkDeleteModal = () => {
    if (selectedSkills.length === 0) return;
    setDeleteModal({ isOpen: true, skillId: null, isBulk: true });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, skillId: null, isBulk: false });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      if (deleteModal.isBulk) {
        await Promise.all(selectedSkills.map((id) => skillService.delete(id)));
        setSelectedSkills([]);
      } else {
        await skillService.delete(deleteModal.skillId);
      }
      refetch();
      closeDeleteModal();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  const toggleSkillSelection = (id) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCloseEditTable = () => {
    setShowEditTable(false);
    setSelectedSkills([]);
  };

  // Grouper par catégorie
  const skillsByCategory =
    skills?.reduce((acc, skill) => {
      const cat = skill.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {}) || {};

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-violet border-t-transparent rounded-full animate-spin mb-3" />
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
          <div className="font-mono text-[0.7rem] text-violet tracking-[0.25em] uppercase mb-2">
            // SKILLS
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold text-off-white tracking-wide">
            Compétences
          </h1>

          {/* Counter */}
          <p className="font-mono text-[0.8rem] text-grey">
            &gt; {skills?.length || 0} compétence{skills?.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex gap-3">
          {!showForm && !showEditTable && (
            <button
              onClick={() => setShowEditTable(true)}
              className="px-4 py-2.5 font-mono text-[0.75rem] border border-white/20 text-grey hover:text-lime hover:border-lime/30 tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2"
            >
              <HiPencil className="w-4 h-4" />
              Modifier
            </button>
          )}
          <button
            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
            className={`px-5 py-2.5 font-mono text-[0.75rem] tracking-wider uppercase transition-colors cursor-pointer ${
              showForm
                ? "border border-white/20 text-grey hover:text-off-white hover:border-white/40"
                : "bg-violet text-dark-navy font-semibold hover:bg-violet/90"
            }`}
          >
            {showForm ? "Annuler" : "+ Nouvelle compétence"}
          </button>
        </div>
      </motion.div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-8"
        >
          <div className="border border-white/10 bg-black/20 p-6">
            <div className="font-mono text-[0.7rem] text-violet/60 tracking-[0.2em] mb-4">
              // {editingId ? "EDIT_SKILL" : "NEW_SKILL"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid sm:grid-cols-3 gap-4 items-end"
            >
              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="React, Node.js..."
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-violet/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white focus:border-violet/50 focus:outline-none transition-colors cursor-pointer"
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Tools</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 font-mono text-[0.75rem] bg-violet text-dark-navy font-semibold tracking-wider uppercase hover:bg-violet/90 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {saving ? "..." : editingId ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* Edit Table Mode */}
      {showEditTable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="border border-white/10 bg-black/20">
            {/* Table Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <HiPencil className="w-4 h-4 text-lime" />
                <span className="font-mono text-[0.8rem] text-off-white tracking-wide uppercase">
                  Mode édition
                </span>
                <span className="font-mono text-[0.7rem] text-grey">
                  // {skills?.length || 0} compétences
                </span>
              </div>
              <div className="flex items-center gap-3">
                {selectedSkills.length > 0 && (
                  <button
                    onClick={openBulkDeleteModal}
                    className="px-4 py-2 font-mono text-[0.7rem] border border-red/30 text-red hover:bg-red/10 tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Supprimer ({selectedSkills.length})
                  </button>
                )}
                <button
                  onClick={handleCloseEditTable}
                  className="p-2 text-grey hover:text-off-white transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3 text-left font-mono text-[0.7rem] text-grey tracking-wider uppercase">Nom</th>
                    <th className="px-5 py-3 text-left font-mono text-[0.7rem] text-grey tracking-wider uppercase">Catégorie</th>
                    <th className="px-5 py-3 text-center font-mono text-[0.7rem] text-grey tracking-wider uppercase">Sélection</th>
                    <th className="px-5 py-3 text-center font-mono text-[0.7rem] text-grey tracking-wider uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skills?.map((skill) => {
                    const color = categoryColors[skill.category] || "grey";
                    return (
                      <tr
                        key={skill._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <span className="font-mono text-[0.85rem] text-off-white">
                            {skill.name}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 border border-${color}/30 bg-${color}/10 font-mono text-[0.7rem] text-${color} tracking-wider uppercase`}>
                            {skill.category}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill._id)}
                            onChange={() => toggleSkillSelection(skill._id)}
                            className="w-4 h-4 bg-black/30 border border-white/20 checked:bg-violet checked:border-violet focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => openDeleteModal(skill._id)}
                            className="p-2 text-grey hover:text-red hover:bg-red/10 transition-colors cursor-pointer"
                            title="Supprimer"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Skills by category */}
      {!showEditTable && Object.entries(skillsByCategory).map(([category, catSkills]) => {
        const color = categoryColors[category] || "grey";

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <HiLightningBolt className={`w-4 h-4 text-${color}`} />
              <h2 className={`font-mono text-[0.85rem] text-${color} tracking-wide uppercase`}>
                {category}
              </h2>
              <div className="flex-1 h-px bg-white/10" />
              <span className="font-mono text-[0.65rem] text-grey">
                {catSkills.length}
              </span>
            </div>

            {/* Skills grid */}
            <div className="flex flex-wrap gap-2">
              {catSkills.map((skill) => (
                <div
                  key={skill._id}
                  className={`flex items-center gap-2 border border-white/10 bg-black/20 px-3 py-2 hover:border-${color}/30 hover:bg-${color}/5 transition-all duration-200`}
                >
                  <span className={`font-mono text-[0.8rem] text-${color}`}>//</span>
                  <span className="font-mono text-[0.85rem] text-off-white">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Empty state */}
      {!showEditTable && skills?.length === 0 && (
        <div className="border border-white/10 bg-black/20 p-12 text-center">
          <HiLightningBolt className="w-12 h-12 text-grey/30 mx-auto mb-4" />
          <p className="font-mono text-[0.9rem] text-grey mb-4">
            // Aucune compétence pour le moment
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 font-mono text-[0.75rem] bg-violet text-dark-navy font-semibold tracking-wider uppercase hover:bg-violet/90 transition-colors cursor-pointer"
          >
            Ajouter votre première compétence
          </button>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Supprimer"
        message={
          deleteModal.isBulk
            ? `Voulez-vous vraiment supprimer ${selectedSkills.length} compétence(s) ? Cette action est irréversible.`
            : "Voulez-vous vraiment supprimer cette compétence ? Cette action est irréversible."
        }
        confirmText="Supprimer"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}

export default Skills;
