import { BASE_URL } from "@/config/env";
import { http } from "@/lib/http";

export function getJobsList() {
  return http(`${BASE_URL}/api/jobs/get-list`);
}