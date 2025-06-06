// src/hooks/useFactions.js
import { useQuery } from "@tanstack/react-query";
import { getFactions } from "@/api/fireStore";

export const useFactions = () => {
  return useQuery({
    queryKey: ["factions"],
    queryFn: getFactions,
    // 可以根据实际需要加上 cacheTime、staleTime、refetchOnWindowFocus 等配置
    // 例如：staleTime: 1000 * 60 * 5 (5 分钟内不会重新加载)
  });
};
