import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HiFolder, HiLightningBolt, HiMail, HiBriefcase, HiMailOpen } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
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

const statColors = {
  projects: "lime",
  skills: "violet",
  messages: "cyan",
  experiences: "orange",
};

// Classes explicites pour éviter les problèmes de génération Tailwind JIT
const colorClasses = {
  lime: {
    text: "text-lime",
    text60: "text-lime/60",
    text70: "text-lime/70",
    border30: "border-lime/30",
    border40: "border-lime/40",
    border60: "border-lime/60",
    hoverBorder40: "hover:border-lime/40",
    hoverBg5: "hover:bg-lime/5",
    groupHoverBorder60: "group-hover:border-lime/60",
  },
  violet: {
    text: "text-violet",
    text60: "text-violet/60",
    text70: "text-violet/70",
    border30: "border-violet/30",
    border40: "border-violet/40",
    border60: "border-violet/60",
    hoverBorder40: "hover:border-violet/40",
    hoverBg5: "hover:bg-violet/5",
    groupHoverBorder60: "group-hover:border-violet/60",
  },
  cyan: {
    text: "text-cyan",
    text60: "text-cyan/60",
    text70: "text-cyan/70",
    border30: "border-cyan/30",
    border40: "border-cyan/40",
    border60: "border-cyan/60",
    hoverBorder40: "hover:border-cyan/40",
    hoverBg5: "hover:bg-cyan/5",
    groupHoverBorder60: "group-hover:border-cyan/60",
  },
  orange: {
    text: "text-orange",
    text60: "text-orange/60",
    text70: "text-orange/70",
    border30: "border-orange/30",
    border40: "border-orange/40",
    border60: "border-orange/60",
    hoverBorder40: "hover:border-orange/40",
    hoverBg5: "hover:bg-orange/5",
    groupHoverBorder60: "group-hover:border-orange/60",
  },
};

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: "Projets", value: "-", iconKey: "projects", trend: "Chargement...", to: "/admin/projects", code: "PRJ" },
    { label: "Compétences", value: "-", iconKey: "skills", trend: "Chargement...", to: "/admin/skills", code: "SKL" },
    { label: "Messages", value: "-", subValue: "-", iconKey: "messages", trend: "Chargement...", to: "/admin/messages", code: "MSG" },
    { label: "Expériences", value: "-", iconKey: "experiences", trend: "Chargement...", to: "/admin/experiences", code: "EXP" },
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
          trend: `${featuredCount} featured`,
          to: "/admin/projects",
          code: "PRJ",
        },
        {
          label: "Compétences",
          value: skillsList.length.toString(),
          iconKey: "skills",
          trend: "all_categories",
          to: "/admin/skills",
          code: "SKL",
        },
        {
          label: "Messages",
          value: unreadCount.toString(),
          subValue: messagesList.length.toString(),
          iconKey: "messages",
          trend: "non lus",
          to: "/admin/messages",
          code: "MSG",
        },
        {
          label: "Expériences",
          value: experiencesList.length.toString(),
          iconKey: "experiences",
          trend: "up_to_date",
          to: "/admin/experiences",
          code: "EXP",
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

    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return "hier";
    return `${days}j`;
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        {/* Tag */}
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.25em] uppercase mb-3">
          // DASHBOARD
        </div>

        {/* Title */}
        <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-wide mb-2">
          <span className="text-off-white">Bienvenue,</span>{" "}
          <span className="text-cyan">{user?.name || "Admin"}</span>
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-[0.8rem] text-grey">
          &gt; Aperçu de votre portfolio
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const color = statColors[stat.iconKey];
          const classes = colorClasses[color];
          const IconComponent = iconMap[stat.iconKey];

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => navigate(stat.to)}
              className={`group relative border border-white/10 bg-black/20 p-5 cursor-pointer transition-all duration-300 ${classes.hoverBorder40} ${classes.hoverBg5}`}
            >
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r ${classes.border30} transition-colors ${classes.groupHoverBorder60}`} />

              {/* Code tag */}
              <div className={`font-mono text-[0.6rem] ${classes.text60} tracking-[0.2em] mb-3`}>
                [{stat.code}]
              </div>

              {/* Icon and value row */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className={`font-display text-3xl font-bold ${classes.text}`}>
                    {loading ? "..." : stat.value}
                  </span>
                  {stat.subValue && (
                    <span className="font-mono text-[0.75rem] text-grey ml-1">
                      /{stat.subValue}
                    </span>
                  )}
                </div>
                {IconComponent && <IconComponent className={`w-6 h-6 ${classes.text}`} />}
              </div>

              {/* Label and Trend */}
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.8rem] text-off-white">{stat.label}</p>
                <p className={`font-mono text-[0.65rem] ${classes.text70}`}>
                  // {stat.trend}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-mono text-[0.8rem] text-off-white tracking-wide uppercase">
            Actions rapides
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/projects/new"
            className="px-4 py-2.5 font-mono text-[0.75rem] bg-lime text-dark-navy font-semibold tracking-wider uppercase hover:bg-lime/90 transition-colors"
          >
            + Nouveau projet
          </Link>
          <Link
            to="/admin/messages"
            className="px-4 py-2.5 font-mono text-[0.75rem] border border-cyan/30 text-cyan tracking-wider uppercase hover:bg-cyan/10 transition-colors"
          >
            Voir les messages
          </Link>
          <Link
            to="/admin/skills"
            className="px-4 py-2.5 font-mono text-[0.75rem] border border-violet/30 text-violet tracking-wider uppercase hover:bg-violet/10 transition-colors"
          >
            Gérer compétences
          </Link>
        </div>
      </motion.div>

      {/* Messages récents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="border border-white/10 bg-black/20">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <HiMail className="w-4 h-4 text-cyan" />
              <h2 className="font-mono text-[0.8rem] text-off-white tracking-wide uppercase">
                Messages récents
              </h2>
            </div>
            <Link
              to="/admin/messages"
              className="font-mono text-[0.7rem] text-cyan hover:text-cyan/80 transition-colors"
            >
              Tout voir →
            </Link>
          </div>

          {/* Content */}
          <div>
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="font-mono text-[0.75rem] text-grey">Chargement...</p>
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-[0.8rem] text-grey">// Aucun message</p>
              </div>
            ) : (
              recentMessages.map((activity, index) => {
                const IconComponent = iconMap[activity.iconKey];

                return (
                  <Link
                    key={activity.id || index}
                    to={`/admin/messages?id=${activity.id}`}
                    className={`flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-cyan/5 transition-colors ${
                      activity.unread ? "border-l-2 border-l-cyan bg-cyan/5" : ""
                    }`}
                  >
                    <div className={`w-9 h-9 border ${activity.unread ? "border-cyan/40 bg-cyan/10" : "border-white/10 bg-white/5"} flex items-center justify-center`}>
                      {IconComponent && <IconComponent className={`w-4 h-4 ${activity.unread ? "text-cyan" : "text-grey"}`} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-mono text-[0.8rem] truncate ${activity.unread ? "text-off-white font-medium" : "text-grey"}`}>
                        {activity.action}
                      </p>
                      <p className="font-mono text-[0.65rem] text-grey/60">
                        {activity.time}
                      </p>
                    </div>
                    {activity.unread && (
                      <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
