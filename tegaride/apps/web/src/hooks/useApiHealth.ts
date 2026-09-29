import { useQuery } from "@tanstack/react-query";
import type { HealthData } from "@tegaride/shared";
import { apiFetch } from "../services/apiClient";

export function useApiHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => apiFetch<HealthData>("/health"),
    refetchInterval: 30_000,
  });
}
