export default function Skills({ skills }) {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="text-sm font-medium text-accent">기술 스택</h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-3 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center"
          >
            <h3 className="text-sm font-medium text-ink">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-card px-3 py-1 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
