import { Helmet } from 'react-helmet-async'
import Button from '../../components/common/Button'

function NotFound() {
  return (
    <div className="pt-24 px-4 text-center">
      <Helmet>
        <title>Page non trouvée | Yvan Gui</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-text-muted mt-4 mb-8">Page non trouvée</p>
      <Button to="/">Retour à l&apos;accueil</Button>
    </div>
  )
}

export default NotFound
