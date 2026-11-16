export default function Projects({ projects }) {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="text-sm font-medium text-accent">프로젝트</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <li key={project.name} className="flex flex-col rounded-2xl border border-line bg-card p-5">
            <p className="text-xs text-muted">{project.period}</p>
            <h3 className="mt-2 text-lg font-semibold">{project.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink">
                  {tech}
                </li>
              ))}
            </ul>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-sm font-medium text-accent hover:underline"
              >
                링크 열기
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
