import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileEditor from "./ProfileEditor";
import ProjectManager from "./ProjectManager";
import ExperienceManager from "./ExperienceManager";
import EducationManager from "./EducationManager";

const tabs = [
  { id: "profile", label: "profile" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    let input = "";
    const target = process.env.REACT_APP_EXIT_TRIGGER_WORD || "exit";
    const handleKeyDown = (e) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          document.activeElement.isContentEditable)
      ) {
        return;
      }
      if (e.key && e.key.length === 1) {
        input += e.key.toLowerCase();
        if (input.length > target.length) {
          input = input.substring(input.length - target.length);
        }
        if (input === target) {
          window.location.href = "/";
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let taps = 0;
    let timeout;
    const triggerText = process.env.REACT_APP_EXIT_MOBILE_TRIGGER_TEXT || "syed@admin:~";
    const tapCount = parseInt(process.env.REACT_APP_MOBILE_TAP_COUNT, 10) || 5;

    const handleGlobalClick = (e) => {
      if (e.target && e.target.textContent === triggerText) {
        taps++;
        if (timeout) clearTimeout(timeout);
        if (taps >= tapCount) {
          window.location.href = "/";
          taps = 0;
          return;
        }
        timeout = setTimeout(() => {
          taps = 0;
        }, 2000);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bg-primary p-4 md:p-8 animate-fade-up">
      <div className="max-w-content mx-auto space-y-8">
        <div className="bg-bg-secondary border border-border rounded-window">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-text-muted select-none">
                syed@admin:~
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-card border border-[#ff375f]/30 text-[#ff375f] font-mono text-xs hover:bg-[#ff375f]/10 transition-colors"
            >
              sign out
            </button>
          </div>

          <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-card px-4 py-2 text-xs font-mono transition-colors ${
                    activeTab === tab.id
                      ? "bg-accent-primary text-bg-primary font-medium"
                      : "bg-transparent text-text-muted border border-border hover:border-border-hover"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              {activeTab === "profile" && <ProfileEditor />}
              {activeTab === "projects" && <ProjectManager />}
              {activeTab === "experience" && <ExperienceManager />}
              {activeTab === "education" && <EducationManager />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
