import { useMemo, useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Alert from "./ui/Alert";
import Spinner from "./ui/Spinner";
import { useCandidateStore } from "@/features/candidate/candidate.store";

function isLikelyGithubRepoUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname === "github.com" && u.pathname.split("/").filter(Boolean).length >= 2;
  } catch {
    return false;
  }
}

export default function JobApplyItem({ job }) {
  const [repoUrl, setRepoUrl] = useState("");

  const submitting = useCandidateStore((s) => s.submittingByJobId[job.id]);
  const submitError = useCandidateStore((s) => s.submitErrorByJobId[job.id]);
  const submitOk = useCandidateStore((s) => s.submitOkByJobId[job.id]);
  const submitApplication = useCandidateStore((s) => s.submitApplication);

  const canSubmit = useMemo(
    () => isLikelyGithubRepoUrl(repoUrl) && !submitting,
    [repoUrl, submitting]
  );

  async function onSubmit() {
    await submitApplication({ jobId: job.id, repoUrl });
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-xs font-semibold text-white">
              NG
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-zinc-900">{job.title}</h3>
              <p className="text-xs text-zinc-500">ID: {job.id}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-xs font-medium text-zinc-700">Repositorio (GitHub)</label>
            <Input
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/tu-usuario/tu-repo"
            />
            {repoUrl && !isLikelyGithubRepoUrl(repoUrl) ? (
              <p className="text-xs text-red-600">La URL no parece un repo válido de GitHub.</p>
            ) : (
              <p className="text-xs text-zinc-500">Pegá la URL pública del Step 1.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:w-44">
         <Button onClick={onSubmit} disabled={!canSubmit} variant="secondary">
  {submitting ? <Spinner /> : null}
  Submit
</Button>

          {submitOk ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              Enviado ✅
            </div>
          ) : null}
        </div>
      </div>

      {submitError ? (
        <div className="mt-3">
          <Alert variant="error">{submitError}</Alert>
        </div>
      ) : null}
    </Card>
  );
}