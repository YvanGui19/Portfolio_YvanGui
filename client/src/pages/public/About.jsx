import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import skillService from "../../services/skillService";
import experienceService from "../../services/experienceService";
import useFetch from "../../hooks/useFetch";
import { SymbolPortrait } from "../../components/canvas";

function About() {
  const { data: skills, loading: loadingSkills } = useFetch(() => skillService.getAll());
  const { data: experiences, loading: loadingExp } = useFetch(() => experienceService.getAll());
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);

  const professionalExperiences = useMemo(
    () => experiences?.filter((exp) => exp.type === "experience") || [],
    [experiences]
  );

  const educationExperiences = useMemo(
    () => experiences?.filter((exp) => exp.type === "education") || [],
    [experiences]
  );

  const skillsByCategory = useMemo(
    () =>
      skills?.reduce((acc, skill) => {
        const category = skill.category || "Autres";
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
      }, {}) || {},
    [skills]
  );

  return (
    <div className="pt-20 pb-24 min-h-screen relative">
      <Helmet>
        <title>À propos | Yvan Gui</title>
        <meta name="description" content="Découvrez le parcours de Yvan Gui, développeur web full stack." />
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-16 sm:mb-24 pt-8">
          <h1 className="text-editorial-display text-white">
            À PROPOS
          </h1>
        </div>

        {/* Bio Section */}
        <div className="mb-20 sm:mb-28">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-center">
            {/* Bio text */}
            <div className="border-l-2 border-[#C2FE0B] pl-6 sm:pl-8 order-2 lg:order-1">
              <p className="text-[#f0f0ec] text-lg sm:text-xl leading-relaxed mb-6">
                Passionné par la technologie depuis toujours, j&apos;ai d&apos;abord construit ma carrière
                dans l&apos;aéronautique. Pendant plus de dix ans, j&apos;ai travaillé sur des hélicoptères
                et des avions.
              </p>
              <p className="text-[#d0d0cc] text-lg leading-relaxed mb-6">
                Ces expériences m&apos;ont appris la précision, la rigueur et la fiabilité opérationnelle
                dans des environnements exigeants.
              </p>
              <p className="text-[#d0d0cc] text-lg leading-relaxed">
                Aujourd&apos;hui, je conçois des solutions web fiables et orientées utilisateur, avec la
                même rigueur qui m&apos;a guidé dans l&apos;aéronautique.
              </p>
            </div>

            {/* Portrait */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <SymbolPortrait
                src="/images/profile.png"
                width={300}
                height={300}
                gridStep={3}
              />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20 sm:mb-28">
          <h2 className="text-editorial-medium text-white mb-12">
            PARCOURS
          </h2>

          {loadingExp ? (
            <span className="text-editorial-label text-[#f0f0ec]">CHARGEMENT...</span>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
              {/* Experiences */}
              <div>
                <h3 className="font-heading text-[24px] text-[#C2FE0B] mb-8 uppercase">
                  EXPÉRIENCES
                </h3>
                <div className="space-y-6">
                  {(showAllExperiences ? professionalExperiences : professionalExperiences.slice(0, 3)).map((exp, i) => (
                    <div
                      key={exp._id}
                      className="border-l border-white/10 pl-6 hover:border-[#C2FE0B] transition-colors"
                    >
                      <span className="text-micro text-[#f0f0ec]">0{i + 1}</span>
                      <div className="flex justify-between items-start mt-1 mb-2">
                        <h4 className="text-white font-medium text-base">{exp.title}</h4>
                        <span className="text-editorial-label text-[#C2FE0B]">
                          {exp.startDate && new Date(exp.startDate).getFullYear()}
                          {exp.endDate ? ` - ${new Date(exp.endDate).getFullYear()}` : " - PRÉSENT"}
                        </span>
                      </div>
                      <p className="text-[#f0f0ec] text-sm">{exp.company}</p>
                    </div>
                  ))}
                </div>
                {professionalExperiences.length > 3 && (
                  <div className="text-right mt-6">
                    <button
                      onClick={() => setShowAllExperiences(!showAllExperiences)}
                      className="px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border border-[#C2FE0B] text-[#C2FE0B] hover:bg-[#C2FE0B] hover:text-[#080906] transition-all cursor-pointer"
                      aria-expanded={showAllExperiences}
                      aria-label={showAllExperiences ? "Réduire la liste des expériences" : "Voir toutes les expériences"}
                    >
                      {showAllExperiences ? "RÉDUIRE" : "VOIR PLUS"}
                    </button>
                  </div>
                )}
              </div>

              {/* Formations */}
              <div>
                <h3 className="font-heading text-[24px] text-[#c8f000] mb-8 uppercase">
                  FORMATIONS
                </h3>
                <div className="space-y-6">
                  {(showAllEducation ? educationExperiences : educationExperiences.slice(0, 3)).map((exp, i) => (
                    <div
                      key={exp._id}
                      className="border-l border-white/10 pl-6 hover:border-[#c8f000] transition-colors"
                    >
                      <span className="text-micro text-[#f0f0ec]">0{i + 1}</span>
                      <div className="flex justify-between items-start mt-1 mb-2">
                        <h4 className="text-white font-medium text-base">{exp.title}</h4>
                        <span className="text-editorial-label text-[#c8f000]">
                          {exp.startDate && new Date(exp.startDate).getFullYear()}
                          {exp.endDate ? ` - ${new Date(exp.endDate).getFullYear()}` : " - PRÉSENT"}
                        </span>
                      </div>
                      <p className="text-[#f0f0ec] text-sm">{exp.company}</p>
                    </div>
                  ))}
                </div>
                {educationExperiences.length > 3 && (
                  <div className="text-right mt-6">
                    <button
                      onClick={() => setShowAllEducation(!showAllEducation)}
                      className="px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border border-[#c8f000] text-[#c8f000] hover:bg-[#c8f000] hover:text-[#080906] transition-all cursor-pointer"
                      aria-expanded={showAllEducation}
                      aria-label={showAllEducation ? "Réduire la liste des formations" : "Voir toutes les formations"}
                    >
                      {showAllEducation ? "RÉDUIRE" : "VOIR PLUS"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-editorial-medium text-white mb-12">
            COMPÉTENCES
          </h2>

          {loadingSkills ? (
            <span className="text-editorial-label text-[#f0f0ec]">CHARGEMENT...</span>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
                <div key={category} className="border-l-2 border-[#C2FE0B] pl-6">
                  <span className="text-micro text-[#f0f0ec]">0{index + 1}</span>
                  <h3 className="font-heading text-[20px] text-white mt-1 mb-4 uppercase">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {categorySkills.map((skill) => (
                      <li key={skill._id} className="text-[#d0d0cc] text-base">
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="pt-16 text-center">
          <Link
            to="/projects"
            className="inline-block bg-[#c8f000] text-[#080906] px-10 py-5 font-bold text-xl uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
            style={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
            }}
          >
            VOIR MES PROJETS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
