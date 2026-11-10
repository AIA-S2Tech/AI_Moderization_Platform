import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationControls from "../components/common/paginationControls";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Badge,
  Button,
  Flex,
  Text,
  Box,
  VStack,
  ModalFooter,
  CardHeader,
  HStack,
  Select

} from "@chakra-ui/react";

const HomeDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("all");
  const [error, setError] = useState(null);
  const storedUser = localStorage.getItem("user");
  let userInfo = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const openModal = (title, type, data = []) => {
      setModalTitle(title);
      setModalType(type);
      setModalData(data);
      setSearch("");
      setCurrentPage(1);
      setIsModalOpen(true);
  };

  const filteredData = modalData.filter((item) =>
      JSON.stringify(item)
          .toLowerCase()
          .includes(search.toLowerCase())
  );

  const totalPages = Math.max(
      1,
      Math.ceil(filteredData.length / recordsPerPage)
  );

  const paginatedData = filteredData.slice(
      (currentPage - 1) * recordsPerPage,
      currentPage * recordsPerPage
  );

  const closeModal = () => {
      setIsModalOpen(false);
      setSearch("");
      setCurrentPage(1);
  };
  const periodLabels = { all: "All Time", weekly: "This Week", monthly: "This Month" };

  const fetchDashboard = async (selectedPeriod = period) => {
    try {
      setLoading(true);
      console.log(process.env.REACT_APP_API_URL);
    console.log("API URL =", process.env.REACT_APP_API_URL);

    const url = `${process.env.REACT_APP_API_URL}/api/jobs/dashboard/jobs`;
    
    console.log("Request URL =", url);
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/home?period=${selectedPeriod}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setDashboard(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard(period);
    const interval = setInterval(() => fetchDashboard(period), 60000);
    return () => clearInterval(interval);
  }, [period]);

  // ─── ICONS ────────────────────────────────────────────────────────────────
  const Icon = ({ name, color = "#374151", size = 16 }) => {
    const paths = {
      bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
      mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
      calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
      check: <><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
      user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
      star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
      send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
      briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
      target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
      users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
      sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />,
      search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
      filedoc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
      trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M17 4h3a3 3 0 0 1-3 5M7 4H4a3 3 0 0 0 3 5" /></>,
      clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
      alert: <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
      chevronRight: <polyline points="9 18 15 12 9 6" />,
      briefcaseSolid: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
    };
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {paths[name] || null}
      </svg>
    );
  };
  const FunnelIcon = ({ color = "#2563eb", size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

  // ─── SHARED PRIMITIVES ──────────────────────────────────────────────────────
  const Card = ({ children, style = {}, hoverable = false, onClick }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => hoverable && setHovered(true)}
        onMouseLeave={() => hoverable && setHovered(false)}
        style={{
          background: "#fff",
          borderRadius: 12,
          border: `1px solid ${hoverable && hovered ? "#bfdbfe" : "#e8eaf0"}`,
          padding: 18,
          transition: "border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
          boxShadow: hoverable && hovered ? "0 8px 20px rgba(37,99,235,0.10)" : "0 1px 2px rgba(16,24,40,0.02)",
          transform: hoverable && hovered ? "translateY(-2px)" : "none",
          cursor: onClick ? "pointer" : "default",
          ...style,
        }}
      >
        {children}
      </div>
    );
  };

  const ClickableRow = ({ children, onClick, style = {} }) => {
    const [hovered, setHovered] = useState(false);
    const active = !!onClick;
    return (
      <div
        onClick={active ? onClick : undefined}
        onMouseEnter={() => active && setHovered(true)}
        onMouseLeave={() => active && setHovered(false)}
        style={{
          borderRadius: 8,
          cursor: active ? "pointer" : "default",
          background: active && hovered ? "#f8fafc" : "transparent",
          transform: active && hovered ? "translateX(2px)" : "none",
          transition: "background-color 0.15s ease, transform 0.15s ease",
          ...style,
        }}
      >
        {children}
      </div>
    );
  };

  const SectionHeader = ({ number, title, right }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        {number && (
          <span style={{
            width: 20, height: 20, borderRadius: "50%", background: "#2563eb", color: "#fff",
            fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>{number}</span>
        )}
        <span style={{ fontWeight: 700, fontSize: 13.5, letterSpacing: 0.2, textTransform: "uppercase" }}>{title}</span>
      </div>
      {right}
    </div>
  );

  const ViewAllLink = ({ label = "View all", onClick }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <span
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontSize: 12, color: "#2563eb", fontWeight: 600, cursor: "pointer",
          textDecoration: hovered ? "underline" : "none",
        }}
      >
        {label}
      </span>
    );
  };

  const Topbar = () => (
    <div className="hd-topbar" style={{ background: "#fff", borderBottom: "1px solid #e8eaf0", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, background: "#eff6ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="briefcaseSolid" color="#2563eb" size={20} />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
            Welcome, {dashboard?.user_name || "there"}
          </h1>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2, marginBottom: 0 }}>
            Here's what's happening with your recruiting pipeline today.
          </p>
        </div>
      </div>
      {dashboard?.jobs_close_to_deadline > 0 && (
        <div
          onClick={() => navigate("/jobs?filter=closing-soon")}
          style={{
            background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 10,
            padding: "9px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
          }}
        >
          <Icon name="bell" color="#d97706" size={15} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#92400e" }}>
            {dashboard.jobs_close_to_deadline} jobs close to deadline
          </span>
          {/* <ViewAllLink
            label="View All"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/jobs?filter=closing-soon");
            }}
          /> */}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 16 }}>
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>Period</span>
        <Select
          size="sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          width="125px"
          height="34px"
          fontSize="12px"
          borderRadius="8px"
          background="#fff"
        >
          <option value="all">All Time</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </Select>
      </div>
    </div>
  );

  const kpiIconMap = {
    open_client_jobs: "briefcase",
    high_priority_jobs: "star",
    active_pipeline_candidates: "users",
    ai_recommended_matches: "target",
    candidates_awaiting_review: "search",
    candidates_ready_for_submission: "send",
    interviews: "calendar",
    placements: "trophy",
  };
  const kpiColorMap = {
    open_client_jobs: { bg: "#eff6ff", color: "#2563eb" },
    high_priority_jobs: { bg: "#fef2f2", color: "#dc2626" },
    active_pipeline_candidates: { bg: "#f5f3ff", color: "#7c3aed" },
    ai_recommended_matches: { bg: "#f0fdf4", color: "#16a34a" },
    candidates_awaiting_review: { bg: "#eff6ff", color: "#2563eb" },
    candidates_ready_for_submission: { bg: "#eff6ff", color: "#2563eb" },
    interviews: { bg: "#f5f3ff", color: "#7c3aed" },
    placements: { bg: "#fffbeb", color: "#d97706" },
  };
  const kpiRouteMap = {
    open_client_jobs: "/jobs?status=active",
    high_priority_jobs: "/jobs?priority=high",
    active_pipeline_candidates: "/candidate/all",
    ai_recommended_matches: "/jobs?filter=new-matches",
    candidates_awaiting_review: "/candidate/sourced",
    candidates_ready_for_submission: "/candidate/finalize",
    interviews: "/recruitment/Interview-Tracking",
    placements: "/recruitment/filledjobs/job",
  };

  const aiImpactRouteMap = {
    resumes_analyzed: "/candidate/all",
    submissions_created: "/candidate/finalize",
    outreach_emails_generated: "/candidate/response",
    placements_made: "/candidate/all?status=hired",
    ai_matches_identified: "/jobs?filter=new-matches",
  };

  const jobStatusRouteMap = {
    "Draft": "/jobs?status=draft",
    "Active": "/jobs?status=active",
    "High Priority": "/jobs?priority=high",
    "Closing This Week": "/jobs?filter=closing-soon",
    "Filled (This Month)": "/jobs?status=filled",
  };

  const pipelineStageRouteMap = {
    "Sourced": "/candidate/all",
    "Outreach Sent": "/candidate/sourced",
    "Interested": "/candidate/response",
    "Finalized": "/candidate/finalize",
    "Submitted": "/candidate/finalize?status=submitted",
    "Placed": "/candidate/all?status=hired",
  };

  const outreachSummary = dashboard?.finalized_outreach_summary || {
    needed_next_week: 0,
    confirmed_this_week: 0,
    outstanding_7_or_less: 0,
    outstanding_14_or_more: 0,
    outstanding_30_or_more: 0,
    removed_this_week: 0,
  };

  const EmptyState = ({ message }) => (
  <div
    style={{
      height: 250,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#9ca3af",
      fontSize: 13,
      fontWeight: 500,
    }}
  >
    {message}
  </div>
);
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: 20, fontWeight: 600, fontFamily: "'Inter', -apple-system, sans-serif" }}>
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: 40, color: "red", fontFamily: "'Inter', -apple-system, sans-serif" }}>Failed to load dashboard.</div>;
  }

  const d = dashboard || {};
  const kpis = d.kpis || [];
  const actionCenter = d.action_center || [];
  const topOpportunities = d.top_opportunities || [];
  const topCandidatesNoSubmission = d.top_candidates_no_submission || [];
  const pipelineHealth = d.pipeline_health || [];
  const jobStatusSummary = d.job_status_summary || [];
  const jobsAtRisk = d.jobs_at_risk || [];
  const aiImpact = d.ai_impact || {};
  const recentActivity = d.recent_activity || [];
  const candidateInventory = d.candidate_inventory || [];
  const recruitmentPipeline = d.recruitment_pipeline || [];
  const interviewDetails = d.interview_details || [];
  const placementDetails = d.placement_details || [];

  const maxPipelineCount = Math.max(...pipelineHealth.map((p) => p.count), 1);

  const impactTiles = [
    { key: "resumes_analyzed", icon: "filedoc", color: "#2563eb", bg: "#eff6ff", label: "Deep Scores Completed", value: aiImpact.resumes_analyzed },
    { key: "submissions_created", icon: "check", color: "#d97706", bg: "#fffbeb", label: "Submissions Created", value: aiImpact.submissions_created },
    { key: "outreach_emails_generated", icon: "mail", color: "#16a34a", bg: "#f0fdf4", label: "Outreach Emails Generated", value: aiImpact.outreach_emails_generated },
    { key: "placements_made", icon: "trophy", color: "#7c3aed", bg: "#f5f3ff", label: "Placements Made", value: aiImpact.placements_made },
    { key: "ai_matches_identified", icon: "target", color: "#0d9488", bg: "#f0fdfa", label: "AI Matches Identified", value: aiImpact.ai_matches_identified },
    { key: "recruiter_hours_saved", icon: "clock", color: "#6366f1", bg: "#eef2ff", label: "Recruiter Hours Saved", value: aiImpact.recruiter_hours_saved },
  ];

  const quickActions = [
    { title: "Review Jobs", route: "/jobs" },
    { title: "Review\nCandidates", route: "/candidate/sourced" },
    { title: "AI Matches", route: "/jobs?filter=new-matches" },
    { title: "Responses", route: "/candidate/response" },
    { title: "Finalize\nCandidate", route: "/candidate/finalize" },
    { title: "Activity Log", route: "/activity" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        .hd-grid-kpi { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 12px; }
        .hd-grid-row3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: start; }
        .hd-grid-impact { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .hd-grid-jobhealth { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 1200px) {
          .hd-grid-kpi { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
        }
        @media (max-width: 1024px) {
          .hd-grid-row3 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .hd-grid-kpi { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .hd-grid-impact { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .hd-grid-jobhealth { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .hd-topbar { flex-wrap: wrap; row-gap: 10px; }
        }
      `}</style>
      <Topbar />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18, background: "#f8f9fb" }}>

        {/* ROW 0: 6 KPI Cards */}
        <div className="hd-grid-kpi">
          {kpis.map((k) => {
            const colors = kpiColorMap[k.key] || { bg: "#f3f4f6", color: "#374151" };
            const isNegative = (k.delta || 0) < 0;
            const route = kpiRouteMap[k.key];
            return (
              <Card
                key={k.key}
                hoverable={!!route || k.key === "interviews" || k.key === "placements"}
                onClick={() => {
                  if (k.key === "interviews") {
                    openModal("Interview Details", "interviews", interviewDetails);
                    return;
                  }
                  if (k.key === "placements") {
                    openModal("Placement Details", "placements", placementDetails);
                    return;
                  }
                  if (route) navigate(route);
                }}
                style={{ padding: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={kpiIconMap[k.key]} color={colors.color} size={15} />
                  </div>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 10.5, color: "#6b7280", fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", wordBreak: "break-word" }}>
                    {k.label}
                  </span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1a1a2e" }}>
                  {(k.value ?? 0).toLocaleString()}
                </div>
              </Card>
            );
          })}
        </div>

        {/* ROW 1: Recruiter Action Center | AI Job Opportunities | Pipeline Health */}
        <div className="hd-grid-row3">

          {/* Recruiter Action Center */}
          <Card  style={{
        minHeight: 380
    }}>
            <SectionHeader
                  number="1"
                  title="Recruiter Action Center"
                  right={
                      <ViewAllLink
                          label="View All"
                          onClick={() =>
                              openModal(
                                  "Recruiter Action Center",
                                  "action_center",
                                  actionCenter
                              )
                          }
                      />
                  }
              />
            {actionCenter.slice(0,5).map((item, i) => (
              <ClickableRow
                key={item.key || i}
                onClick={item.route ? () => navigate(item.route) : undefined}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "11px 8px",
                  marginBottom: 2,
                  borderBottom: i < actionCenter.length - 1 ? "1px solid #f3f4f6" : "none",
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={item.icon} color={item.color} size={15} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1a1a2e" }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{item.subtitle}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{item.count}</span>
                <Icon name="chevronRight" color="#d1d5db" size={14} />
              </ClickableRow>
            ))}

          </Card>

          {/* AI Job Opportunities */}
          <Card  style={{
        minHeight: 380
    }}>
            <SectionHeader
              number="2"
              title="AI Job Opportunities"
              right={<ViewAllLink
                label="View All"
                onClick={() =>
                    openModal(
                    "AI Job Opportunities",
                    "top_jobs",
                    topOpportunities
                  )
                }
            />}
            />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 600, textAlign: "left", paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>Job Title</th>
                  <th style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 600, textAlign: "left", paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>Matches </th>
                  <th style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 600, textAlign: "left", paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>Best Score</th>
                </tr>
              </thead>
              <tbody>
                {topOpportunities.slice(0,5).map((r, i) => (
                  <tr
                    key={r.job_id}
                    onClick={() => navigate(`/jobs/${r.job_id}`)}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ fontSize: 12.5, padding: "8px 6px 8px 0", color: "#1a1a2e", fontWeight: 600, borderBottom: i < topOpportunities.length - 1 ? "1px solid #f3f4f6" : "none" }}>{r.job_title}</td>
                    <td style={{ fontSize: 12.5, padding: "8px 0", borderBottom: i < topOpportunities.length - 1 ? "1px solid #f3f4f6" : "none" }}>{r.matches}</td>
                    <td style={{ padding: "8px 0", borderBottom: i < topOpportunities.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "3px 8px", borderRadius: 20 }}>
                        {r.best_match_score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 3. Pipeline Health */}
          <Card  style={{
        minHeight: 380
    }}>
            <SectionHeader
              number="3"
              title="Recruitment Pipeline Health"
              right={
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <ViewAllLink
                          label="View All"
                          onClick={() =>
                              openModal(
                                  "Pipeline Health",
                                  "pipeline",
                                  pipelineHealth
                              )
                          }
                      />
                  </div>
              }
            />
            
            {pipelineHealth.slice(0,6).map((stage, i) => {
              const widthPct = 35 + (stage.count / maxPipelineCount) * 65;
              const route = pipelineStageRouteMap[stage.label];
              return (
                <ClickableRow
                  key={stage.label}
                  onClick={route ? () => navigate(route) : undefined}
                  style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "2px 4px" }}
                >
                  <div style={{ width: 90, fontSize: 11.5, color: "#374151", flexShrink: 0 }}>{stage.label}</div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <div style={{
                      width: `${widthPct}%`, background: stage.color, color: "#fff", fontSize: 12.5, fontWeight: 700,
                      textAlign: "center", padding: "7px 0", borderRadius: 4,
                    }}>
                      {stage.count.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ width: 54, flexShrink: 0, textAlign: "right" }}>
                    {stage.conversion !== null && (
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 6px", borderRadius: 10 }}>
                        {stage.conversion}%
                      </span>
                    )}
                  </div>
                </ClickableRow>
              );
            })}
            <div style={{ marginTop: 12, background: "#eff6ff", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#374151", fontWeight: 600 }}>Overall Placement Rate:</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#2563eb" }}>{d.overall_placement_rate ?? 0}%</span>
            </div>
          </Card>

        </div>

        {/* ROW 2: Top Candidates Without Submission | AI Impact | Recent Activity */}
        <div className="hd-grid-row3">

          {/* Top Candidates Without Submission */}
          <Card  style={{
        minHeight: 360
    }}>
            <SectionHeader
              number="4"
              title="Top Candidates Without Submission"
              right={
                  <ViewAllLink
                      label="View All"
                      onClick={() =>
                          openModal(
                              "Top Candidates Without Submission",
                              "top_candidates",
                              topCandidatesNoSubmission
                          )
                      }
                  />
              }
          />
          {topCandidatesNoSubmission.length === 0 ? (
                    <EmptyState message="No Finalized candidates available" />
                  ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 600, textAlign: "left", paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>Candidate</th>
                  <th style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 600, textAlign: "left", paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>Job Family</th>
                  <th style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 600, textAlign: "left", paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>Best Match Score</th>
                </tr>
              </thead>
              <tbody>
                {topCandidatesNoSubmission.slice(0,3).map((r, i) => (
                  <tr
                    key={r.candidate_id}
                    onClick={() => navigate(`/candidate/${r.candidate_id}`)}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ fontSize: 12.5, padding: "8px 6px 8px 0", color: "#2563eb", fontWeight: 600, borderBottom: i < topCandidatesNoSubmission.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                      {r.candidate_name}
                    </td>
                    <td style={{ fontSize: 12.5, padding: "8px 0", borderBottom: i < topCandidatesNoSubmission.length - 1 ? "1px solid #f3f4f6" : "none" }}>{r.job_family}</td>
                    <td style={{ padding: "8px 0", borderBottom: i < topCandidatesNoSubmission.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "3px 8px", borderRadius: 20 }}>
                        {r.best_match_score}%
                      </span>
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>)}
          </Card>

          {/* AI Impact */}
          <Card  style={{
        minHeight: 360
    }}>
            <SectionHeader
              number="5"
              title={<span>AI Impact <span style={{ fontWeight: 500, color: "#9ca3af", textTransform: "none" }}>({periodLabels[period]})</span></span>}
              right={
                  <ViewAllLink
                      label="View All"
                      onClick={() =>
                          openModal(
                              "AI Impact (This Month)",
                              "ai_impact",
                              impactTiles
                          )
                      }
                  />
              }
            />
            <div className="hd-grid-impact">
              {impactTiles.slice(0,5).map((tile, i) => {
                const route = aiImpactRouteMap[tile.key];
                return (
                  <ClickableRow
                    key={i}
                    onClick={route ? () => navigate(route) : undefined}
                    style={{ display: "flex", alignItems: "center", gap: 10, background: "#fafafa", borderRadius: 8, padding: "10px 12px" }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: tile.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={tile.icon} color={tile.color} size={15} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.1 }}>{(tile.value ?? 0).toLocaleString()}</div>
                      <div style={{ fontSize: 10.5, color: "#6b7280" }}>{tile.label}</div>
                    </div>
                  </ClickableRow>
                );
              })}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card  style={{
        minHeight: 360
    }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 13.5, textTransform: "uppercase", letterSpacing: 0.2 }}>Recent Activity</span>
              <ViewAllLink
                  onClick={() =>
                      openModal(
                          "Recent Activity",
                          "recent_activity",
                          recentActivity
                      )
                  }
              />
            </div>
            {recentActivity.slice(0,5).map((a, i) => (
              <ClickableRow
                key={i}
                onClick={a.route ? () => navigate(a.route) : undefined}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 4px",
                  borderBottom: i < recentActivity.length - 1 ? "1px solid #f3f4f6" : "none",
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Icon name={a.icon} color={a.color} size={13} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "#1a1a2e" }}>{a.text}</div>
                </div>
                <span style={{ fontSize: 10.5, color: "#9ca3af", whiteSpace: "nowrap" }}>{a.time_ago}</span>
              </ClickableRow>
            ))}
          </Card>

        </div>

        {/* ROW 3: Job Health & Quick Actions (Two Equal Width Cards via 2-column Grid) */}
        <div className="hd-grid-row3">

          {/* Job Health */}
          <Card  style={{
        minHeight: 380
    }}>
            <SectionHeader number="6" title="Job Health" />
            <div className="hd-grid-jobhealth">
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9ca3af", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <span>JOB STATUS SUMMARY</span>
                  <ViewAllLink
                      onClick={() =>
                          openModal(
                              "Job Status Summary",
                              "job_status",
                              jobStatusSummary
                          )
                      }
                  />
                </div>
                {jobStatusSummary.slice(0,5).map((s) => {
                  const route = jobStatusRouteMap[s.label];
                  return (
                    <ClickableRow
                      key={s.label}
                      onClick={route ? () => navigate(route) : undefined}
                      style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9, padding: "2px 4px" }}
                    >
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 11.5, color: "#374151" }}>{s.label}</span>
                      <span style={{ fontWeight: 700, fontSize: 12.5 }}>{s.count}</span>
                    </ClickableRow>
                  );
                })}
              </div>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9ca3af", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <span>JOBS AT RISK</span>
                  <ViewAllLink
                      onClick={() =>
                          openModal(
                              "Jobs At Risk",
                              "jobs_risk",
                              jobsAtRisk
                          )
                      }
                  />
                </div>
                {jobsAtRisk.slice(0,5).map((j) => (
                  <ClickableRow
                    key={j.job_id}
                    onClick={() => navigate(`/jobs/${j.job_id}`)}
                    style={{ display: "flex", gap: 7, marginBottom: 10, padding: "3px 4px" }}
                  >
                    <Icon name="alert" color="#dc2626" size={13} />
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: "#1a1a2e" }}>{j.job_title}</div>
                      <div style={{ fontSize: 10.5, color: "#dc2626" }}>{j.risk_reason}</div>
                    </div>
                  </ClickableRow>
                ))}
              </div>
            </div>
          </Card>

          {/* Finalized Outreach Summary */}
          <Card style={{ minHeight: 380 }}>
            <SectionHeader
              title="Finalized Candidates Outreach Summary"
              avatar={<Icon name="mail" color="#2563eb" size={18} />}
            />
            {[
              { label: "Candidates Needed Outreach next week", value: outreachSummary.needed_next_week },
              { label: "Candidates Confirmed this week", value: outreachSummary.confirmed_this_week },
              { label: "Candidates Outstanding 7 or less Days", value: outreachSummary.outstanding_7_or_less },
              { label: "Candidates Outstanding 14 or more Days", value: outreachSummary.outstanding_14_or_more },
              { label: "Candidates Outstanding 30 or more Days", value: outreachSummary.outstanding_30_or_more },
              { label: "Candidates Removed this week", value: outreachSummary.removed_this_week },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 4px",
                  borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
                }}
              >
                <span style={{ fontSize: 12.5, color: "#374151" }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{row.value ?? 0}</span>
              </div>
            ))}
          </Card>

          {/* Candidate Inventory by Job Family */}
          <Card  style={{
        minHeight: 380
    }}>
  <SectionHeader
  title="Candidate Inventory by Job Family"
  avatar={<Icon name="users" color="#2563eb" size={18} />}
/>

  {candidateInventory.map((row, i) => (
    <div
      key={i}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 9,
      }}
    >
      <span
        style={{
          width: 110,
          textAlign: "right",
          fontSize: 11.5,
          color: "#374151",
          flexShrink: 0,
        }}
      >
        {row.family}
      </span>

      <div
        style={{
          flex: 1,
          height: 14,
          background: "#f3f4f6",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(row.count / Math.max(row.max, 1)) * 100}%`,
            height: "100%",
            background: row.color,
            borderRadius: 4,
          }}
        />
      </div>

      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#1a1a2e",
          minWidth: 28,
          textAlign: "right",
        }}
      >
        {row.count}
      </span>
    </div>
  ))}
</Card>

          {/* Quick Actions */}
          {/* <Card style={{
        width:1220
    }}>
            <SectionHeader title="Quick Actions" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, overflowX: "auto", padding: "4px 0" }}>
              {quickActions.map((action, index) => (
                <React.Fragment key={action.route}>
                  <div
                    onClick={() => navigate(action.route)}
                    style={{
                      flex: 1, minWidth: 75, height: 80, border: "1px solid #e5e7eb", borderRadius: 10,
                      background: "#fff", cursor: "pointer", display: "flex", flexDirection: "column",
                      justifyContent: "center", alignItems: "center", transition: "0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#eff6ff";
                      e.currentTarget.style.borderColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", background: "#2563eb", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, marginBottom: 8,
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, textAlign: "center", color: "#1f2937", lineHeight: "14px", whiteSpace: "pre-line" }}>
                      {action.title}
                    </div>
                  </div>
                  {index < quickActions.length - 1 && (
                    <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 600 }}>→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Card> */}

        </div>

        {/* Footer Banner */}
        <div style={{
          background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: 10,
          padding: "12px 20px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
        }}>
          <Icon name="sparkle" color="#2563eb" size={15} />
          <span style={{ fontSize: 12.5, color: "#1e40af", fontWeight: 500 }}>
            SmartHire AI continues to learn and improve. The more you engage, the smarter the matches.
          </span>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", paddingBottom: 4 }}>
          © 2026 Seven Seas Technologies Inc. All rights reserved.
        </div>

      </div>
         <Modal
    isOpen={isModalOpen}
    onClose={closeModal}
    size="6xl"
    scrollBehavior="inside"
>
    <ModalOverlay />

    <ModalContent borderRadius="xl">

        <ModalHeader
            borderBottom="1px solid"
            borderColor="gray.200"
            py={4}
        >
            <Flex
                justify="space-between"
                align="center"
            >
                <Box>
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        {modalTitle}
                    </Text>

                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        Detailed information
                    </Text>
                </Box>

                <Badge
                    colorScheme="blue"
                    fontSize="0.8rem"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    {filteredData.length} Records
                </Badge>
            </Flex>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody py={5}>

            <Flex
                justify="space-between"
                align="center"
                mb={5}
                wrap="wrap"
                gap={3}
            >
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    width="320px"
                    bg="white"
                />

                <Text
                    fontSize="sm"
                    color="gray.600"
                >
                    Showing{" "}
                    <b>{paginatedData.length}</b> of{" "}
                    <b>{filteredData.length}</b> records
                </Text>
            </Flex>

            <Table
                variant="simple"
                size="sm"
            >
                <Thead bg="gray.50">
                    <Tr>
                      {/* ==========================================================
    ACTION CENTER
========================================================== */}
{modalType === "action_center" && (
    <>
        <Th>Task</Th>
        <Th>Description</Th>
        <Th isNumeric>Count</Th>
        <Th width="120px">Action</Th>
    </>
)}

{/* ==========================================================
    AI JOB OPPORTUNITIES
========================================================== */}
{modalType === "top_jobs" && (
    <>
        <Th>Job Title</Th>
        <Th>AI Matches</Th>
        <Th>Best Match</Th>
    </>
)}

{/* ==========================================================
    PIPELINE HEALTH
========================================================== */}
{modalType === "pipeline" && (
    <>
        <Th>Stage</Th>
        <Th isNumeric>Candidates</Th>
        <Th isNumeric>Conversion %</Th>
    </>
)}

{/* ==========================================================
    TOP CANDIDATES
========================================================== */}
{modalType === "top_candidates" && (
    <>
        <Th>Candidate</Th>
        <Th>Job Family</Th>
        <Th>Match Score</Th>
    </>
)}

{/* ==========================================================
    AI IMPACT
========================================================== */}
{modalType === "ai_impact" && (
    <>
        <Th>Metric</Th>
        <Th isNumeric>Value</Th>
    </>
)}

{/* ==========================================================
    RECENT ACTIVITY
========================================================== */}
{modalType === "recent_activity" && (
    <>
        <Th>Activity</Th>
        <Th>Time</Th>
    </>
)}

{/* ==========================================================
    INTERVIEWS
========================================================== */}
{modalType === "interviews" && (
    <>
        <Th>Candidate</Th>
        <Th>Job</Th>
        <Th>Round</Th>
        <Th>Mode</Th>
        <Th>Date</Th>
        <Th>Status</Th>
    </>
)}

{/* ==========================================================
    PLACEMENTS
========================================================== */}
{modalType === "placements" && (
    <>
        <Th>Candidate</Th>
        <Th>Job</Th>
        <Th>Client</Th>
        <Th>Round</Th>
        <Th>Placed On</Th>
        <Th>Rating</Th>
    </>
)}

{/* ==========================================================
    JOB STATUS SUMMARY
========================================================== */}
{modalType === "job_status" && (
    <>
        <Th>Status</Th>
        <Th isNumeric>Count</Th>
    </>
)}

{/* ==========================================================
    JOBS AT RISK
========================================================== */}
{modalType === "jobs_risk" && (
    <>
        <Th>Job Title</Th>
        <Th>Risk Reason</Th>
    </>
)}

{/* ==========================================================
    KPI DETAILS
========================================================== */}
{modalType === "kpi_details" && (
    <>
        <Th>Metric</Th>
        <Th isNumeric>Value</Th>
        <Th>Change</Th>
    </>
)}
</Tr>
</Thead>
<Tbody>
  {paginatedData.map((item, index) => {
    const rowRoute =
      modalType === "action_center"
        ? item.route
        : modalType === "top_jobs"
        ? (item.job_id != null ? `/jobs/${item.job_id}` : null)
        : modalType === "top_candidates"
        ? (item.candidate_id != null
            ? `/recruitment/finalize-candidates/${item.candidate_id}`
            : "/recruitment/finalize-candidates")
        : null;
    return (
    <Tr
      key={index}
      _hover={{ bg: "gray.50" }}
      onClick={
        rowRoute
          ? () => {
              setIsModalOpen(false);
              navigate(rowRoute);
            }
          : undefined
      }
      style={{ cursor: rowRoute ? "pointer" : "default" }}
    >

        {/* ==========================================================
            ACTION CENTER
        ========================================================== */}
        {modalType === "action_center" && (
            <>
                <Td fontWeight="600">
                    {item.title}
                </Td>

                <Td color="gray.600">
                    {item.subtitle}
                </Td>

                <Td isNumeric fontWeight="700">
                    {item.count}
                </Td>

                <Td>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(false);
                            if (item.route) navigate(item.route);
                        }}
                    >
                        Open
                    </Button>
                </Td>
            </>
        )}

        {/* ==========================================================
            AI JOB OPPORTUNITIES
        ========================================================== */}
        {modalType === "top_jobs" && (
            <>
                <Td fontWeight="600">
                    {item.job_title}
                </Td>

                <Td>
                    <Badge
                        colorScheme="blue"
                        px={2}
                        py={1}
                        borderRadius="full"
                    >
                        {item.matches}
                    </Badge>
                </Td>

                <Td>
                    <Badge
                        colorScheme="green"
                        px={2}
                        py={1}
                        borderRadius="full"
                    >
                        {item.best_match_score}%
                    </Badge>
                </Td>
            </>
        )}

        {/* ==========================================================
            PIPELINE HEALTH
        ========================================================== */}
        {modalType === "pipeline" && (
            <>
                <Td fontWeight="600">
                    {item.label}
                </Td>

                <Td isNumeric>
                    {item.count}
                </Td>

                <Td isNumeric>
                    {item.conversion !== null
                        ? `${item.conversion}%`
                        : "-"}
                </Td>
            </>
        )}

        {/* ==========================================================
            TOP CANDIDATES
        ========================================================== */}
        {modalType === "top_candidates" && (
            <>
                <Td
                    fontWeight="600"
                    color="blue.600"
                >
                    {item.candidate_name}
                </Td>

                <Td>
                    {item.job_family}
                </Td>

                <Td>
                    <Badge
                        colorScheme="green"
                        px={2}
                        py={1}
                        borderRadius="full"
                    >
                        {item.best_match_score}%
                    </Badge>
                </Td>
            </>
        )}
                {/* ==========================================================
            AI IMPACT
        ========================================================== */}
        {modalType === "ai_impact" && (
            <>
                <Td fontWeight="600">
                    {item.label}
                </Td>

                <Td isNumeric>
                    <Badge
                        colorScheme="purple"
                        px={2}
                        py={1}
                        borderRadius="full"
                    >
                        {(item.value ?? 0).toLocaleString()}
                    </Badge>
                </Td>
            </>
        )}

        {/* ==========================================================
            RECENT ACTIVITY
        ========================================================== */}
        {modalType === "recent_activity" && (
            <>
                <Td>
                    <Text fontWeight="500">
                        {item.text}
                    </Text>
                </Td>

                <Td color="gray.500">
                    {item.time_ago}
                </Td>
            </>
        )}

        {/* ==========================================================
            INTERVIEWS
        ========================================================== */}
        {modalType === "interviews" && (
            <>
                <Td fontWeight="600">{item.candidate_name}</Td>
                <Td>{item.job_title}</Td>
                <Td>{item.interview_round || "-"}</Td>
                <Td>{item.interview_mode || "-"}</Td>
                <Td>{item.interview_date || "-"}</Td>
                <Td>
                    <Badge colorScheme={item.status === "completed" ? "green" : item.status === "cancelled" ? "red" : "purple"}>
                        {item.status || "-"}
                    </Badge>
                </Td>
            </>
        )}

        {/* ==========================================================
            PLACEMENTS
        ========================================================== */}
        {modalType === "placements" && (
            <>
                <Td fontWeight="600">{item.candidate_name}</Td>
                <Td>{item.job_title}</Td>
                <Td>{item.client_name || "-"}</Td>
                <Td>{item.interview_round || "-"}</Td>
                <Td>{item.placed_on || "-"}</Td>
                <Td>{item.rating ? `${item.rating}/5` : "-"}</Td>
            </>
        )}

{/* ==========================================================
            JOB STATUS SUMMARY
        ========================================================== */}
        {modalType === "job_status" && (
            <>
                <Td fontWeight="600">
                    <HStack spacing={2}>
                        <Box
                            w="10px"
                            h="10px"
                            borderRadius="full"
                            bg={item.color}
                        />
                        <Text>{item.label}</Text>
                    </HStack>
                </Td>

                <Td isNumeric fontWeight="700">
                    {item.count}
                </Td>
            </>
        )}

        {/* ==========================================================
            JOBS AT RISK
        ========================================================== */}
        {modalType === "jobs_risk" && (
            <>
                <Td fontWeight="600">
                    {item.job_title}
                </Td>

                <Td>
                    <Badge colorScheme="red">
                        {item.risk_reason}
                    </Badge>
                </Td>
            </>
        )}

        {/* ==========================================================
            KPI DETAILS
        ========================================================== */}
        {modalType === "kpi_details" && (
            <>
                <Td fontWeight="600">
                    {item.label}
                </Td>

                <Td isNumeric fontWeight="700">
                    {(item.value ?? 0).toLocaleString()}
                </Td>

                <Td>
                    {item.delta ? (
                        <Badge
                            colorScheme={
                                item.delta >= 0
                                    ? "green"
                                    : "red"
                            }
                        >
                            {item.delta >= 0 ? "▲" : "▼"}{" "}
                            {Math.abs(item.delta)}
                        </Badge>
                    ) : (
                        "-"
                    )}
                </Td>
            </>
        )}
    </Tr>
    );
  })}
{filteredData.length === 0 && (
    <Tr>
        <Td
            colSpan={
                modalType === "action_center" ? 4 :
                modalType === "top_jobs" ? 3 :
                modalType === "pipeline" ? 3 :
                modalType === "top_candidates" ? 3 :
                modalType === "ai_impact" ? 2 :
                modalType === "recent_activity" ? 2 :
                modalType === "job_status" ? 2 :
                modalType === "jobs_risk" ? 2 :
                modalType === "kpi_details" ? 3 :
                 modalType === "interviews" ? 6 :
                 modalType === "placements" ? 6 : 1
            }
            textAlign="center"
            py={10}
        >
            <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="600">
                    No records found
                </Text>

                <Text color="gray.500">
                    Try changing your search.
                </Text>
            </VStack>
        </Td>
    </Tr>
)}

</Tbody>
</Table>

{/* ============================
      Pagination
============================ */}

{filteredData.length > recordsPerPage && (
    <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
    />
)}

</ModalBody>

<ModalFooter
    borderTop="1px solid"
    borderColor="gray.200"
>
    <Button
        onClick={closeModal}
        colorScheme="blue"
    >
        Close
    </Button>
</ModalFooter>

</ModalContent>
</Modal>

    </div>
  );
};

export default HomeDashboard;
