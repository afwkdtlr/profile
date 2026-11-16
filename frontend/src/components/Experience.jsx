export default function Experience({ experiences }) {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="text-sm font-medium text-accent">경력</h2>
      <ol className="mt-6 space-y-8">
        {experiences.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="grid gap-3 border-t border-line pt-6 md:grid-cols-[11rem_minmax(0,1fr)]"
          >
            <p className="text-sm text-muted">{item.period}</p>
            <div>
              <h3 className="text-lg font-semibold">
                {item.role}
                <span className="font-medium text-muted"> · {item.company}</span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-ink">
                {item.points.map((point) => (
                  <li key={point} className="pl-3 before:mr-2 before:text-accent before:content-['–']">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
