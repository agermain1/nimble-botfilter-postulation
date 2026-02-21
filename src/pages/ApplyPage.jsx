import { useEffect, useState } from "react";
import AppShell from "@/app/AppShell";
import { useJobsStore } from "@/features/jobs/jobs.store";
import { useCandidateStore } from "@/features/candidate/candidate.store";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import JobApplyItem from "@/components/JobApplyItem";

export default function ApplyPage() {
  const [email, setEmail] = useState("");

  const jobs = useJobsStore((s) => s.jobs);
  const jobsLoading = useJobsStore((s) => s.loading);
  const jobsError = useJobsStore((s) => s.error);
  const fetchJobs = useJobsStore((s) => s.fetchJobs);

  const candidate = useCandidateStore((s) => s.candidate);
  const candLoading = useCandidateStore((s) => s.loading);
  const candError = useCandidateStore((s) => s.error);
  const fetchCandidate = useCandidateStore((s) => s.fetchCandidate);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  async function onLoadCandidate() {
    const value = email.trim();
    if (!value) return;
    await fetchCandidate(value);
  }

  return (
    <AppShell
      title="Aplicación — Bot Filter Challenge"
      subtitle="Cargá tu email, seleccioná el job y enviá la URL de tu repositorio."
    >
      {/* Responsive layout:
          - Mobile: 1 columna
          - Desktop: 2 columnas (4/8) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Candidate card */}
        <section className="lg:col-span-4">
          <Card className="p-4">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold">Tus datos</h2>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-xs font-medium text-zinc-700">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.email@ejemplo.com"
              />

              {/* En mobile: botón full width.
                  En desktop: también full (queda prolijo). */}
              <Button
                onClick={onLoadCandidate}
                disabled={!email.trim() || candLoading}
                className="w-full"
                variant="secondary"
              >
                {candLoading ? "Cargando..." : "Load candidate"}
              </Button>

              {candError ? <Alert variant="error">{candError}</Alert> : null}

              {candidate ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <div className="text-xs text-emerald-700">Candidato cargado</div>
                  <div className="mt-1 text-sm font-semibold text-emerald-900">
                    {candidate.firstName} {candidate.lastName}
                  </div>
                  <div className="text-xs text-emerald-800">{candidate.email}</div>

                  {/* En mobile: 1 col. En >=sm: 2 col */}
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-[11px] text-emerald-900/80">
                    <Meta label="uuid" value={candidate.uuid} />
                    <Meta label="candidateId" value={candidate.candidateId} />
                    <Meta label="applicationId" value={candidate.applicationId} />
                  </div>
                </div>
              ) : (
                <Alert>Necesitás cargar el candidato antes de hacer Submit.</Alert>
              )}
            </div>
          </Card>
        </section>

        {/* Jobs card */}
        <section className="lg:col-span-8">
          <Card className="p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold">Open positions</h2>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="text-xs text-zinc-500">
                  {jobsLoading ? "Cargando..." : `${jobs.length} posiciones`}
                </div>

                {/* Botón claro (no negro), responsive */}
                <Button
                  type="button"
                  onClick={fetchJobs}
                  disabled={jobsLoading}
                  variant="ghost"
                >
                  {jobsLoading ? "Actualizando..." : "Actualizar"}
                </Button>
              </div>
            </div>

            {jobsError ? (
              <div className="mt-3">
                <Alert variant="error">{jobsError}</Alert>
              </div>
            ) : null}

            <div className="mt-4 space-y-3">
              {jobsLoading && jobs.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
                  Loading jobs...
                </div>
              ) : jobs.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
                  No jobs found.
                </div>
              ) : (
                jobs.map((job) => <JobApplyItem key={job.id} job={job} />)
              )}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white/60 p-2">
      <div className="font-medium">{label}</div>
      <div className="mt-0.5 truncate text-emerald-900/70">{value}</div>
    </div>
  );
}