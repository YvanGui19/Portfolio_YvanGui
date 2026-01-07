import { useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import skillService from "../../services/skillService";
import useFetch from "../../hooks/useFetch";

const emptyForm = { name: "", category: "Frontend", level: 50 };

function Skills() {
  const {
    data: skills,
    loading,
    refetch,
  } = useFetch(() => skillService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

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
      level: skill.level,
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

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette compétence ?")) return;
    try {
      await skillService.delete(id);
      refetch();
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  // Grouper par catégorie
  const skillsByCategory =
    skills?.reduce((acc, skill) => {
      const cat = skill.category || "Autres";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {}) || {};

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
          <h1 className="text-3xl font-bold text-text">Compétences</h1>
          <p className="text-text-muted">{skills?.length || 0} compétences</p>
        </div>
        <Button
          variant={showForm ? "outline" : "primary"}
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
        >
          {showForm ? "Annuler" : "+ Nouvelle compétence"}
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
              {editingId ? "Modifier la compétence" : "Nouvelle compétence"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid sm:grid-cols-4 gap-4 items-end"
            >
              <Input
                label="Nom"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="React, Node.js..."
              />
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-text">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-text text-sm hover:border-primary hover:shadow-glow cursor-pointer"
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Tools</option>
                  <option>Other</option>
                </select>
              </div>
              <Input
                label="Niveau (%)"
                type="number"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: parseInt(e.target.value) || 0 })
                }
              />
              <Button type="submit" disabled={saving}>
                {saving ? "Sauvegarde..." : editingId ? "Modifier" : "Ajouter"}
              </Button>
            </form>
          </Card>
        </motion.div>
      )}

      {Object.entries(skillsByCategory).map(([category, catSkills]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-primary">
            {category}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catSkills.map((skill) => (
              <Card key={skill._id} className="p-4 text-text">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-1 hover:bg-primary/10 rounded text-text-muted hover:text-primary cursor-pointer"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-1 hover:bg-danger/10 rounded text-text-muted hover:text-danger cursor-pointer"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-muted">Niveau</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-surface-light rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Skills;
