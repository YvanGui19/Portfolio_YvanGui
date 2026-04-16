import { Helmet } from 'react-helmet-async'
import HeroMarathon from '../../components/home/HeroMarathon'
import FeaturedProjects from '../../components/home/FeaturedProjects'
import Skills from '../../components/home/Skills'

function Home() {
  return (
    <>
      <Helmet>
        <title>Yvan Gui | Développeur Web Full Stack</title>
        <meta name="description" content="Portfolio de Yvan Gui, développeur web full stack basé à Toulouse. Création de sites web et applications modernes avec React, Node.js et MongoDB." />
        <meta property="og:title" content="Yvan Gui | Développeur Web Full Stack" />
        <meta property="og:description" content="Portfolio de Yvan Gui, développeur web full stack basé à Toulouse. Création de sites web et applications modernes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio-yvan-gui.vercel.app/" />
        <meta property="og:image" content="https://res.cloudinary.com/dox09mso9/image/upload/v1768128857/portfolio/projects/ve8qft3jnbzz1bonocvv.webp" />
        <meta property="og:site_name" content="Yvan Gui - Portfolio" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yvan Gui | Développeur Web Full Stack" />
        <meta name="twitter:description" content="Portfolio de Yvan Gui, développeur web full stack basé à Toulouse." />
        <link rel="canonical" href="https://portfolio-yvan-gui.vercel.app/" />
      </Helmet>

      <HeroMarathon />

      <Skills />

      <FeaturedProjects />
    </>
  )
}

export default Home
