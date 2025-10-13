/* *Developed by pmatute */
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

import { sharedBackgroundStyle } from '@/theme/backgrounds';

const withBase = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`;

const SECTION_STYLE: CSSProperties = {
  ...sharedBackgroundStyle,
};

type Item = { name: string; logo: string; alt?: string };

const LANGUAGES: Item[] = [
  { name: 'Java', logo: withBase('/images/java.svg') },
  { name: 'TypeScript', logo: withBase('/images/typescript.svg') },
  { name: 'JavaScript', logo: withBase('/images/javascript.svg') },
  { name: 'Python', logo: withBase('/images/python.svg') },
];

const TECHNOLOGIES: Item[] = [
  { name: 'MySQL', logo: withBase('/images/mysql.svg') },
  { name: 'Elasticsearch', logo: withBase('/images/elasticsearch.svg') },
  { name: 'Docker', logo: withBase('/images/docker.svg') },
  { name: 'Git', logo: withBase('/images/git.svg') },
  { name: 'GitHub', logo: withBase('/images/github.svg') },
];

const FRAMEWORKS: Item[] = [
  { name: 'Spring Boot', logo: withBase('/images/springboot.svg') },
  { name: 'Next.js', logo: withBase('/images/nextjs.svg') },
  { name: 'TailwindCSS', logo: withBase('/images/tailwind.svg') },
];

function TechRow({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-center text-lg font-semibold tracking-wide text-white/90">{title}</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 transition hover:-translate-y-[1px] hover:ring-[#F6B10A]/50 focus-within:ring-[#F6B10A]/50"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-xl ring-1 ring-white/10">
              <Image src={item.logo} alt={item.alt ?? item.name} fill sizes="32px" className="object-contain" />
            </div>
            <span className="text-sm font-medium text-white/90">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function KnowledgeSection() {
  return (
    <section id="skills" className="relative py-20 text-white" aria-label="Lenguajes y tecnologias" style={SECTION_STYLE}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <header className="mb-10 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Tecnologias y Lenguajes</h2>
          <p className="mt-2 text-white/80">Logo + nombre, organizados por categoria, con efecto pop-up.</p>
        </header>

        <div className="space-y-10">
          <TechRow title="Lenguajes" items={LANGUAGES} />
          <TechRow title="Tecnologias" items={TECHNOLOGIES} />
          <TechRow title="Frameworks" items={FRAMEWORKS} />
        </div>
      </div>
    </section>
  );
}
