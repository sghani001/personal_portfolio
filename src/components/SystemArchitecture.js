import React, { useState } from "react";
import resumeData from "../utils/resumeData";
import "./SystemArchitecture.css";

export default function SystemArchitecture() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeNode, setActiveNode] = useState(null);

  const groups = resumeData.architecture?.groups || [];
  const selectedGroup = groups.find((g) => g.id === activeGroup);
  const selectedNode = selectedGroup?.nodes.find((n) => n.id === activeNode);

  const handleGroupClick = (groupId) => {
    setActiveGroup((prev) => (prev === groupId ? null : groupId));
    setActiveNode(null);
  };

  const handleNodeClick = (nodeId) => {
    setActiveNode((prev) => (prev === nodeId ? null : nodeId));
  };

  return (
    <div className="arch-map">
      <div className="arch-map__hub glass-card">
        <span className="arch-map__hub-label">Production Stack</span>
        <span className="arch-map__hub-name">Syed Ghani</span>
        <span className="arch-map__hub-sub">Full-ownership systems</span>
      </div>

      <div className="arch-map__spokes">
        {groups.map((group) => (
          <div
            key={group.id}
            className={`arch-spoke ${activeGroup === group.id ? "arch-spoke--active" : ""}`}
            style={{ "--spoke-color": group.color }}
          >
            <button
              type="button"
              className="arch-spoke__group glass-card"
              onClick={() => handleGroupClick(group.id)}
            >
              <span className="arch-spoke__dot" />
              {group.label}
            </button>
            {activeGroup === group.id && (
              <div className="arch-spoke__nodes">
                {group.nodes.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className={`arch-node ${activeNode === node.id ? "arch-node--active" : ""}`}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    {node.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedNode && (
        <div className="arch-inspect glass-card">
          <div className="arch-inspect__header">
            <span className="arch-inspect__title">{selectedNode.label}</span>
            <button type="button" className="arch-inspect__close" onClick={() => setActiveNode(null)} aria-label="Close">
              ×
            </button>
          </div>
          <div className="arch-inspect__body">
            <p><strong>Production role:</strong> {selectedNode.role}</p>
            <p><strong>Deployment note:</strong> {selectedNode.deploy}</p>
          </div>
        </div>
      )}
    </div>
  );
}
