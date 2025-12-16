import { DEFAULT_COLOR, LANGUAGE_COLORS_MAP } from "@/constants/languageColors";
import Image from "next/image";


export default function Repository({ repository }: { repository: any }) {
  const color = LANGUAGE_COLORS_MAP[repository.language] || DEFAULT_COLOR;

  return (
    <div className="p-4 border border-neutral-600 rounded-lg mb-4 bg-neutral-900 hover:bg-accent transition-colors">
      <div className="flex items-center mb-3">
        <Image src={repository.owner.avatar_url} alt={repository.owner.login} width={40} height={40} className="rounded-full mr-4" />
        <div>
          <a href={repository.html_url} target="_blank" rel="noopener noreferrer" >
            <h2 className="text-lg font-semibold hover:underline group/link text-blue-300">{repository.full_name}</h2>
          </a>
          <span className="text-sm text-neutral-400">
            by <a href={repository.owner.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">{repository.owner.login}</a>
          </span>
        </div>
      </div>
      <p className="text-sm text-neutral-300 mb-4">{repository.description}</p>
      <div className="flex items-center text-sm text-neutral-400">
        { repository.language && (
          <span className="flex gap-2 items-center mr-4">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span>{repository.language}</span>
          </span>
        )}
        <span className="mr-4 flex"><Image src="/star.svg" alt="Star" width={16} height={16} className="mr-1" /> {repository.stargazers_count}</span>
        <span className="flex"><Image src="/fork.svg" alt="Fork" width={16} height={16} className="mr-1" /> {repository.forks_count}</span>
      </div>
    </div>
  );
}