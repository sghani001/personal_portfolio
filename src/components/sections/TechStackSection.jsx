import React from "react";
import C from "../../theme";
import SystemFlowchart from "../SystemFlowchart";
import { FadeUp, Section } from "../UI";

export function TechStackSection() {
  return (
    <Section id="tech-stack" label="Architecture & Tools" title="System Topology" subtitle="Interactive flowchart — click any node to inspect its production role. Gold lines trace connections to the core engine." tinted>
      <FadeUp delay={80}>
        <SystemFlowchart C={C} />
      </FadeUp>
    </Section>
  );
}
