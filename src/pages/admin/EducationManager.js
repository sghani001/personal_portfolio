import React, { useState } from "react";
import {
  useGetEducationsQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} from "../../store/portfolioApi";
import { Edit3, Trash2, Plus } from "lucide-react";

export default function EducationManager() {
  const { data: educations, isLoading, refetch } = useGetEducationsQuery();
  const [createEducation, { isLoading: creating }] = useCreateEducationMutation();
  const [updateEducation, { isLoading: updating }] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const [editingEducation, setEditingEducation] = useState(null); // null, "new", or { ...edu }
  const [form, setForm] = useState({
    school: "",
    degree: "",
    field: "",
    duration: "",
    gpa: "",
    position: 0,
  });

  const handleStartAdd = () => {
    setForm({
      school: "",
      degree: "",
      field: "",
      duration: "",
      gpa: "",
      position: (educations?.length || 0) + 1,
    });
    setEditingEducation("new");
  };

  const handleStartEdit = (edu) => {
    setForm({
      school: edu.institution || edu.school || "",
      degree: edu.degree || "",
      field: edu.field || "",
      duration: edu.duration || "",
      gpa: edu.gpa || "",
      position: edu.position || 0,
    });
    setEditingEducation(edu);
  };

  const handleDelete = async (edu) => {
    if (!window.confirm(`Are you sure you want to delete "${edu.degree}" from "${edu.institution || edu.school}"?`)) return;
    try {
      await deleteEducation(edu.id).unwrap();
      refetch();
    } catch (err) {
      alert("Failed to delete: " + (err.data?.error || "Unknown error"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      school: form.school,
      degree: form.degree,
      field: form.field,
      duration: form.duration,
      gpa: form.gpa || null,
      position: parseInt(form.position, 10) || 0,
    };

    try {
      if (editingEducation === "new") {
        await createEducation(payload).unwrap();
      } else {
        await updateEducation({ id: editingEducation.id, ...payload }).unwrap();
      }
      setEditingEducation(null);
      refetch();
    } catch (err) {
      alert("Failed to save education: " + (err.data?.error || "Unknown error"));
    }
  };

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (isLoading) return <div className="font-mono text-text-muted text-sm p-4">Loading education...</div>;

  if (editingEducation) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl animate-fade-up">
        <div className="bg-bg-secondary border border-border rounded-card p-5 space-y-4">
          <h2 className="font-mono text-xs text-text-muted lowercase">
            {editingEducation === "new" ? "add new education" : `edit education: ${editingEducation.degree}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">institution / school</label>
              <input
                required
                value={form.school}
                onChange={handleChange("school")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">degree (e.g. B.S. Computer Science)</label>
              <input
                required
                value={form.degree}
                onChange={handleChange("degree")}
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">field of study</label>
              <input
                value={form.field}
                onChange={handleChange("field")}
                placeholder="Computer Science"
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">duration</label>
              <input
                required
                value={form.duration}
                onChange={handleChange("duration")}
                placeholder="2020 — 2024"
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">gpa</label>
              <input
                value={form.gpa}
                onChange={handleChange("gpa")}
                placeholder="3.8"
                className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">sorting position (asc)</label>
            <input
              type="number"
              value={form.position}
              onChange={handleChange("position")}
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary max-w-[150px]"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={creating || updating}
            className="px-4 py-2 rounded-card bg-accent-primary text-bg-primary font-mono text-xs font-medium hover:brightness-110 disabled:opacity-50"
          >
            {creating || updating ? "saving..." : "save education"}
          </button>
          <button
            type="button"
            onClick={() => setEditingEducation(null)}
            className="px-4 py-2 rounded-card border border-border text-text-muted font-mono text-xs hover:border-border-hover"
          >
            cancel
          </button>
        </div>
      </form>
    );
  }

  const sortedEducations = educations ? [...educations].sort((a, b) => (a.position || 0) - (b.position || 0)) : [];

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-mono text-xs text-text-muted lowercase">education list</h2>
        <button
          onClick={handleStartAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-card border border-accent-primary text-accent-primary font-mono text-xs hover:bg-accent-primary/10 transition-colors"
        >
          <Plus size={13} />
          <span>add education</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedEducations.length > 0 ? (
          sortedEducations.map((edu) => (
            <div
              key={edu.id}
              className="bg-bg-secondary border border-border rounded-card p-5 flex flex-col justify-between hover:border-border-hover transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-mono font-medium text-sm text-text-primary">{edu.degree}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleStartEdit(edu)}
                      className="text-text-muted hover:text-accent-secondary p-1 rounded hover:bg-bg-primary transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(edu)}
                      className="text-[#ff375f]/60 hover:text-[#ff375f] p-1 rounded hover:bg-bg-primary transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-accent-secondary text-xs font-mono mb-2">{edu.institution || edu.school}</p>
                {edu.field && (
                  <p className="text-text-secondary text-xs font-mono lowercase mb-1">
                    field: {edu.field}
                  </p>
                )}
                <p className="text-text-muted text-[11px] font-mono">
                  {edu.duration} {edu.gpa ? `· GPA: ${edu.gpa}` : ""} | Pos: {edu.position || 0}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full font-mono text-text-muted text-xs p-6 border border-dashed border-border rounded-card text-center">
            no education entries found.
          </div>
        )}
      </div>
    </div>
  );
}
