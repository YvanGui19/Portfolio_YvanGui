import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiUser, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import profileService from "../../services/profileService";

const emptyProfile = {
  firstName: "",
  lastName: "",
  heroTitle: "",
  heroBio: "",
  bioParagraphs: [""],
  email: "",
  location: "",
  linkedinUrl: "",
  githubUrl: "",
  neofetch: {
    os: "",
    host: "",
    kernel: "",
    shell: "",
    terminal: "",
    cpu: "",
    memory: "",
  },
};

function FieldLabel({ children }) {
  return (
    <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase mb-2">
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-cyan/50 focus:outline-none transition-colors"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-cyan/50 focus:outline-none transition-colors resize-y"
    />
  );
}

function Section({ tag, title, children }) {
  return (
    <div className="border border-white/10 bg-black/20 p-6 mb-6">
      <div className="font-mono text-[0.7rem] text-cyan/60 tracking-[0.2em] mb-2">
        // {tag}
      </div>
      <h2 className="font-mono text-[0.9rem] text-off-white tracking-wide uppercase mb-5">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let cancelled = false;
    profileService
      .get()
      .then((res) => {
        if (cancelled) return;
        const data = res?.data || res;
        setProfile({
          ...emptyProfile,
          ...data,
          bioParagraphs:
            data?.bioParagraphs?.length > 0 ? data.bioParagraphs : [""],
          neofetch: { ...emptyProfile.neofetch, ...(data?.neofetch || {}) },
        });
      })
      .catch(() => setStatus("load-error"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const update = (field) => (e) =>
    setProfile((p) => ({ ...p, [field]: e.target.value }));

  const updateNeofetch = (field) => (e) =>
    setProfile((p) => ({
      ...p,
      neofetch: { ...p.neofetch, [field]: e.target.value },
    }));

  const updateParagraph = (i) => (e) =>
    setProfile((p) => {
      const next = [...p.bioParagraphs];
      next[i] = e.target.value;
      return { ...p, bioParagraphs: next };
    });

  const addParagraph = () =>
    setProfile((p) => ({ ...p, bioParagraphs: [...p.bioParagraphs, ""] }));

  const removeParagraph = (i) =>
    setProfile((p) => ({
      ...p,
      bioParagraphs: p.bioParagraphs.filter((_, idx) => idx !== i),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const cleaned = {
        ...profile,
        bioParagraphs: profile.bioParagraphs
          .map((p) => p.trim())
          .filter(Boolean),
      };
      await profileService.update(cleaned);
      setStatus("success");
      setTimeout(() => setStatus(null), 3000);
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-mono text-[0.8rem] text-grey">Chargement...</p>
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
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.25em] uppercase mb-2">
          // PROFILE
        </div>
        <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold text-off-white tracking-wide">
          Profil &amp; informations du site
        </h1>
        <p className="font-mono text-[0.8rem] text-grey mt-1">
          &gt; Centralise toutes les infos affichées sur la page d&apos;accueil, À propos, Contact, le footer et le terminal CLI.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <Section tag="HERO" title="Accueil — bandeau principal">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel>Prénom (affiché en blanc)</FieldLabel>
              <TextInput
                value={profile.firstName}
                onChange={update("firstName")}
                placeholder="YVAN"
              />
            </div>
            <div>
              <FieldLabel>Nom (affiché en lime)</FieldLabel>
              <TextInput
                value={profile.lastName}
                onChange={update("lastName")}
                placeholder="GUI"
              />
            </div>
          </div>
          <div>
            <FieldLabel>Titre / rôle</FieldLabel>
            <TextInput
              value={profile.heroTitle}
              onChange={update("heroTitle")}
              placeholder="Développeur Web Full Stack"
            />
          </div>
          <div>
            <FieldLabel>Pitch court (carte lime)</FieldLabel>
            <TextArea
              value={profile.heroBio}
              onChange={update("heroBio")}
              placeholder="Court paragraphe d'accroche…"
              rows={3}
            />
          </div>
        </Section>

        <Section tag="BIO" title="À propos — biographie longue">
          <div className="space-y-3">
            {profile.bioParagraphs.map((para, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="font-mono text-[0.65rem] text-grey/50 mt-3 w-6 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <TextArea
                    value={para}
                    onChange={updateParagraph(i)}
                    placeholder={`Paragraphe ${i + 1}`}
                    rows={3}
                  />
                </div>
                {profile.bioParagraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(i)}
                    className="px-2 py-2 font-mono text-[0.7rem] text-red/70 border border-red/30 hover:bg-red/10 transition-colors cursor-pointer mt-1"
                    title="Supprimer ce paragraphe"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addParagraph}
              className="px-4 py-2 font-mono text-[0.7rem] border border-cyan/30 text-cyan hover:bg-cyan/10 tracking-wider uppercase transition-colors cursor-pointer"
            >
              + Ajouter un paragraphe
            </button>
          </div>
        </Section>

        <Section tag="CONTACT" title="Contact — email & localisation">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel>Email</FieldLabel>
              <TextInput
                value={profile.email}
                onChange={update("email")}
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <FieldLabel>Localisation</FieldLabel>
              <TextInput
                value={profile.location}
                onChange={update("location")}
                placeholder="Toulouse, France"
              />
            </div>
          </div>
        </Section>

        <Section tag="SOCIALS" title="Réseaux — footer & CLI">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel>URL LinkedIn</FieldLabel>
              <TextInput
                value={profile.linkedinUrl}
                onChange={update("linkedinUrl")}
                placeholder="https://www.linkedin.com/in/…"
              />
            </div>
            <div>
              <FieldLabel>URL GitHub</FieldLabel>
              <TextInput
                value={profile.githubUrl}
                onChange={update("githubUrl")}
                placeholder="https://github.com/…"
              />
            </div>
          </div>
        </Section>

        <Section tag="NEOFETCH" title="CLI — commande neofetch">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel>OS</FieldLabel>
              <TextInput
                value={profile.neofetch.os}
                onChange={updateNeofetch("os")}
              />
            </div>
            <div>
              <FieldLabel>Host</FieldLabel>
              <TextInput
                value={profile.neofetch.host}
                onChange={updateNeofetch("host")}
              />
            </div>
            <div>
              <FieldLabel>Kernel</FieldLabel>
              <TextInput
                value={profile.neofetch.kernel}
                onChange={updateNeofetch("kernel")}
              />
            </div>
            <div>
              <FieldLabel>Shell</FieldLabel>
              <TextInput
                value={profile.neofetch.shell}
                onChange={updateNeofetch("shell")}
              />
            </div>
            <div>
              <FieldLabel>Terminal</FieldLabel>
              <TextInput
                value={profile.neofetch.terminal}
                onChange={updateNeofetch("terminal")}
              />
            </div>
            <div>
              <FieldLabel>CPU</FieldLabel>
              <TextInput
                value={profile.neofetch.cpu}
                onChange={updateNeofetch("cpu")}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Memory</FieldLabel>
              <TextInput
                value={profile.neofetch.memory}
                onChange={updateNeofetch("memory")}
              />
            </div>
          </div>
        </Section>

        <div className="flex items-center gap-4 sticky bottom-0 bg-dark-navy/80 backdrop-blur-md py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 border-t border-white/10">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 font-mono text-[0.8rem] bg-cyan text-dark-navy font-semibold tracking-wider uppercase hover:bg-cyan/90 disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-2"
          >
            <HiUser className="w-4 h-4" />
            {saving ? "Sauvegarde…" : "Enregistrer le profil"}
          </button>

          {status === "success" && (
            <span className="flex items-center gap-2 font-mono text-[0.8rem] text-lime">
              <HiCheckCircle className="w-4 h-4" />
              Profil mis à jour
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-2 font-mono text-[0.8rem] text-red">
              <HiExclamationCircle className="w-4 h-4" />
              Erreur lors de la sauvegarde
            </span>
          )}
          {status === "load-error" && (
            <span className="flex items-center gap-2 font-mono text-[0.8rem] text-red">
              <HiExclamationCircle className="w-4 h-4" />
              Impossible de charger le profil
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
