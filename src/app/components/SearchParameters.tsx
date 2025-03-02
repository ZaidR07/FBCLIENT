"use client";
import { useSearchParams } from "next/navigation";

const QueryParamsHandler = ({ onParams }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const view = searchParams.get("view") || "";

  // Pass the query params to the parent
  onParams({ type, view });

  return null; // No UI needed
};

export default QueryParamsHandler;
