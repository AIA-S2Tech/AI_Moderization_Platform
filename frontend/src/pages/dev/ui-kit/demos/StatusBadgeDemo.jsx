// UI Kit demo – StatusBadge (T-04).
// Reads the status list from config, so new statuses appear here automatically.

import React from "react";
import StatusBadge from "../../../../components/common/StatusBadge";
import { STATUS_CONFIG } from "../../../../config/statusConfig";
import { DemoSection, DemoRow } from "../DemoSection";

const statuses = Object.values(STATUS_CONFIG).map((s) => s.label);

const StatusBadgeDemo = () => (
  <DemoSection
    id="status-badge"
    title="StatusBadge"
    description="components/common/StatusBadge.jsx – colours come from config/statusConfig.js. Unknown statuses fall back to neutral grey."
  >
    <DemoRow label="All statuses (md)">
      {statuses.map((s) => (
        <StatusBadge key={s} status={s} />
      ))}
    </DemoRow>

    <DemoRow label="Size sm">
      {statuses.map((s) => (
        <StatusBadge key={s} status={s} size="sm" />
      ))}
    </DemoRow>

    <DemoRow label="Case-insensitive / unknown / empty">
      <StatusBadge status="in review" />
      <StatusBadge status="CERTIFIED" />
      <StatusBadge status="Archived" />
      <StatusBadge status="" />
    </DemoRow>
  </DemoSection>
);

export default StatusBadgeDemo;
