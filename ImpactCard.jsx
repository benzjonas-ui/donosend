export default function ImpactCard({ title, value, text }) {
  return <article className="impact-card"><span>{title}</span><strong>{value}</strong><p>{text}</p></article>
}
