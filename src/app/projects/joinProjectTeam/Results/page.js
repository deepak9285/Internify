import { useRouter } from "next/router";

const Result = () => {
  const router = useRouter();
  const { passed } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold">{passed === "true" ? "Congratulations! 🎉" : "Try Again 😞"}</h1>
      {passed === "true" ? (
        <p>You have been added to the project team. Check your email for confirmation.</p>
      ) : (
        <p>You need at least 70% to pass. Please try again.</p>
      )}
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={() => router.push("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default Result;
