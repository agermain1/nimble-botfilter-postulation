import { create } from "zustand";
import { applyToJob, getCandidateByEmail } from "./candidate.api";

export const useCandidateStore = create((set, get) => ({
  candidate: null,
  loading: false,
  error: null,

  submittingByJobId: {},
  submitErrorByJobId: {},
  submitOkByJobId: {},

  fetchCandidate: async (email) => {
    set({ loading: true, error: null, candidate: null });
    try {
      const candidate = await getCandidateByEmail(email);
      set({ candidate, loading: false });
      return candidate;
    } catch (e) {
      set({ error: e.message || "Error", loading: false });
      return null;
    }
  },

  submitApplication: async ({ jobId, repoUrl }) => {
    const { candidate } = get();
    if (!candidate) throw new Error("Cargá el candidato (Step 2) antes de enviar.");

    set((s) => ({
      submittingByJobId: { ...s.submittingByJobId, [jobId]: true },
      submitErrorByJobId: { ...s.submitErrorByJobId, [jobId]: null },
      submitOkByJobId: { ...s.submitOkByJobId, [jobId]: false },
    }));

    try {
        const jobIdNum = Number(jobId);
        const candidateIdNum = Number(candidate.candidateId);

        if (!candidate.applicationId) {
            throw new Error("Falta applicationId en el candidato");
        }
        if (Number.isNaN(jobIdNum)) {
            throw new Error("jobId inválido");
        }
        if (Number.isNaN(candidateIdNum)) {
            throw new Error("candidateId inválido");
        }

        const payload = {
            uuid: String(candidate.uuid),
            applicationId: String(candidate.applicationId),
            jobId: String(jobId),
            candidateId: String(candidate.candidateId),
            repoUrl: String(repoUrl),
        };

      const res = await applyToJob(payload);

      set((s) => ({
        submittingByJobId: { ...s.submittingByJobId, [jobId]: false },
        submitOkByJobId: { ...s.submitOkByJobId, [jobId]: true },
      }));

      return res;
    } catch (e) {
      set((s) => ({
        submittingByJobId: { ...s.submittingByJobId, [jobId]: false },
        submitErrorByJobId: { ...s.submitErrorByJobId, [jobId]: e.message || "Error" },
      }));
      throw e;
    }
  },
}));