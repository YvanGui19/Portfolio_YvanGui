import { useState } from "react";
import { motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap, HiPencil, HiTrash } from "react-icons/hi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import experienceService from "../../services/experienceService";
import useFetch from "../../hooks/useFetch";

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

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette expérience ?")) return;
    try {
      await experienceService.delete(id);
      refetch();
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Présent";
    return new Date(date).getFullYear();
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
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-text">Expériences</h1>
          <p className="text-text-muted">
            {experiences?.length || 0} expériences
          </p>
        </div>
        <Button
          variant={showForm ? "outline" : "primary"}
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
        >
          {showForm ? "Annuler" : "+ Nouvelle expérience"}
        </Button>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-8"
        >
          <Card className="p-6 cursor-default">
            <h3 className="text-lg font-semibold mb-4 text-text">
              {editingId ? "Modifier l'expérience" : "Nouvelle expérience"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Titre"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Développeur Web..."
                />
                <Input
                  label="Entreprise"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Nom de l'entreprise..."
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-text">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-text cursor-pointer hover:border-primary hover:shadow-glow"
                  >
                    <option value="experience">Expérience pro</option>
                    <option value="education">Formation</option>
                  </select>
                </div>
                <Input
                  label="Date début"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
                <Input
                  label="Date fin (vide = présent)"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
              <Input
                label="Description"
                type="textarea"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description du poste..."
              />
              <Button type="submit" disabled={saving}>
                {saving ? "Sauvegarde..." : editingId ? "Modifier" : "Ajouter"}
              </Button>
            </form>
          </Card>
        </motion.div>
      )}

      <div className="space-y-4">
        {experiences?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-text-muted">Aucune expérience</p>
          </Card>
        ) : (
          experiences?.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-text">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {exp.type === "experience" ? (
                        <HiBriefcase className="w-6 h-6 text-primary" />
                      ) : (
                        <HiAcademicCap className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm text-text-muted">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-primary">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary cursor-pointer"
                      title="Modifier"
                    >
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="p-2 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger cursor-pointer"
                      title="Supprimer"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Experiences;
