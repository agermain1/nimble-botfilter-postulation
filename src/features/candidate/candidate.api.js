import { BASE_URL } from "@/config/env";
import { http } from "@/lib/http";

export function getCandidateByEmail(email) {
  return http(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  );
}

export function applyToJob(payload) {
  return http(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    body: payload,
  });
}