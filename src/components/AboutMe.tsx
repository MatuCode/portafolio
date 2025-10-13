'use client';

import '../i18n/client'; // Importa e inicializa i18next
import { useTranslation } from 'react-i18next';

export default function AboutMe() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-gray-800 p-6 rounded-xl flex flex-col md:flex-row items-center gap-5">
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-2">{t('greeting')}</h2>
        <p className="text-gray-300">
          {t('about.description')}
        </p>
      </div>
    </section>
  );
}
