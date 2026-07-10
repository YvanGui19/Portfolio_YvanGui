import { Helmet } from 'react-helmet-async'
import HeroMarathon from '../../components/home/HeroMarathon'
import FeaturedProjects from '../../components/home/FeaturedProjects'
import Skills from '../../components/home/Skills'

function Home() {
  return (
    <>
      <Helmet>
        <title>Yvan Gui | Infrastructure & Sécurité - Étudiant Mastère ERIS</title>
        <meta name="description" content="Portfolio de Yvan Gui, en reconversion vers l'infrastructure et la cybersécurité (Mastère ERIS, ORT France). VPS souverain en production : hardening Linux, VPN Headscale, Docker, CI/CD. Parcours antérieur en aéronautique civile et militaire." />
        <meta property="og:title" content="Yvan Gui | Infrastructure & Sécurité" />
        <meta property="og:description" content="Portfolio d'un professionnel en reconversion vers l'infrastructure et la cybersécurité. Ex-aéronautique/défense, Mastère ERIS, VPS souverain en production." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yvangui.fr/" />
        <meta property="og:site_name" content="Yvan Gui - Portfolio" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Yvan Gui | Infrastructure & Sécurité" />
        <meta name="twitter:description" content="Portfolio d'un professionnel en reconversion vers l'infrastructure et la cybersécurité. Ex-aéronautique/défense, Mastère ERIS." />
        <link rel="canonical" href="https://yvangui.fr/" />
      </Helmet>

      <HeroMarathon />
      <Skills />
      <FeaturedProjects />
    </>
  )
}

export default Home
