
export default function KpiCard({ label, value, sub }: { label: string, value: string, sub?: string }) {
  return (
    <div className="card p-4">
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  )
}
