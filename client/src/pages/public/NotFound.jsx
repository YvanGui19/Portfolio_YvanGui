import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black">
      <Helmet>
        <title>404 - Page non trouvee | Yvan Gui</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Error label */}
      <span className="text-editorial-label text-[#FF3030] mb-8">
        PAGE NOT FOUND
      </span>

      {/* Giant 404 */}
      <h1 className="text-editorial-giant text-white mb-8">
        404
      </h1>

      {/* Description */}
      <p className="text-[#f0f0ec] text-lg max-w-md mb-4">
        La page demandee n&apos;existe pas ou a ete deplacee.
      </p>
      <p className="text-[#f0f0ec] text-base italic mb-12">
        The requested page doesn&apos;t exist or has been moved.
      </p>

      {/* Return button */}
      <Link
        to="/"
        className="group inline-flex items-center gap-3 text-editorial-label text-[#C2FE0B] border-b-2 border-[#C2FE0B] pb-2 hover:text-white hover:border-white transition-colors"
      >
        <span>←</span>
        <span>RETOUR ACCUEIL</span>
      </Link>
    </div>
  );
}

export default NotFound;
