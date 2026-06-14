import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import skillService from "../../services/skillService";
import experienceService from "../../services/experienceService";
import profileService from "../../services/profileService";
import useFetch from "../../hooks/useFetch";
import { SymbolPortrait } from "../../components/canvas";

function About() {
  const { data: skills, loading: loadingSkills } = useFetch(() => skillService.getAll());
  const { data: experiences, loading: loadingExp } = useFetch(() => experienceService.getAll());
  const { data: profile } = useFetch(() => profileService.get());
  const bioParagraphs = profile?.bioParagraphs?.length ? profile.bioParagraphs : [];
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

  const SKILLS_PRIORITY = [
    "Sécurité",
    "Systèmes & Réseaux",
    "DevOps",
    "Bases & Web",
    "Frontend",
    "Backend",
    "Tools",
    "Other",
  ];

  const orderedSkillsByCategory = useMemo(() => {
    const grouped =
      skills?.reduce((acc, skill) => {
        const category = skill.category || "Autres";
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
      }, {}) || {};
    const known = SKILLS_PRIORITY.filter((c) => grouped[c]);
    const unknown = Object.keys(grouped)
      .filter((c) => !SKILLS_PRIORITY.includes(c))
      .sort((a, b) => a.localeCompare(b));
    return [...known, ...unknown].map((c) => [c, grouped[c]]);
  }, [skills]);

  return (
    <div className="pt-20 pb-24 min-h-screen relative">
      <Helmet>
        <title>À propos | Yvan Gui</title>
        <meta name="description" content="Découvrez le parcours de Yvan Gui, développeur web full stack." />
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-16 sm:mb-24 pt-8 relative">
          <h1 className="text-editorial-display text-white">
            À PROPOS
          </h1>
        </div>

        {/* Bio Section */}
        <div className="mb-20 sm:mb-28">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-center">
            {/* Bio text - Style terminal Marathon */}
            <div className="relative order-2 lg:order-1">
              {/* Container terminal */}
              <div className="relative bg-lime/10 backdrop-blur-md p-6 sm:p-8">
                {/* Coins décoratifs */}
                <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-lime" />
                <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-lime" />
                <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-lime" />
                <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-lime" />

                {/* Header terminal */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-lime/20">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-lime/80 uppercase">
                    bio.profile
                  </span>
                </div>

                <div className="border-l-2 border-lime pl-6">
                  {bioParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={`text-[#f0f0ec] text-lg sm:text-xl leading-relaxed ${
                        i < bioParagraphs.length - 1 ? "mb-6" : ""
                      }`}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Artefact data strip */}
                <div className="marathon-data-strip absolute -right-2 top-1/4 h-32 w-1 opacity-40" />
              </div>
            </div>

            {/* Portrait */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                {/* Cadre Marathon autour du portrait */}
                <div className="absolute -inset-3 border border-lime/20" />
                <div className="absolute -top-3 -left-3 w-4 h-4 border-t-2 border-l-2 border-lime" />
                <div className="absolute -top-3 -right-3 w-4 h-4 border-t-2 border-r-2 border-lime" />
                <div className="absolute -bottom-3 -left-3 w-4 h-4 border-b-2 border-l-2 border-lime" />
                <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b-2 border-r-2 border-lime" />
                <SymbolPortrait
                  src="/images/profile.png"
                  width={300}
                  height={300}
                  gridStep={3}
                  colorLight="#01FFFF"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-editorial-medium text-white">
              PARCOURS
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-lime to-transparent" />
          </div>

          {loadingExp ? (
            <span className="text-editorial-label text-[#f0f0ec]">CHARGEMENT...</span>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
              {/* Experiences */}
              <div>
                <h3 className="font-heading text-[24px] text-[#C2FE0B] mb-8 uppercase bg-lime/10 backdrop-blur-md px-4 py-2 inline-block">
                  EXPÉRIENCES
                </h3>
                <div className="space-y-6">
                  {(showAllExperiences ? professionalExperiences : professionalExperiences.slice(0, 3)).map((exp, i) => (
                    <div
                      key={exp._id}
                      className="bg-lime/10 backdrop-blur-md p-4 hover:bg-lime/20 transition-colors"
                    >
                      <span className="text-micro text-[#f0f0ec]">{String(professionalExperiences.length - i).padStart(2, "0")}</span>
                      <div className="flex justify-between items-start gap-3 mt-1 mb-2">
                        <h4 className="text-white font-medium text-base">{exp.title}</h4>
                        <span className="text-editorial-label text-[#C2FE0B] whitespace-nowrap">
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
                      className="px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase bg-cyan/10 backdrop-blur-md text-cyan hover:bg-cyan/30 transition-all cursor-pointer"
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
                <h3 className="font-heading text-[24px] text-[#C2FE0B] mb-8 uppercase bg-lime/10 backdrop-blur-md px-4 py-2 inline-block">
                  FORMATIONS
                </h3>
                <div className="space-y-6">
                  {(showAllEducation ? educationExperiences : educationExperiences.slice(0, 3)).map((exp, i) => (
                    <div
                      key={exp._id}
                      className="bg-lime/10 backdrop-blur-md p-4 hover:bg-lime/20 transition-colors"
                    >
                      <span className="text-micro text-[#f0f0ec]">{String(educationExperiences.length - i).padStart(2, "0")}</span>
                      <div className="flex justify-between items-start gap-3 mt-1 mb-2">
                        <h4 className="text-white font-medium text-base">{exp.title}</h4>
                        <span className="text-editorial-label text-[#C2FE0B] whitespace-nowrap">
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
                      className="px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase bg-cyan/10 backdrop-blur-md text-cyan hover:bg-cyan/30 transition-all cursor-pointer"
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
          <div className="flex items-center gap-4 mb-12">
            <div className="marathon-grid marathon-grid-lime w-8 h-8 opacity-60" />
            <h2 className="text-editorial-medium text-white">
              COMPÉTENCES
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-lime to-transparent" />
          </div>

          {loadingSkills ? (
            <span className="text-editorial-label text-[#f0f0ec]">CHARGEMENT...</span>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {orderedSkillsByCategory.map(([category, categorySkills]) => (
                <div key={category} className="bg-lime/10 backdrop-blur-md p-5">
                  <h3 className="font-heading text-[20px] text-white mb-4 uppercase">
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
        <div className="pt-16 flex justify-center items-center">
          <Link
            to="/projects"
            className="relative inline-block bg-lime text-[#000000] px-10 py-5 font-bold text-xl uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(194,254,11,0.5)] group"
            style={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
            }}
          >
            <span className="relative z-10">VOIR MES PROJETS</span>
            {/* Effet glitch au hover */}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
