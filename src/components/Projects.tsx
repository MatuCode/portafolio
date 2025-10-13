'use client';

export default function Projects() {
  const projects = [
    {
      title: 'Relatos de Papel',
      image: '/images/rsale.jpg',
      description: 'Catálogo de libros con búsqueda por texto, desplegado con Spring Boot + Elasticsearch.',
      link: 'https://relatos.vercel.app',
    },
    {
      title: 'Portafolio',
      image: '/images/portafolio.png',
      description: 'Portafolio personal con soporte multilenguaje, Tailwind y despliegue en Vercel.',
      link: '/',
    },
  ];

  return (
    <section className="text-white px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">📁 Proyectos</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div key={p.title} className="bg-gray-800 rounded-lg overflow-hidden shadow">
            <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="mb-2">{p.description}</p>
              <a href={p.link} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                Ver proyecto
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
