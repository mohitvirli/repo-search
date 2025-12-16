export default function Loading() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-neutral-900 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-neutral-800 rounded w-50 mb-3" />
        <div className="h-4 bg-neutral-800 rounded w-full mb-2" />
        <div className="h-4 bg-neutral-800 rounded w-20" />
        </div>
      ))}
    </div>
  )
}