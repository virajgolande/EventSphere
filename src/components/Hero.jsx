const Hero = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/concert.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Center Text */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="glitch text-7xl md:text-9xl font-extrabold tracking-widest">
          EVENTS</h1>


        <p className="mt-4 text-lg md:text-2xl text-white/80 italic">
          Discover Events. Book Instantly.
        </p>
      </div>
    </div>
  );
};

export default Hero;
