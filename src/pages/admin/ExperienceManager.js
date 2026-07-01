import React, { useState } from "react";
import {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} from "../../store/portfolioApi";
import { Edit3, Trash2, Plus } from "lucide-react";

export default function ExperienceManager() {
  const { data: experiences, isLoading, refetch } = useGetExperiencesQuery();
  const [createExperience, { isLoading: creating }] = useCreateExperienceMutation();
  const [updateExperience, { isLoading: updating }] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const [editingExperience, setEditingExperience] = useState(null); // null, "new", or { ...exp }
  const [form, setForm] = useState({
    company: "",
    company_url: "",
    location: "",
    role_title: "",
    duration: "",
    points: "",
    position: 0,
  });

  const handleStartAdd = () => {
    setForm({
      company: "",
      company_url: "",
      location: "",
      role_title: "",
      duration: "",
      points: "",
      position: (experiences?.length || 0) + 1,
    });
    setEditingExperience("new");
  };

  const handleStartEdit = (exp) => {
    const mainRole = exp.roles?.[0] || {};
    setForm({
      company: exp.company || "",
      company_url: exp.company_url || "",
      location: exp.location || "",
      role_title: mainRole.title || exp.role || "",
      duration: mainRole.duration || exp.duration || "",
      points: (exp.points || []).join("\n"),
      position: exp.position || 0,
    });
    setEditingExperience(exp);
  };

  const handleDelete = async (exp) => {
    if (!window.confirm(`Are you sure you want to delete the experience at "${exp.company}"?`)) return;
    try {
      await deleteExperience(exp.id).unwrap();
      refetch();
    } catch (err) {
      alert("Failed to delete: " + (err.data?.error || "Unknown error"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      company: form.company,
      company_url: form.company_url,
      location: form.location,
      roles: [{ title: form.role_title, duration: form.duration }],
      points: form.points.split("\n").map((s) => s.trim()).filter(Boolean),
      position: parseInt(form.position, 10) || 0,
    };

    try {
      if (editingExperience === "new") {
        await createExperience(payload).unwrap();
      } else {
        await updateExperience({ id: editingExperience.id, ...payload }).unwrap();
      }
      setEditingExperience(null);
      refetch();
    } catch (err) {
      alert("Failed to save experience: " + (err.data?.error || "Unknown error"));
    }
  };

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (isLoading) return <div className="font-mono text-text-muted text-sm p-4">Loading experiences...</div>;

  if (editingExperience) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl animate-fade-up">
        <div className="bg-bg-secondary border border-border rounded-card p-5 space-y-4">
          <h2 className="font-mono text-xs text-text-muted lowercase">
            {editingExperience === "new" ? "add new experience" : `edit experience: ${editingExperience.company}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">company name</label>
              <input
                required
                value={form.company}
                onChange={handleChange("company")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">company url</label>
              <input
                value={form.company_url}
                onChange={handleChange("company_url")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">location</label>
              <input
                value={form.location}
                onChange={handleChange("location")}
                placeholder="Lahore, Pakistan · Remote-friendly"
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">sorting position (asc)</label>
              <input
                type="number"
                value={form.position}
                onChange={handleChange("position")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">role / title</label>
              <input
                required
                value={form.role_title}
                onChange={handleChange("role_title")}
                placeholder="Software Engineer"
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">duration</label>
              <input
                required
                value={form.duration}
                onChange={handleChange("duration")}
                placeholder="Jun 2024 — Aug 2025"
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">points / achievements (one per line)</label>
            <textarea
              required
              value={form.points}
              onChange={handleChange("points")}
              placeholder="Managed small engineering teams...&#10;Integrated Stripe payment processing..."
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary min-h-[120px]"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={creating || updating}
            className="px-4 py-2 rounded-card bg-accent-primary text-bg-primary font-mono text-xs font-medium hover:brightness-110 disabled:opacity-50"
          >
            {creating || updating ? "saving..." : "save experience"}
          </button>
          <button
            type="button"
            onClick={() => setEditingExperience(null)}
            className="px-4 py-2 rounded-card border border-border text-text-muted font-mono text-xs hover:border-border-hover"
          >
            cancel
          </button>
        </div>
      </form>
    );
  }

  const sortedExperiences = experiences ? [...experiences].sort((a, b) => (a.position || 0) - (b.position || 0)) : [];

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-mono text-xs text-text-muted lowercase">experiences list</h2>
        <button
          onClick={handleStartAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-card border border-accent-primary text-accent-primary font-mono text-xs hover:bg-accent-primary/10 transition-colors"
        >
          <Plus size={13} />
          <span>add experience</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedExperiences.length > 0 ? (
          sortedExperiences.map((exp) => {
            const role = exp.roles?.[0] || {};
            return (
              <div
                key={exp.id}
                className="bg-bg-secondary border border-border rounded-card p-5 flex flex-col justify-between hover:border-border-hover transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-mono font-medium text-sm text-text-primary">
                        {role.title || exp.role || "No Title"}
                      </h3>
                      <p className="text-accent-secondary text-xs font-mono">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEdit(exp)}
                        className="text-text-muted hover:text-accent-secondary p-1 rounded hover:bg-bg-primary transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp)}
                        className="text-[#ff375f]/60 hover:text-[#ff375f] p-1 rounded hover:bg-bg-primary transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <p className="text-text-muted text-[11px] font-mono mb-4">
                    {role.duration || exp.duration} {exp.location ? `· ${exp.location}` : ""} | Pos: {exp.position || 0}
                  </p>

                  {exp.points && exp.points.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-text-secondary font-sans leading-relaxed list-disc list-inside">
                      {exp.points.map((p, idx) => (
                        <li key={idx} className="marker:text-accent-primary">{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full font-mono text-text-muted text-xs p-6 border border-dashed border-border rounded-card text-center">
            no experiences found.
          </div>
        )}
      </div>
    </div>
  );
}
