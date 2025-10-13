'use client';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function Skills() {
  const { t } = useTranslation('common');

  return (
    <section className="text-white px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">{t('skills.title')}</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{t('skills.languages')}</h3>
        <div className="flex gap-6 flex-wrap">
          <Image src="/icons/java.png" alt="Java" width={40} height={40} />
          <Image src="/icons/javascript.png" alt="JavaScript" width={40} height={40} />
          <Image src="/icons/typescript.png" alt="TypeScript" width={40} height={40} />
          <Image src="/icons/python.png" alt="Python" width={40} height={40} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{t('skills.frameworks')}</h3>
        <div className="flex gap-6 flex-wrap">
          <Image src="/icons/springboot.png" alt="Spring Boot" width={40} height={40} />
          <Image src="/icons/react.png" alt="React" width={40} height={40} />
          <Image src="/icons/nextjs.png" alt="Next.js" width={40} height={40} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">{t('skills.tools')}</h3>
        <div className="flex gap-6 flex-wrap">
          <Image src="/icons/mysql.png" alt="MySQL" width={40} height={40} />
          <Image src="/icons/docker.png" alt="Docker" width={40} height={40} />
          <Image src="/icons/git.png" alt="Git" width={40} height={40} />
          <Image src="/icons/github.png" alt="GitHub" width={40} height={40} />
          <Image src="/icons/vercel.png" alt="Vercel" width={40} height={40} />
        </div>
      </div>
    </section>
  );
}
