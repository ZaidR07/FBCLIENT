"use client";
import { useSearchParams } from "next/navigation";

const QueryParamsHandler = ({ onParams }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const view = searchParams.get("view") || "";
  const search = searchParams.get("search") || "";


  // Pass the query params to the parent
  onParams({ type, view , search});

  return null; // No UI needed
};

export default QueryParamsHandler;
