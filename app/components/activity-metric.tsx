interface IActivityMetric {
  label: string,
  value: React.ReactNode
}

export function ActivityMetric({ label, value }: IActivityMetric) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-sm tracking-wide text-zinc-300">
        {label}
      </span>

      <strong className="text-xl font-bold tracking-wide">
        {value}
      </strong>
    </div>
  )
}