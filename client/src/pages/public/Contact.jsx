import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import contactService from "../../services/contactService";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
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
  }, [formData, validateForm]);

  return (
    <div className="pt-24 pb-20">
      <Helmet>
        <title>Contact | Yvan Gui - Développeur Web</title>
        <meta name="description" content="Contactez Yvan Gui pour vos projets de développement web. Disponible pour des missions freelance à Toulouse et en remote." />
        <meta property="og:title" content="Contact | Yvan Gui - Développeur Web" />
        <meta property="og:description" content="Contactez Yvan Gui pour vos projets de développement web." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio-yvan-gui.vercel.app/contact" />
        <meta property="og:image" content="https://res.cloudinary.com/dox09mso9/image/upload/v1768128857/portfolio/projects/ve8qft3jnbzz1bonocvv.webp" />
        <meta property="og:site_name" content="Yvan Gui - Portfolio" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact | Yvan Gui" />
        <meta name="twitter:description" content="Contactez Yvan Gui pour vos projets de développement web." />
        <link rel="canonical" href="https://portfolio-yvan-gui.vercel.app/contact" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Me <span className="text-primary">Contacter</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Vous avez un projet en tête ? N&apos;hésitez pas à me contacter !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  error={errors.name}
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  error={errors.email}
                />

                <Input
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet..."
                  error={errors.message}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>

                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-primary text-center bg-primary/10 p-4 rounded-lg"
                  >
                    Message envoyé avec succès !
                  </motion.p>
                )}

                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-danger text-center bg-danger/10 p-4 rounded-lg"
                  >
                    Une erreur est survenue. Veuillez réessayer.
                  </motion.p>
                )}
              </form>
            </Card>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/*<div>
              <h2 className="text-2xl font-bold mb-6">
                Restons en <span className="text-primary">Contact</span>
              </h2>
              <p className="text-text-light mb-8">
                Je suis disponible pour des missions freelance, des
                collaborations ou simplement pour échanger sur vos projets.
              </p>
            </div>*/}

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <HiMail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Email</p>
                  <p className="font-medium">yvan.gui19@gmail.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center outline-style border-primary">
                  <HiLocationMarker className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Localisation</p>
                  <p className="font-medium">Toulouse, France</p>
                </div>
              </div>
            </Card>

            <div className="flex p-6 justify-center">
              <Button variant="outline" href="/CV_GUIHÉNEUF_YVAN_DEV_WEB.pdf">
                Télécharger mon CV
              </Button>
            </div>

            {/*<Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💼</span>
                </div>
                <div>
                  <p className="text-text-muted text-sm">Disponibilité</p>
                  <p className="font-medium text-text">
                    Disponible pour missions
                  </p>
                </div>
              </div>
            </Card>*/}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
