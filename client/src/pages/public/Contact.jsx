import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import contactService from "../../services/contactService";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";
    else if (formData.message.trim().length < 10) newErrors.message = "Message trop court";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        await contactService.send(formData);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } catch {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  return (
    <div className="pt-20 pb-24 min-h-screen relative">
      <Helmet>
        <title>Contact | Yvan Gui</title>
        <meta name="description" content="Contactez Yvan Gui pour vos projets de développement web." />
      </Helmet>

      <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
        {/* Header avec artefacts Marathon */}
        <div className="mb-14 sm:mb-20 pt-8 relative">
          {/* Artefacts décoratifs */}
          <div className="marathon-diagonal-stripes-cyan absolute -left-4 top-0 w-2 h-24 opacity-60" />
          <div className="marathon-grid marathon-grid-cyan absolute -right-4 top-4 w-16 h-16 opacity-30" />

          {/* Numéro de section */}
          <span className="font-mono text-[10px] tracking-[0.3em] text-cyan/60 block mb-2">
            [ 03 / CONNEXION ]
          </span>

          <h1 className="text-editorial-display text-white">
            CONTACT
          </h1>

          {/* Ligne décorative */}
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[2px] w-16 bg-cyan" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#f0f0ec]/40 uppercase">
              Travaillons ensemble
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Info Panel - Style terminal Marathon */}
          <div className="lg:col-span-2">
            <div className="relative border border-cyan/20 bg-[#0A0E1A]/60 p-6">
              {/* Coins décoratifs */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-cyan" />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-cyan" />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-cyan" />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-cyan" />

              {/* Header terminal */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan/20">
                <span className="font-mono text-[10px] tracking-[0.2em] text-cyan/80 uppercase">
                  contact.info
                </span>
              </div>

              <div className="border-l-2 border-cyan pl-6 space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <HiMail className="w-5 h-5 text-cyan mt-0.5 group-hover:animate-pulse" />
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec]/60 block mb-1 uppercase">EMAIL</span>
                    <span className="text-white text-sm font-mono">yvan.gui19@gmail.com</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <HiLocationMarker className="w-5 h-5 text-cyan mt-0.5 group-hover:animate-pulse" />
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec]/60 block mb-1 uppercase">LOCALISATION</span>
                    <span className="text-white text-sm font-mono">Toulouse, France</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-lime" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec]/60 block mb-1 uppercase">STATUS</span>
                    <span className="text-lime text-sm font-mono">Disponible</span>
                  </div>
                </div>
              </div>

              {/* Artefact data strip */}
              <div className="marathon-data-strip absolute -right-2 top-1/4 h-24 w-1 opacity-40" />
            </div>
          </div>

          {/* Form - Style terminal Marathon */}
          <div className="lg:col-span-3">
            <div className="relative border border-lime/20 bg-[#0A0E1A]/60 p-6 sm:p-8">
              {/* Coins décoratifs */}
              <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-lime" />
              <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-lime" />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-lime" />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-lime" />

              {/* Header terminal */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-lime/20">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-lime/80 uppercase">
                  message.new
                </span>
                <div className="flex-1" />
                <span className="font-mono text-[9px] text-[#f0f0ec]/40">
                  ▸ TRANSMISSION
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-lime/80 mb-3 uppercase">
                    <span className="text-lime">▸</span> NOM
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full bg-[#0A0E1A] border border-lime/20 text-white py-3 px-4 focus:border-cyan focus:shadow-[0_0_15px_rgba(1,255,255,0.2)] focus:outline-none transition-all placeholder:text-[#f0f0ec]/30 font-mono text-sm"
                  />
                  {errors.name && (
                    <p className="text-[#FF3030] text-xs mt-2 font-mono" role="alert" aria-live="polite">⚠ {errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-lime/80 mb-3 uppercase">
                    <span className="text-lime">▸</span> EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email"
                    className="w-full bg-[#0A0E1A] border border-lime/20 text-white py-3 px-4 focus:border-cyan focus:shadow-[0_0_15px_rgba(1,255,255,0.2)] focus:outline-none transition-all placeholder:text-[#f0f0ec]/30 font-mono text-sm"
                  />
                  {errors.email && (
                    <p className="text-[#FF3030] text-xs mt-2 font-mono" role="alert" aria-live="polite">⚠ {errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-lime/80 mb-3 uppercase">
                    <span className="text-lime">▸</span> MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Votre message..."
                    className="w-full bg-[#0A0E1A] border border-lime/20 text-white py-3 px-4 focus:border-cyan focus:shadow-[0_0_15px_rgba(1,255,255,0.2)] focus:outline-none transition-all resize-none placeholder:text-[#f0f0ec]/30 font-mono text-sm"
                  />
                  {errors.message && (
                    <p className="text-[#FF3030] text-xs mt-2 font-mono" role="alert" aria-live="polite">⚠ {errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-5 bg-lime text-[#0A0E1A] font-bold text-xl uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(194,254,11,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer group overflow-hidden"
                  style={{
                    fontFamily: '"Big Shoulders Display", sans-serif',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                  }}
                >
                  <span className="relative z-10">{isSubmitting ? "TRANSMISSION..." : "ENVOYER"}</span>
                  {/* Effet glitch au hover */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-100" />
                </button>

                {submitStatus === "success" && (
                  <div className="flex items-center justify-center gap-2 py-3 border border-lime/40 bg-lime/10">
                    <div className="w-2 h-2 rounded-full bg-lime" />
                    <p className="text-lime text-sm font-mono uppercase tracking-wider">
                      Transmission réussie
                    </p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="flex items-center justify-center gap-2 py-3 border border-[#FF3030]/40 bg-[#FF3030]/10">
                    <span className="text-[#FF3030]">⚠</span>
                    <p className="text-[#FF3030] text-sm font-mono uppercase tracking-wider">
                      Erreur de transmission
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
