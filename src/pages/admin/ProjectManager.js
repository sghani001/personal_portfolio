import React, { useState } from "react";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../store/portfolioApi";
import { Edit3, Trash2, Plus, ExternalLink } from "lucide-react";

export default function ProjectManager() {
  const { data: projects, isLoading, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [editingProject, setEditingProject] = useState(null); // null, "new", or { ...project }
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    github_url: "",
    tech_stack: "",
    problem: "",
    solution: "",
    metrics: "",
    engineering: "",
  });

  const handleStartAdd = () => {
    setForm({
      title: "",
      description: "",
      url: "",
      github_url: "",
      tech_stack: "",
      problem: "",
      solution: "",
      metrics: "",
      engineering: "",
    });
    setEditingProject("new");
  };

  const handleStartEdit = (proj) => {
    setForm({
      title: proj.title || "",
      description: proj.description || "",
      url: proj.url || "",
      github_url: proj.github_url || "",
      tech_stack: (proj.tech_stack || []).join(", "),
      problem: proj.problem || "",
      solution: proj.solution || "",
      metrics: (proj.metrics || []).join("\n"),
      engineering: (proj.engineering || []).join("\n"),
    });
    setEditingProject(proj);
  };

  const handleDelete = async (proj) => {
    if (!window.confirm(`Are you sure you want to delete "${proj.title}"?`)) return;
    try {
      await deleteProject(proj.id).unwrap();
      refetch();
    } catch (err) {
      alert("Failed to delete: " + (err.data?.error || "Unknown error"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      url: form.url,
      github_url: form.github_url,
      tech_stack: form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
      problem: form.problem,
      solution: form.solution,
      metrics: form.metrics.split("\n").map((s) => s.trim()).filter(Boolean),
      engineering: form.engineering.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingProject === "new") {
        await createProject(payload).unwrap();
      } else {
        await updateProject({ id: editingProject.id, ...payload }).unwrap();
      }
      setEditingProject(null);
      refetch();
    } catch (err) {
      alert("Failed to save project: " + (err.data?.error || "Unknown error"));
    }
  };

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (isLoading) return <div className="font-mono text-text-muted text-sm p-4">Loading projects...</div>;

  if (editingProject) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl animate-fade-up">
        <div className="bg-bg-secondary border border-border rounded-card p-5 space-y-4">
          <h2 className="font-mono text-xs text-text-muted lowercase">
            {editingProject === "new" ? "add new project" : `edit project: ${editingProject.title}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">title</label>
              <input
                required
                value={form.title}
                onChange={handleChange("title")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">tech stack (comma separated)</label>
              <input
                value={form.tech_stack}
                onChange={handleChange("tech_stack")}
                placeholder="Rails, React, PostgreSQL"
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">description</label>
            <textarea
              required
              value={form.description}
              onChange={handleChange("description")}
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">live url</label>
              <input
                value={form.url}
                onChange={handleChange("url")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">github url</label>
              <input
                value={form.github_url}
                onChange={handleChange("github_url")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">problem</label>
            <textarea
              value={form.problem}
              onChange={handleChange("problem")}
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary min-h-[60px]"
            />
          </div>

          <div>
            <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">solution</label>
            <textarea
              value={form.solution}
              onChange={handleChange("solution")}
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary min-h-[60px]"
            />
          </div>

          <div>
            <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">impact / metrics (one per line)</label>
            <textarea
              value={form.metrics}
              onChange={handleChange("metrics")}
              placeholder="Reduced load time by 30%&#10;Saved $500 monthly"
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary min-h-[80px]"
            />
          </div>

          <div>
            <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">engineering notes (one per line)</label>
            <textarea
              value={form.engineering}
              onChange={handleChange("engineering")}
              placeholder="Implemented PostgreSQL partial indexes&#10;Wrote custom AST parses"
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary min-h-[80px]"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={creating || updating}
            className="px-4 py-2 rounded-card bg-accent-primary text-bg-primary font-mono text-xs font-medium hover:brightness-110 disabled:opacity-50"
          >
            {creating || updating ? "saving..." : "save project"}
          </button>
          <button
            type="button"
            onClick={() => setEditingProject(null)}
            className="px-4 py-2 rounded-card border border-border text-text-muted font-mono text-xs hover:border-border-hover"
          >
            cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-mono text-xs text-text-muted lowercase">projects list</h2>
        <button
          onClick={handleStartAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-card border border-accent-primary text-accent-primary font-mono text-xs hover:bg-accent-primary/10 transition-colors"
        >
          <Plus size={13} />
          <span>add project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects && projects.length > 0 ? (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-bg-secondary border border-border rounded-card p-5 flex flex-col justify-between hover:border-border-hover transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-mono font-medium text-sm text-text-primary">{proj.title}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="text-text-muted hover:text-accent-secondary p-1 rounded hover:bg-bg-primary transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(proj)}
                      className="text-[#ff375f]/60 hover:text-[#ff375f] p-1 rounded hover:bg-bg-primary transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-text-secondary text-xs font-sans leading-relaxed mb-4 whitespace-pre-wrap">
                  {proj.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border/50">
                {proj.tech_stack && proj.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {proj.tech_stack.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded-pill text-[10px] font-mono bg-bg-primary text-text-muted border border-border"
                      >
                        {t.toLowerCase()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 text-[11px] font-mono text-text-muted">
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent-secondary flex items-center gap-0.5"
                    >
                      live <ExternalLink size={10} />
                    </a>
                  )}
                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent-secondary flex items-center gap-0.5"
                    >
                      github <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full font-mono text-text-muted text-xs p-6 border border-dashed border-border rounded-card text-center">
            no projects found.
          </div>
        )}
      </div>
    </div>
  );
}
