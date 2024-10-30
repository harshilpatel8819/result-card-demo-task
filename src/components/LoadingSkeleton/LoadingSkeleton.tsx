import { Skeleton } from "../Skeleton/Skeleton";

interface LoadingSkeletonProps {
  count?: number; // Optional count prop to define how many skeleton loaders to render
}

/**
 * Renders a list of skeleton loaders to indicate loading state in UI components.
 * @param {LoadingSkeletonProps} props The number of skeletons to render, default is 4.
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 4 }) => (
  <>
    {/* Generate an array of empty elements based on count and map over it to render skeletons */}
    {[...Array(count)].map((_, i) => (
      <li
        key={i} // Unique key for each list item
        className="flex items-center justify-between p-4 rounded-xl bg-pale-blue"
      >
        {/* Skeleton for a longer content piece, e.g., a title */}
        <Skeleton className="h-6 w-32" />
        {/* Skeleton for a shorter content piece, e.g., a date or number */}
        <Skeleton className="h-6 w-20" />
      </li>
    ))}
  </>
);

export default LoadingSkeleton;
