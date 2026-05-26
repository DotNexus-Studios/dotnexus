export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-glow), transparent)",
        }}
      />
      <div className="relative z-10 max-w-2xl text-center">
        <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase">
          DotNexus
        </p>
        <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Jouw .NET hub op het web
        </h1>
        <p className="text-lg text-foreground/70">
          Deze site draait straks op Vercel, gekoppeld aan GitHub. Lokaal starten met{" "}
          <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-sm">npm run dev</code>
          .
        </p>
      </div>
    </main>
  );
}
