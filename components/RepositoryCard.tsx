import { DEFAULT_LANGUAGE_COLOR, LANGUAGE_COLORS_MAP } from "@/constants/languageColors";
import Repository from "@/types/repository";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * Utility to format numbers in a compact form (e.g., 1.2K, 3.4M).
 */
const formatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short'
})

/**
 * Component to display a GitHub repository card with details like name, owner,
 * stars, forks, and language.
 */
export function RepositoryCard({ repository }: { repository: Repository }) {
  const color = LANGUAGE_COLORS_MAP[repository.language] || DEFAULT_LANGUAGE_COLOR;

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
        <span className="mr-4 flex"><Image src="/star.svg" alt="Star" width={16} height={16} className="mr-1" /> {formatter.format(repository.stargazers_count)}</span>
        <span className="flex"><Image src="/fork.svg" alt="Fork" width={16} height={16} className="mr-1" /> {formatter.format(repository.forks_count)}</span>
        <span className="text-xs text-neutral-500 ml-auto">Updated {dayjs(repository.updated_at).fromNow()}</span>
      </div>
    </div>
  );
}