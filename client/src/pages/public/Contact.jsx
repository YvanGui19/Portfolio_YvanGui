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
        {/* Header */}
        <div className="mb-14 sm:mb-20 pt-8">
          <h1 className="text-editorial-display text-white">
            CONTACT
          </h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Info Panel */}
          <div className="lg:col-span-2">
            <div className="border-l-2 border-[#c8f000] pl-6">
              {/* Email */}
              <div className="mb-8 flex items-start gap-4">
                <HiMail className="w-5 h-5 text-[#c8f000] mt-0.5" />
                <div>
                  <span className="text-editorial-label text-[#f0f0ec] block mb-1">EMAIL</span>
                  <span className="text-white text-sm">yvan.gui19@gmail.com</span>
                </div>
              </div>

              {/* Location */}
              <div className="mb-8 flex items-start gap-4">
                <HiLocationMarker className="w-5 h-5 text-[#c8f000] mt-0.5" />
                <div>
                  <span className="text-editorial-label text-[#f0f0ec] block mb-1">LOCALISATION</span>
                  <span className="text-white text-sm">Toulouse, France</span>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-mono tracking-widest text-[#f0f0ec] block mb-2">
                  NOM
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full bg-transparent border-b border-white/20 text-white py-3 focus:border-[#c8f000] focus:outline-none transition-colors placeholder:text-[#d0d0cc]"
                />
                {errors.name && (
                  <p className="text-[#FF3030] text-xs mt-2" role="alert" aria-live="polite">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-mono tracking-widest text-[#f0f0ec] block mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  className="w-full bg-transparent border-b border-white/20 text-white py-3 focus:border-[#c8f000] focus:outline-none transition-colors placeholder:text-[#d0d0cc]"
                />
                {errors.email && (
                  <p className="text-[#FF3030] text-xs mt-2" role="alert" aria-live="polite">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-mono tracking-widest text-[#f0f0ec] block mb-2">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Votre message..."
                  className="w-full bg-transparent border-b border-white/20 text-white py-3 focus:border-[#c8f000] focus:outline-none transition-colors resize-none placeholder:text-[#d0d0cc]"
                />
                {errors.message && (
                  <p className="text-[#FF3030] text-xs mt-2" role="alert" aria-live="polite">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#c8f000] text-[#080906] font-bold text-xl uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,240,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer"
                style={{
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER"}
              </button>

              {submitStatus === "success" && (
                <p className="text-[#c8f000] text-center text-sm">
                  MESSAGE ENVOYÉ AVEC SUCCÈS
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-[#FF3030] text-center text-sm">
                  ERREUR - VEUILLEZ RÉESSAYER
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
