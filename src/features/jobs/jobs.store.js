import { create } from "zustand";
import { getJobsList } from "./jobs.api";

export const useJobsStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const jobs = await getJobsList();
      set({ jobs, loading: false });
      return jobs;
    } catch (e) {
      set({ error: e.message || "Error", loading: false });
      return [];
    }
  },
}));