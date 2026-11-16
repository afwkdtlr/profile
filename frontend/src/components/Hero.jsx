export default function Hero({ profile }) {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pb-8 pt-16 sm:pt-24">
      <p className="text-sm font-medium tracking-wide text-accent">{profile.title}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
        {profile.tagline}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
        >
          프로젝트 보기
        </a>
        <a
          href="#contact"
          className="rounded-full border border-ink/15 bg-card px-5 py-2.5 text-sm font-medium text-ink"
        >
          연락하기
        </a>
      </div>
    </section>
  )
}
