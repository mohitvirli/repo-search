import Image from "next/image";

export default function Repository({ repository }: { repository: any }) {
  return (
    <div className="p-4 border border-neutral-600 rounded-lg mb-4 bg-neutral-900 hover:bg-accent transition-colors">
      <div className="flex items-center mb-3">
        <Image src={repository.owner.avatar_url} alt={repository.owner.login} width={20} height={20} className="rounded-full mr-2" />
        <h2 className="text-lg font-semibold">{repository.full_name}</h2>
      </div>
      <p className="text-sm text-neutral-300 mb-3">{repository.description}</p>
      <div className="flex items-center text-sm text-muted-foreground">
        <span className="mr-4">⭐ {repository.stargazers_count}</span>
        <span>🍴 {repository.forks_count}</span>
      </div>
    </div>
  );
}