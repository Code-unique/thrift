// components/SkeletonLoader.jsx
const SkeletonLoader = ({ count = 5 }) => {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"
          ></div>
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;
  