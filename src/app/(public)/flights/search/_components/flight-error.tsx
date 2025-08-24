import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FlightSearchError = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[80vh]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16 text-red-500 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-4xl font-bold  mb-2 text-center">
          No Flights Found!
        </h2>
        <p className="text-center mb-4">
          {`It seems we couldn't find any flights matching your criteria. Please try adjusting your
          search filters or dates.`}
        </p>
        <Button className="bg-secondary" onClick={() => router.push("../")}>
          Modify Search
        </Button>
      </motion.div>
    </div>
  );
};

export default FlightSearchError;
