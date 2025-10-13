// src/components/EducationAndWorkSection.tsx
'use client';

import { motion } from 'framer-motion';

const education = [
  {
    title: 'Universidad Técnica Particular de Loja',
    date: '2018 - 2024',
  },
  {
    title: 'UNIR - Universidad Internacional de La Rioja',
    date: 'En curso',
  },
];

const work = [
  {
    title: 'Realtorsale (Proyecto Inmobiliario)',
    date: 'Actualidad',
  },
  {
    title: 'V-ast (Gestión de página web)',
    date: '2024',
  },
];

export default function EducationAndWorkSection() {
  return (
    <section className="mt-20 px-4">
      <motion.h2
        className="text-3xl font-bold text-white mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎓 EDUCACIÓN Y EXPERIENCIA LABORAL
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4">EDUCACIÓN</h3>
          <ul className="space-y-4">
            {education.map((item, index) => (
              <motion.li
                key={index}
                className="bg-gray-800 p-4 rounded shadow"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <p className="text-lg font-medium text-white">{item.title}</p>
                <p className="text-sm text-white/70">{item.date}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary mb-4">EXPERIENCIA LABORAL</h3>
          <ul className="space-y-4">
            {work.map((item, index) => (
              <motion.li
                key={index}
                className="bg-gray-800 p-4 rounded shadow"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <p className="text-lg font-medium text-white">{item.title}</p>
                <p className="text-sm text-white/70">{item.date}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
