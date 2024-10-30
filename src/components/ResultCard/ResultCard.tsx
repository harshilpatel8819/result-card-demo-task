import { Result } from "../../types";
import { Skeleton } from "../Skeleton/Skeleton";

interface ResultHeaderProps {
  loading: boolean;
  results: Result[];
}

/**
 * Displays the header section of the result, including the average score and
 * a dynamic message based on the performance.
 * @param {ResultHeaderProps} props The component properties including loading state and results data.
 */
const ResultHeader: React.FC<ResultHeaderProps> = ({ loading, results }) => {
  // Calculate the average score from the results array if data is available.
  const average = results.length
    ? Math.round(
        results.reduce((acc, curr) => acc + curr.score, 0) / results.length
      )
    : 0;

  // Main render section
  return (
    <div className="text-center p-8 md:p-10 rounded-b-[2rem] md:rounded-[2rem] bg-gradient-to-b from-light-slate-blue to-light-royal-blue">
      {/* Main title for the results header */}
      <h1 className="text-light-lavender text-lg md:text-2xl mb-6 font-bold">
        Your Result
      </h1>
      {/* Circle display for the average score, includes skeleton during loading */}
      <div className="w-[10rem] h-[10rem] md:w-[12rem] md:h-[12rem] mx-auto rounded-full bg-gradient-to-b from-violet-blue to-persian-blue flex flex-col justify-center">
        {loading ? (
          <Skeleton className="h-[4.5rem] w-24 mx-auto rounded-xl bg-[hsl(241,100%,89%,0.2)]" />
        ) : (
          <>
            <p className="text-[3.5rem] md:text-[4.5rem] leading-tight font-extrabold text-white">
              {average}
            </p>
            <p className="text-light-lavender text-sm md:text-base font-medium">
              of 100
            </p>
          </>
        )}
      </div>
      {/* Subtitle or encouragement message based on the score */}
      <p className="text-white text-2xl md:text-[2rem] mt-6 mb-2 font-bold">
        Great
      </p>
      <p className="text-light-lavender text-lg px-4 font-medium">
        You scored higher than 65% of the people who have taken these tests.
      </p>
    </div>
  );
};

export default ResultHeader;
