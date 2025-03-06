import { Skeleton } from "./ui/skeleton";

export default function GitHubProfile() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">GitHub Profile</h2>
      <p className="text-gray-500">GitHub data is currently unavailable</p>
    </div>
  );
}