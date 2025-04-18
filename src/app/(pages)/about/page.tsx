"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <>
      <nav
        className="w-full h-[8vh] shadow-lg flex items-center gap-2 px-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="text-3xl font-extrabold text-[#f97316]">&larr;</span>
        <span className="text-[#f97316] text-2xl mt-2">Back</span>
      </nav>

      <div className="w-full min-h-[80vh] flex justify-center items-center">
        <span className="text-3xl">Coming Soon</span>
      </div>
    </>
  );
};

export default page;
