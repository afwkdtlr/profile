export default function Footer({ name, source }) {
  const sourceLabel = source === "api" ? "백엔드 API" : "프론트 내장 샘플"

  return (
    <footer className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} {name}</p>
      <p>데이터 출처: {sourceLabel}</p>
    </footer>
  )
}
