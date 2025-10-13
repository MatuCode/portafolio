// src/components/TechnologiesSection.tsx
'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const technologies = [

  {
    title: 'Frameworks y librerías',
    items: [
      { name: 'Spring Boot', icon: '/images/springboot.svg' },
      { name: 'React', icon: '/images/react.svg' },
      { name: 'Next.js', icon: '/images/nextjs.svg' },
      { name: 'Tailwind CSS', icon: '/images/tailwind.svg' },
    ],
  },
  {
    title: 'Herramientas y plataformas',
    items: [
      { name: 'MySQL', icon: '/images/mysql.svg' },
      { name: 'Docker', icon: '/images/docker.svg' },
      { name: 'Git', icon: '/images/git.svg' },
      { name: 'GitHub', icon: '/images/github.svg' },
      { name: 'Vercel', icon: '/images/vercel.svg' },
    ],
  },
];

export default function TechnologiesSection() {
  const { t } = useTranslation('common');

  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary py-16 px-4 overflow-hidden">
      {/* Marca de agua con video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm pointer-events-none z-0"
      >
        <source src="/videos/marca-agua.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      <motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('skills.title')}
      </motion.h2>

      {technologies.map((category, index) => (
        <motion.div
          key={category.title}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4">
            {t(`skills.${category.title.toLowerCase().split(' ')[0]}`)}
          </h3>
          <div className="flex flex-wrap gap-6">
            {category.items.map((tech) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center w-24 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="mb-2"
                />
                <span className="text-sm text-center">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
