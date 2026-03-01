import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HiFolder, HiLightningBolt, HiMail, HiBriefcase, HiMailOpen } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import projectService from "../../services/projectService";
import skillService from "../../services/skillService";
import experienceService from "../../services/experienceService";
import contactService from "../../services/contactService";

const iconMap = {
  projects: HiFolder,
  skills: HiLightningBolt,
  messages: HiMail,
  experiences: HiBriefcase,
  messageRead: HiMailOpen,
  messageUnread: HiMail,
};

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: "Projets", value: "-", iconKey: "projects", trend: "Chargement...", to: "/admin/projects" },
    { label: "Compétences", value: "-", iconKey: "skills", trend: "Chargement...", to: "/admin/skills" },
    { label: "Messages", value: "-", iconKey: "messages", trend: "Chargement...", to: "/admin/messages" },
    { label: "Expériences", value: "-", iconKey: "experiences", trend: "Chargement...", to: "/admin/experiences" },
  ]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      const [projects, skills, messages, experiences] = await Promise.all([
        projectService.getAll(),
        skillService.getAll(),
        contactService.getAll(),
        experienceService.getAll(),
      ]);

      const projectsList = projects?.data || [];
      const skillsList = skills?.data || [];
      const messagesList = messages?.data || [];
      const experiencesList = experiences?.data || [];

      const featuredCount = projectsList.filter((p) => p.featured).length;
      const unreadCount = messagesList.filter((m) => m.status !== 'read').length;

      setStats([
        {
          label: "Projets",
          value: projectsList.length.toString(),
          iconKey: "projects",
          trend: `${featuredCount} mis en avant`,
          to: "/admin/projects",
        },
        {
          label: "Compétences",
          value: skillsList.length.toString(),
          iconKey: "skills",
          trend: "Toutes catégories",
          to: "/admin/skills",
        },
        {
          label: "Messages",
          value: messagesList.length.toString(),
          iconKey: "messages",
          trend: `${unreadCount} non lu${unreadCount > 1 ? "s" : ""}`,
          to: "/admin/messages",
        },
        {
          label: "Expériences",
          value: experiencesList.length.toString(),
          iconKey: "experiences",
          trend: "À jour",
          to: "/admin/experiences",
        },
      ]);

      // Derniers messages (3 plus récents)
      const recent = messagesList
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
        .map((msg) => ({
          action: `Message de ${msg.name}`,
          time: formatTimeAgo(msg.createdAt),
          iconKey: msg.status === 'read' ? "messageRead" : "messageUnread",
          id: msg._id,
          unread: msg.status !== 'read',
        }));
      setRecentMessages(recent);
    } catch (error) {
      console.error("Erreur chargement stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return "Hier";
    return `Il y a ${days} jours`;
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-text">Bienvenue,</span>{" "}
          <span className="text-primary">{user?.name || "Admin"}</span>
        </h1>
        <p className="text-text-muted">Voici un aperçu de votre portfolio</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              hover
              className="p-6 cursor-pointer"
              onClick={() => navigate(stat.to)}
            >
              <div className="flex items-center justify-between mb-4">
                {(() => {
                  const IconComponent = iconMap[stat.iconKey];
                  return IconComponent ? <IconComponent className="w-8 h-8 text-primary" /> : null;
                })()}
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1 text-text">
                {loading ? "..." : stat.value}
              </p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actions rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-text">
          Actions rapides
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button to="/admin/projects/new">+ Nouveau projet</Button>
          <Button variant="outline" to="/admin/messages">
            Voir les messages
          </Button>
          <Button variant="outline" to="/admin/skills">
            Gérer compétences
          </Button>
        </div>
      </motion.div>

      {/* Activité récente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">
                Messages récents
              </h2>
              <Link
                to="/admin/messages"
                className="text-sm text-primary hover:underline"
              >
                Tout voir →
              </Link>
            </div>
          </Card.Header>
          <Card.Content className="p-0">
            {loading ? (
              <div className="p-8 text-center text-text-muted">
                Chargement...
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="p-8 text-center text-text-muted">
                Aucun message
              </div>
            ) : (
              recentMessages.map((activity, index) => (
                <Link
                  key={activity.id || index}
                  to={`/admin/messages?id=${activity.id}`}
                  className={`flex items-center gap-4 p-4 border-b border-border last:border-b-0 hover:bg-surface-light transition-colors ${
                    activity.unread ? "border-l-4 border-l-primary bg-primary/5" : ""
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.unread ? "bg-primary/20" : "bg-primary/10"
                  }`}>
                    {(() => {
                      const IconComponent = iconMap[activity.iconKey];
                      return IconComponent ? <IconComponent className="w-5 h-5 text-primary" /> : null;
                    })()}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${activity.unread ? "text-text font-semibold" : "text-text"}`}>
                      {activity.action}
                    </p>
                    <p className="text-xs text-text-muted">{activity.time}</p>
                  </div>
                  {activity.unread && (
                    <span className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </Link>
              ))
            )}
          </Card.Content>
        </Card>
      </motion.div>
    </div>
  );
}

export default Dashboard;
