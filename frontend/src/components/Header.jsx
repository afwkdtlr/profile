const links = [
  { href: "#about", label: "소개" },
  { href: "#skills", label: "기술" },
  { href: "#experience", label: "경력" },
  { href: "#projects", label: "프로젝트" },
  { href: "#contact", label: "연락" },
]

export default function Header({ name }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5">
        <a href="#top" className="text-sm font-semibold tracking-tight text-ink">
          {name}
        </a>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm text-muted">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
