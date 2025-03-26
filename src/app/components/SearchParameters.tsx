"use client";
import { useEffect } from "react";

export const QueryParamsHandler = ({ onParams }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    onParams({
      type: params.get("type") || "",
      view: params.get("view") || "",
      search: params.get("search") || "",
    });
  }, [onParams]);

  return null;
};
