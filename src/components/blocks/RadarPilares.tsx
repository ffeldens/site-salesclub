/**
 * Radar (SVG puro, sem dependência) da visão por pilar do diagnóstico.
 * Recebe os pilares com score 0–10.
 */
export function RadarPilares({ data }: { data: { name: string; score: number }[] }) {
  const size = 320
  const cx = size / 2
  const cy = size / 2
  const R = 110
  const n = data.length
  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n
  const point = (i: number, radius: number) => ({
    x: cx + radius * Math.cos(angleFor(i)),
    y: cy + radius * Math.sin(angleFor(i)),
  })

  const dataPolygon = data
    .map((d, i) => {
      const p = point(i, (Math.max(0, Math.min(10, d.score)) / 10) * R)
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
    })
    .join(' ')

  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-auto w-full max-w-[320px]" role="img" aria-label="Visão por pilar">
      {/* anéis */}
      {rings.map((r) => (
        <polygon
          key={r}
          points={data.map((_, i) => { const p = point(i, r * R); return `${p.x.toFixed(1)},${p.y.toFixed(1)}` }).join(' ')}
          fill="none"
          stroke="rgba(237,237,237,0.10)"
          strokeWidth={1}
        />
      ))}
      {/* eixos */}
      {data.map((_, i) => {
        const p = point(i, R)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(237,237,237,0.10)" strokeWidth={1} />
      })}
      {/* área de dados */}
      <polygon points={dataPolygon} fill="rgba(250,1,0,0.22)" stroke="#FA0100" strokeWidth={2} />
      {/* vértices */}
      {data.map((d, i) => {
        const p = point(i, (Math.max(0, Math.min(10, d.score)) / 10) * R)
        return <circle key={i} cx={p.x} cy={p.y} r={3} fill="#FA0100" />
      })}
      {/* rótulos (ícone/sigla curta) */}
      {data.map((d, i) => {
        const p = point(i, R + 16)
        const anchor = Math.abs(p.x - cx) < 8 ? 'middle' : p.x > cx ? 'start' : 'end'
        const sigla = d.name.split(' ').map((w) => w[0]).slice(0, 3).join('')
        return (
          <text key={i} x={p.x} y={p.y} textAnchor={anchor} dominantBaseline="middle" fontSize={10} fill="rgba(250,250,250,0.7)">
            {sigla} {d.score.toFixed(1)}
          </text>
        )
      })}
    </svg>
  )
}
