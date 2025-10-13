'use client';

export default function Technologies() {
  return (
    <section className="text-white px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">🛠️ Tecnologías y herramientas</h2>

      {/* Lenguajes */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Lenguajes de programación</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {[
            { name: 'Java', img: 'java.svg' },
            { name: 'JavaScript', img: 'javascript.svg' },
            { name: 'TypeScript', img: 'typescript.svg' },
            { name: 'Python', img: 'python.svg' },
            { name: 'HTML', img: 'html.svg' },
            { name: 'CSS', img: 'css.svg' },
          ].map(({ name, img }) => (
            <div key={name} className="text-center">
              <img src={`/images/${img}`} alt={name} className="h-10 mx-auto mb-2" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Frameworks */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Frameworks y librerías</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {[
            { name: 'Spring Boot', img: 'springboot.svg' },
            { name: 'React', img: 'react.svg' },
            { name: 'Next.js', img: 'nextjs.svg' },
            { name: 'Tailwind CSS', img: 'tailwind.svg' },
          ].map(({ name, img }) => (
            <div key={name} className="text-center">
              <img src={`/images/${img}`} alt={name} className="h-10 mx-auto mb-2" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Herramientas */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Herramientas y plataformas</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {[
            { name: 'MySQL', img: 'mysql.svg' },
            { name: 'Docker', img: 'docker.svg' },
            { name: 'Git', img: 'git.svg' },
            { name: 'GitHub', img: 'github.svg' },
            { name: 'Vercel', img: 'vercel.svg' },
          ].map(({ name, img }) => (
            <div key={name} className="text-center">
              <img src={`/images/${img}`} alt={name} className="h-10 mx-auto mb-2" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
