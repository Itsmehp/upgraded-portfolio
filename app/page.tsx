"use client";

export default function HelloWorld() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hello World</h1>
          <p className="text-lg">Welcome to the portfolio site!</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p className="text-lg">This is the about section.</p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
          <p className="text-lg">Work and student experience here.</p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-lg">Portfolio projects showcase.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-lg">Get in touch.</p>
        </div>
      </section>
    </main>
  );
}