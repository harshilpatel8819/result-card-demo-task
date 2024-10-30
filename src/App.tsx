import { useEffect, useState } from "react";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import ResultCard from "./components/ResultCard/ResultCard";
import ResultSummary from "./components/ResultSummary/ResultSummary";

export default function App() {
  // State hooks for managing results, loading status, and errors.
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // Effect hook to fetch data from a local JSON file upon component mount.
  useEffect(() => {
    // Asynchronous function to handle the data fetching.
    const fetchData = async () => {
      try {
        // Attempt to fetch data from the local server's JSON file.
        const response = await fetch(`${window.origin}/data.json`);
        if (!response.ok) {
          // If the response is not OK, throw an error.
          throw new Error("Failed to fetch data");
        }
        // Parse the JSON response into JavaScript object.
        const data = await response.json();
        // Set fetched data to results state.
        setResults(data);
      } catch (err) {
        // Handle any errors that occur during the fetch process.
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        // Set loading to false once the fetching process is complete or fails.
        setLoading(false);
      }
    };

    // Call the fetchData function.
    fetchData();
  }, []);

  // Conditional rendering to display an error message or the main content.
  if (error) {
    // Render the ErrorDisplay component if an error exists.
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );
  }

  // Main component rendering
  return (
    <div className="min-h-screen md:grid md:place-items-center bg-white font-hanken">
      <main className="md:shadow-2xl md:rounded-[2rem] md:grid md:grid-cols-2 max-w-[46rem] min-[1440px]:max-w-[56rem]">
        {/* ResultCard component to display results Card */}
        <ResultCard loading={loading} results={results} />
        {/* Summary component to display detailed results */}
        <ResultSummary loading={loading} results={results} />
      </main>
    </div>
  );
}
