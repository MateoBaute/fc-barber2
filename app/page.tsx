import Intro from "./components/inicio/intro";

export default function Home() {
  return (
    <div className="flex flex-col pt-8 flex-1 items-center justify-center font-sans space-y-16">
      {/* Hero Section */}
      <div className="animate-slide-up w-full max-w-4xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 animate-glow drop-shadow-lg">
          No es solo un Corte
        </h1>
        <p className="text-xl md:text-2xl text-yellow-400 font-semibold">
          es una <span className="text-yellow-300">experiencia</span>
        </p>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-slide-up">
        <div className="text-center p-8 bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/30 rounded-lg hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition duration-300 transform hover:scale-105">
          <p className="text-4xl font-bold text-yellow-400 mb-2">15+</p>
          <p className="text-gray-300">Años de experiencia</p>
        </div>
        <div className="text-center p-8 bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/30 rounded-lg hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition duration-300 transform hover:scale-105">
          <p className="text-4xl font-bold text-yellow-400 mb-2">500+</p>
          <p className="text-gray-300">Clientes satisfechos</p>
        </div>
        <div className="text-center p-8 bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/30 rounded-lg hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition duration-300 transform hover:scale-105">
          <p className="text-4xl font-bold text-yellow-400 mb-2">10</p>
          <p className="text-gray-300">Barberos profesionales</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full max-w-4xl space-y-8 animate-slide-up">
        <h2 className="text-4xl font-bold text-yellow-500 text-center mb-8">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-gray-800/50 to-black border border-yellow-500/20 rounded-lg hover:border-yellow-500/50 transition duration-300 hover:bg-gray-800/70 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Servicios Premium</h3>
            <p className="text-gray-300">Contamos con los mejores barberos y productos de calidad superior.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-800/50 to-black border border-yellow-500/20 rounded-lg hover:border-yellow-500/50 transition duration-300 hover:bg-gray-800/70 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Ambiente Elegante</h3>
            <p className="text-gray-300">Disfruta de un espacio moderno, limpio y confortable.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-800/50 to-black border border-yellow-500/20 rounded-lg hover:border-yellow-500/50 transition duration-300 hover:bg-gray-800/70 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Reservas Fáciles</h3>
            <p className="text-gray-300">Reserva tu turno online en segundos, sin complicaciones.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-800/50 to-black border border-yellow-500/20 rounded-lg hover:border-yellow-500/50 transition duration-300 hover:bg-gray-800/70 group">
            <div className="text-3xl mb-3 group-hover:scale-125 transition duration-300">✓</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Atención Personalizada</h3>
            <p className="text-gray-300">Cada corte es personalizado según tus preferencias y estilo.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-2xl text-center space-y-6 py-12 animate-fade-in">
        <p className="text-gray-300 text-lg">
          ¿Listo para una experiencia de barbería premium?
        </p>
        <a 
          href="/reservas"
          className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/50 hover:shadow-yellow-400/70"
        >
          Reservar Ahora
        </a>
      </div>
    </div>
  );
}
