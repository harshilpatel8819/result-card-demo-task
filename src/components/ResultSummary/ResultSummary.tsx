import { Result } from "../../types";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

interface ResultSummaryProps {
  loading: boolean;
  results: Result[];
}

// Mapping of category names to their corresponding text and background colors.
export const colorMap: Record<string, { color: string; bg: string }> = {
  Reaction: { color: "text-light-red", bg: "bg-light-red" },
  Memory: { color: "text-orangey-yellow", bg: "bg-orangey-yellow" },
  Verbal: {
    color: "text-green-teal",
    bg: "bg-green-teal",
  },
  Visual: { color: "text-cobalt-blue", bg: "bg-cobalt-blue" },
};

/**
 * Displays the summary of results with dynamic coloring and loading skeleton.
 * @param {ResultSummaryProps} props The component properties including loading state and results data.
 */
const ResultSummary: React.FC<ResultSummaryProps> = ({ loading, results }) => (
  <div className="p-8 md:p-10 bg-white rounded-[30px] md:max-w-[343px] w-full">
    {/* Header for the Summary section */}
    <h2 className="text-dark-gray-blue font-bold text-lg md:text-2xl mb-6">
      Summary
    </h2>
    {/* List of results, showing a skeleton loader if data is still loading */}
    <ul className="space-y-4">
      {loading ? (
        <LoadingSkeleton count={results.length} />
      ) : (
        results.map((result) => (
          <li
            key={result.category}
            className={`flex items-center justify-between p-4 rounded-xl bg-opacity-10 ${
              colorMap[result.category].bg
            }`}
          >
            <div className="flex gap-3.5 items-center">
              {/* Icon and category name with dynamic coloring based on the category */}
              <span className={colorMap[result.category].color}>
                <img src={result.icon} alt={result.category} />
              </span>
              <span
                className={`font-medium ${colorMap[result.category].color}`}
              >
                {result.category}
              </span>
            </div>
            {/* Display the result score */}
            <p className="font-bold text-dark-gray-blue">
              {result.score} <span className="text-gray-400"> / 100 </span>
            </p>
          </li>
        ))
      )}
    </ul>
    {/* Button that appears at the bottom of the list; disabled when loading */}
    <button
      disabled={loading}
      className="w-full mt-6 py-4 rounded-full bg-dark-gray-blue hover:bg-gradient-to-b hover:from-light-slate-blue hover:to-light-royal-blue text-white font-medium transition-colors disabled:opacity-50 text-lg"
    >
      Continue
    </button>
  </div>
);

export default ResultSummary;
