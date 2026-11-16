export default function Contact({ contact }) {
  const links = [
    { label: "이메일", value: contact.email, href: `mailto:${contact.email}` },
    { label: "GitHub", value: contact.github, href: contact.github },
    { label: "블로그", value: contact.blog, href: contact.blog },
  ].filter((item) => item.href)

  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-16">
      <div className="rounded-3xl bg-ink px-6 py-10 text-paper sm:px-10">
        <h2 className="text-sm font-medium text-orange-200">연락</h2>
        <p className="mt-3 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
          같이 풀어볼 문제가 있다면 짧게 남겨 주세요.
        </p>
        <ul className="mt-8 space-y-3">
          {links.map((item) => (
            <li key={item.label} className="text-sm">
              <span className="mr-3 text-stone-400">{item.label}</span>
              <a href={item.href} className="break-all underline decoration-orange-200/70 underline-offset-4">
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
