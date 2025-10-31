import React from "react";

export type ExperienceItem = {
  role: string;
  company: string;
  project?: string;
  period: string;
  location?: string;
  bullets: string[];
  stack?: string[];
};

export type ExperienceCopy = {
  title: string;
  subtitle: string;
  items: ExperienceItem[];
};

export default function ExperienceSection({ copy }: { copy: ExperienceCopy }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="w-full px-4 sm:px-6 md:pl-16 lg:pl-28 xl:pl-40 md:pr-6">
        <div className="max-w-[44rem]">
          <header className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white drop-shadow">
              {copy.title}
            </h2>
            <p className="text-white/75 text-sm sm:text-base mt-1">{copy.subtitle}</p>
          </header>

          <ol className="relative border-s border-white/15">
            {copy.items.map((job, index) => (
              <li
                key={`${job.company ?? job.role}-${index}`}
                className="ms-4 sm:ms-6 mb-4 sm:mb-6 md:mb-7"
              >
                <span 
                  className="absolute -start-2.5 sm:-start-3.5 mt-1.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ring-2 ring-white/20"
                  style={{
                    background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                    boxShadow: '0 2px 8px rgba(22, 33, 62, 0.4)'
                  }}
                />
                <article className="rounded-xl sm:rounded-2xl bg-white/5 ring-1 ring-white/10 p-3 sm:p-4 md:p-5 backdrop-blur">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-tight">
                    {job.role}
                    {job.company ? (
                      <span className="text-white/85">
                        {" · "}
                        {job.company}
                        {job.project ? ` · ${job.project}` : ""}
                      </span>
                    ) : null}
                  </h3>
                  <p className="text-white/65 text-xs sm:text-sm mt-1">
                    {job.period}
                    {job.location ? (
                      <>
                        {" · "}
                        {job.location}
                      </>
                    ) : null}
                  </p>

                  <ul className="mt-2 sm:mt-3 list-disc list-inside space-y-1 text-white/90 text-xs sm:text-sm leading-relaxed">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li key={`${job.company ?? job.role}-bullet-${bulletIndex}`}>{bullet}</li>
                    ))}
                  </ul>

                  {!!job.stack?.length && (
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
                      {job.stack.map((tag) => (
                        <span
                          key={`${job.company ?? job.role}-${tag}`}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

