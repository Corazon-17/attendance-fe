import { useState } from "react";

export function useQueryParams<T extends object>(initialParams: T) {
  const [params, setParams] = useState<T>(initialParams);

  const updateParams = (newParams: Partial<T>) =>
    setParams((prev) => ({ ...prev, ...newParams }));

  const resetParams = () => setParams(initialParams);

  return {
    params,
    setParams,
    updateParams,
    resetParams,
  };
}
