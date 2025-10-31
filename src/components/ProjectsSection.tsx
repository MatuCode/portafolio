import React, { useCallback, useEffect, useState, useMemo } from "react";

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  details: string;
  note?: string;
  context?: string;
  contextType?: "academic" | "internship" | "professional";
  image: string;
  imageHD?: string;
  gallery?: string[];
  tech?: string[];
  link?: string;
  github?: string;
  video?: string;
  instagram?: string;
};

export type ProjectsCopy = {
  title: string;
  subtitle: string;
  buttons: {
    instagram: string;
    images: string;
    github: string;
    link: string;
    showMore: string;
    showLess: string;
    comingSoon: string;
    previous: string;
    next: string;
    close: string;
    video?: string;
    searchPlaceholder?: string;
    resultsFound?: string;
    resultFound?: string;
  };
  items: ProjectItem[];
};

type GalleryState = { project: ProjectItem; index: number };

export default function ProjectsSection({ copy }: { copy: ProjectsCopy }) {
  const { title, subtitle, buttons, items } = copy;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeGallery, setActiveGallery] = useState<GalleryState | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const gatherImages = useCallback((project: ProjectItem) => {
    if (project.gallery?.length) {
      return project.gallery.filter((src): src is string => Boolean(src));
    }
    const fallbacks = [project.imageHD, project.image].filter(
      (src): src is string => Boolean(src)
    );
    return fallbacks;
  }, []);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openGallery = useCallback(
    (project: ProjectItem) => {
      const images = gatherImages(project);
      if (!images.length) return;
      setActiveGallery({ project, index: 0 });
    },
    [gatherImages]
  );

  const closeGallery = useCallback(() => {
    setActiveGallery(null);
  }, []);

  const showNextImage = useCallback(() => {
    setActiveGallery((current) => {
      if (!current) return current;
      const images = gatherImages(current.project);
      if (images.length <= 1) return current;
      const nextIndex = (current.index + 1) % images.length;
      return { project: current.project, index: nextIndex };
    });
  }, [gatherImages]);

  const showPreviousImage = useCallback(() => {
    setActiveGallery((current) => {
      if (!current) return current;
      const images = gatherImages(current.project);
      if (images.length <= 1) return current;
      const previousIndex = (current.index - 1 + images.length) % images.length;
      return { project: current.project, index: previousIndex };
    });
  }, [gatherImages]);

  useEffect(() => {
    if (!activeGallery) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGallery();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextImage();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousImage();
      }
    };

    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    // Agregar clase al body para ocultar la foto de fondo
    document.body.classList.add('modal-open');

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      // Quitar clase del body para mostrar la foto de fondo
      document.body.classList.remove('modal-open');
    };
  }, [activeGallery, closeGallery, showNextImage, showPreviousImage]);

  const activeGalleryImages = activeGallery ? gatherImages(activeGallery.project) : [];
  const activeImageSrc =
    activeGallery && activeGalleryImages.length
      ? activeGalleryImages[activeGallery.index]
      : null;

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) return items;
    return items.filter(project => {
      const search = searchTerm.toLowerCase();
      return project.title.toLowerCase().includes(search) ||
             project.description.toLowerCase().includes(search) ||
             project.tech?.some(tech => tech.toLowerCase().includes(search));
    });
  }, [items, searchTerm]);

  return (
    <section className="py-12 sm:py-16 md:py-20" aria-label={title}>
      <div className="w-full px-4 sm:px-6 md:pl-16 lg:pl-28 xl:pl-40 md:pr-6">
        <div className="w-full lg:w-1/2 max-w-[820px]">
          <header className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white drop-shadow">{title}</h2>
            <p className="text-white/70 text-sm mt-1">{subtitle}</p>
          </header>

          {/* Search Control */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={buttons.searchPlaceholder || "Buscar proyectos..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-white/8 text-white placeholder-white/50 ring-1 ring-white/15 focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <p className="mt-2 text-white/60 text-sm">
                {filteredProjects.length} {filteredProjects.length === 1 ? (buttons.resultFound || 'proyecto encontrado') : (buttons.resultsFound || 'proyectos encontrados')}
              </p>
            )}
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {filteredProjects.map((project) => {
              const isExpanded = expanded[project.slug];
              const galleryImages = gatherImages(project);
              return (
                <article
                  key={project.slug}
                  className="rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-3 sm:p-4 md:p-5"
                >
                  <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 items-start">
                    <div className="w-full md:w-[340px] lg:w-[360px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-32 sm:h-36 md:h-44 lg:h-48 object-cover rounded-lg ring-1 ring-white/10"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-base sm:text-lg leading-snug">{project.title}</h3>
                        {project.context && (
                          <span 
                            className="px-2 py-1 text-xs rounded-lg font-medium text-white"
                            style={project.contextType === 'academic' ? {
                              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                              border: '1px solid rgba(59, 130, 246, 0.3)'
                            } : project.contextType === 'internship' ? {
                              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
                              border: '1px solid rgba(16, 185, 129, 0.3)'
                            } : {
                              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                              boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)',
                              border: '1px solid rgba(249, 115, 22, 0.3)'
                            }}
                          >
                            {project.context}
                          </span>
                        )}
                      </div>
                      {project.note && (
                        <p className="text-xs text-white/80/95 mt-1">{project.note}</p>
                      )}

                      <p className="text-white/85 mt-2 text-sm sm:text-[15px] leading-relaxed">
                        {project.description}
                      </p>

                      {project.details && (
                        <details className="mt-3" open={isExpanded}>
                          <summary
                            className="text-xs text-white/80 cursor-pointer select-none"
                            onClick={(event) => {
                              event.preventDefault();
                              toggle(project.slug);
                            }}
                          >
                            {isExpanded ? buttons.showLess : buttons.showMore}
                          </summary>
                          <p className="mt-2 text-sm text-white/80 leading-relaxed">{project.details}</p>
                        </details>
                      )}

                      {!!project.tech?.length && (
                        <div className="mt-3 flex flex-wrap gap-1 sm:gap-1.5">
                          {project.tech.map((tag) => (
                            <span
                              key={`${project.slug}-${tag}`}
                              className="px-2 py-0.5 text-[10px] sm:text-[11px] rounded-md bg-white/10 ring-1 ring-white/10 text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {galleryImages.length ? (
                          <button
                            type="button"
                            onClick={() => openGallery(project)}
                            className="group px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-white/30"
                          >
                            <span className="group-hover:animate-pulse">{buttons.images}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-gray-500/30 text-white/70 ring-1 ring-white/10 cursor-not-allowed opacity-50"
                            title={buttons.comingSoon}
                          >
                            {buttons.images}
                          </button>
                        )}

                        {/* GitHub and Link buttons only for Relatos de Papel */}
                        {project.slug === "relatos-de-papel" && (
                          <>
                            {project.github && project.github !== "#" ? (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="group px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-white/30"
                              >
                                <span className="group-hover:animate-pulse">{buttons.github}</span>
                              </a>
                            ) : null}
                            {project.link && project.link !== "#" ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="group px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-white/30"
                              >
                                <span className="group-hover:animate-pulse">{buttons.link}</span>
                              </a>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {activeGallery && activeImageSrc && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeGallery}
          role="presentation"
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeGallery.project.title} - ${buttons.images}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeGallery}
              className="absolute -top-12 right-0 md:-right-12 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition z-10"
              aria-label={buttons.close}
              title={buttons.close}
            >
              X
            </button>

            {/* Image Container with proper scaling */}
            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/20 bg-black/20 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImageSrc}
                alt={`${activeGallery.project.title} — ${buttons.images} ${activeGallery.index + 1}`}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl"
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />

              {activeGalleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/80 transition backdrop-blur-sm"
                    aria-label={buttons.previous}
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/80 transition backdrop-blur-sm"
                    aria-label={buttons.next}
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>

            {/* Project Info */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-semibold mb-1">
                {activeGallery.project.title}
              </h3>
              <p className="text-white/80 text-sm mb-2">
                {buttons.images} {activeGallery.index + 1} de {activeGalleryImages.length}
              </p>
              
              {activeGalleryImages.length > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {activeGalleryImages.map((_, index) => (
                    <button
                      key={`${activeGallery.project.slug}-thumb-${index}`}
                      type="button"
                      onClick={() => setActiveGallery({ project: activeGallery.project, index })}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        index === activeGallery.index ? "text-white" : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`${buttons.images} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
