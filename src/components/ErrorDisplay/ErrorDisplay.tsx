interface ErrorDisplayProps {
  error: string; // The error message to display
  onRetry: () => void; // Function to call when the retry button is clicked
}

/**
 * A component that displays an error message and a retry button.
 * It is used to handle error states within the application.
 * @param {ErrorDisplayProps} props The properties passed to the component, including error message and retry function.
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => (
  <div className="min-h-screen grid place-items-center bg-white">
    {/* Container to center the error message and button vertically and horizontally */}
    <div className="text-center p-8">
      {/* Displaying the error message */}
      <p className="text-light-red mb-4">Error: {error}</p>
      {/* Button that allows the user to retry after an error */}
      <button
        onClick={onRetry} // Function to execute when the button is clicked
        className="px-4 py-2 bg-dark-gray-blue text-white rounded-lg hover:opacity-90"
      >
        Retry
      </button>
    </div>
  </div>
);

export default ErrorDisplay;
