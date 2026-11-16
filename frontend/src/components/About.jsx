export default function About({ about, highlights }) {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-16">
      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h2 className="text-sm font-medium text-accent">소개</h2>
          <p className="mt-4 text-base leading-8 text-ink">{about}</p>
        </div>
        <ul className="space-y-6">
          {highlights.map((item, index) => (
            <li key={item.title} className="border-t border-line pt-4">
              <p className="text-xs tracking-widest text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
