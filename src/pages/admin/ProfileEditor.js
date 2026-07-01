import React, { useState, useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../store/portfolioApi";
import { Edit3, Check, X } from "lucide-react";

function EditableField({ label, fieldKey, value, isTextarea, onSave, saving }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);

  useEffect(() => {
    setCurrentVal(value);
  }, [value]);

  const handleSave = async () => {
    if (currentVal === value) {
      setIsEditing(false);
      return;
    }
    await onSave(fieldKey, currentVal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentVal(value);
    setIsEditing(false);
  };

  return (
    <div className="border border-border rounded-card p-4 bg-bg-secondary space-y-2 hover:border-border-hover transition-colors">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-text-muted lowercase">{label}</span>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-text-muted hover:text-accent-secondary p-1 rounded hover:bg-bg-primary transition-colors"
          >
            <Edit3 size={13} />
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="text-accent-primary hover:text-accent-primary/80 p-1 rounded hover:bg-bg-primary transition-colors disabled:opacity-50"
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-[#ff375f] hover:text-[#ff375f]/80 p-1 rounded hover:bg-bg-primary transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        isTextarea ? (
          <textarea
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
            className="w-full bg-bg-primary border border-accent-primary rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none min-h-[100px] resize-y"
            autoFocus
          />
        ) : (
          <input
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
            className="w-full bg-bg-primary border border-accent-primary rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
        )
      ) : (
        <div className="text-sm text-text-secondary font-mono whitespace-pre-wrap leading-relaxed min-h-[20px]">
          {value || <span className="text-text-disabled italic">not set</span>}
        </div>
      )}
    </div>
  );
}

export default function ProfileEditor() {
  const { data, isLoading, refetch } = useGetProfileQuery();
  const [update, { isLoading: saving }] = useUpdateProfileMutation();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        headline: data.headline || "",
        tagline: data.tagline || "",
        bio: data.bio || "",
        about_extra: data.about_extra || "",
        location: data.location || "",
        phone: data.phone || "",
        contact_email: data.contact_email || "",
        website: data.website || "",
        leetcode_url: data.leetcode_url || "",
        hero_bullets: (data.hero_bullets || []).join("\n"),
      });
    }
  }, [data]);

  const handleSaveField = async (key, val) => {
    const updatedForm = {
      ...form,
      [key]: val,
    };
    setForm(updatedForm);

    const body = {
      ...updatedForm,
      hero_bullets: updatedForm.hero_bullets.split("\n").filter(Boolean),
    };

    try {
      await update(body).unwrap();
      refetch();
    } catch (err) {
      alert("Failed to save: " + (err.data?.error || "Unknown error"));
      refetch();
    }
  };

  if (isLoading) return <div className="font-mono text-text-muted text-sm p-4">Loading profile...</div>;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* About Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="font-mono text-xs text-text-muted lowercase">about</h3>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EditableField
            label="name"
            fieldKey="name"
            value={form.name}
            onSave={handleSaveField}
            saving={saving}
          />
          <EditableField
            label="tagline"
            fieldKey="tagline"
            value={form.tagline}
            onSave={handleSaveField}
            saving={saving}
          />
        </div>
        <EditableField
          label="headline"
          fieldKey="headline"
          value={form.headline}
          onSave={handleSaveField}
          saving={saving}
        />
        <EditableField
          label="bio"
          fieldKey="bio"
          value={form.bio}
          isTextarea
          onSave={handleSaveField}
          saving={saving}
        />
        <EditableField
          label="about extra"
          fieldKey="about_extra"
          value={form.about_extra}
          isTextarea
          onSave={handleSaveField}
          saving={saving}
        />
      </div>

      {/* Contact Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="font-mono text-xs text-text-muted lowercase">contact</h3>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EditableField
            label="location"
            fieldKey="location"
            value={form.location}
            onSave={handleSaveField}
            saving={saving}
          />
          <EditableField
            label="phone"
            fieldKey="phone"
            value={form.phone}
            onSave={handleSaveField}
            saving={saving}
          />
          <EditableField
            label="contact email"
            fieldKey="contact_email"
            value={form.contact_email}
            onSave={handleSaveField}
            saving={saving}
          />
          <EditableField
            label="website / portfolio url"
            fieldKey="website"
            value={form.website}
            onSave={handleSaveField}
            saving={saving}
          />
        </div>
      </div>

      {/* Links & Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Links */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-xs text-text-muted lowercase">links</h3>
            <span className="flex-1 h-px bg-border" />
          </div>
          <EditableField
            label="leetcode url"
            fieldKey="leetcode_url"
            value={form.leetcode_url}
            onSave={handleSaveField}
            saving={saving}
          />
        </div>

        {/* Hero bullets */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-xs text-text-muted lowercase">hero bullets (one per line)</h3>
            <span className="flex-1 h-px bg-border" />
          </div>
          <EditableField
            label="hero bullets"
            fieldKey="hero_bullets"
            value={form.hero_bullets}
            isTextarea
            onSave={handleSaveField}
            saving={saving}
          />
        </div>
      </div>
    </div>
  );
}
