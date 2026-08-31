import Intro from "./components/inicio/intro";

export default function Home() {
  return (
    <div className="flex flex-col pt-8 flex-1 items-center justify-center font-sans space-y-16">
      {/* Hero Section */}
      <div className="animate-slide-up w-full max-w-4xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-accent">
          No es solo un Corte
        </h1>
        <p className="text-xl md:text-2xl text-accent font-semibold">
          es una <span className="text-accent-strong">experiencia</span>
        </p>

        {/* CTA Section */}
        <div className="w-full text-center space-y-6 py-12 animate-fade-in">
          <p className="text-text-secondary text-lg">
            ¿Listo para una experiencia de barbería premium?
          </p>
          <a
            href="/reservas"
            className="inline-block px-8 py-4 bg-accent text-accent-text-on font-bold text-lg rounded-lg hover:bg-accent-strong transition duration-200"
          >
            Reservar Ahora
          </a>
        </div>

        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
          Bienvenido a FC Barber, donde la tradición y la excelencia se encuentran.
          Nuestros barberos profesionales te ofrecen servicios de calidad premium
          en un ambiente elegante y acogedor.
        </p>
      </div>

      {/* Carousel Section */}
      <div className="animate-fade-in w-full">
        <Intro />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[80%] mx-auto my-12 max-w-4xl animate-slide-up">
        <div className="text-center p-8 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 transform hover:scale-105">
          <p className="text-4xl font-bold text-accent mb-2">3+</p>
          <p className="text-text-secondary">Años de experiencia</p>
        </div>
        <div className="text-center p-8 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 transform hover:scale-105">
          <p className="text-4xl font-bold text-accent mb-2">500+</p>
          <p className="text-text-secondary">Clientes satisfechos</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full max-w-4xl space-y-8 animate-slide-up">
        <h2 className="text-4xl font-bold text-accent text-center mb-8">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 hover:bg-white/5 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-accent mb-2">Servicios Premium</h3>
            <p className="text-text-secondary">Contamos con los mejores barberos y productos de calidad superior.</p>
          </div>
          <div className="p-6 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 hover:bg-white/5 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-accent mb-2">Ambiente Elegante</h3>
            <p className="text-text-secondary">Disfruta de un espacio moderno, limpio y confortable.</p>
          </div>
          <div className="p-6 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 hover:bg-white/5 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-accent mb-2">Reservas Fáciles</h3>
            <p className="text-text-secondary">Reserva tu turno online en segundos, sin complicaciones.</p>
          </div>
          <div className="p-6 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 hover:bg-white/5 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-accent mb-2">Atención Personalizada</h3>
            <p className="text-text-secondary">Cada corte es personalizado según tus preferencias y estilo.</p>
          </div>
        </div>
      </div>


    </div>
  );
}
