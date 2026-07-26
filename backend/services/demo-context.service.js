/**
 * DEMO KNOWLEDGE CONTEXT ENGINE
 * Provides realistic enterprise simulation data for AI analysis
 * 
 * Future: Replace with real data from Kafka, Logstash, ERP, MES, MRP, and live APIs
 */

export const demoCompanyContext = {
  company: "SIMOPRIME",
  lastUpdated: new Date().toISOString(),
  
  // Active Projects
  projects: [
    {
      id: 1,
      name: "Metro Tehran",
      product: "SIMOPRIME MV Switchgear",
      progress: 72,
      status: "Production",
      deadline: "2026-09-15",
      delayDays: 12,
      priority: "High",
      risks: [
        "Late delivery of protection relays",
        "Engineering approval delay"
      ],
      budget: 450000,
      budgetUsed: 385000,
      team: 28,
      supplier: "ABB Germany"
    },
    {
      id: 2,
      name: "Steel Isfahan",
      product: "SIVACON S8",
      progress: 45,
      status: "Engineering",
      deadline: "2026-11-20",
      delayDays: 5,
      priority: "Medium",
      risks: [
        "Design complexity",
        "Material procurement delay"
      ],
      budget: 320000,
      budgetUsed: 145000,
      team: 15,
      supplier: "Siemens Iran"
    },
    {
      id: 3,
      name: "Mashhad Substation",
      product: "Distribution Switchgear",
      progress: 88,
      status: "Testing",
      deadline: "2026-08-10",
      delayDays: 0,
      priority: "High",
      risks: [],
      budget: 280000,
      budgetUsed: 260000,
      team: 22,
      supplier: "Local - Sepas"
    }
  ],

  // Production Metrics
  production: {
    efficiency: 82,
    capacity: 100,
    activeLines: 4,
    qualityRate: 96,
    averageLeadTime: 28,
    downtime: 3.2,
    overtime: 18,
    defectRate: 2.1,
    rework: 1.8,
    scrap: 0.3
  },

  // Manufacturing KPIs
  manufacturing: {
    oee: 78.6, // Overall Equipment Effectiveness
    mtbf: 156, // Mean Time Between Failures (hours)
    mttr: 2.4, // Mean Time To Repair (hours)
    firstPassYield: 94.2,
    cycleTime: 3.5, // hours
    setupTime: 0.8, // hours
    toolChanges: 42,
    unplannedStops: 3
  },

  // Inventory Status
  inventory: {
    total: 1240000,
    raw: 450000,
    wip: 320000, // Work In Progress
    finished: 470000,
    turnover: 4.2, // times per year
    criticalParts: [
      {
        part: "Circuit Breaker 1250A",
        stock: 2,
        required: 8,
        risk: "High",
        reorderLevel: 5,
        leadTime: 14
      },
      {
        part: "Transformer Oil (1000L)",
        stock: 12,
        required: 20,
        risk: "Medium",
        reorderLevel: 8,
        leadTime: 7
      },
      {
        part: "Control Module PCB",
        stock: 45,
        required: 120,
        risk: "Medium",
        reorderLevel: 80,
        leadTime: 21
      },
      {
        part: "Copper Bus Bar (per ton)",
        stock: 3.2,
        required: 8,
        risk: "High",
        reorderLevel: 5,
        leadTime: 10
      }
    ],
    obsolete: 12,
    excess: 89
  },

  // Procurement
  procurement: {
    activeOrders: 47,
    pendingApproval: 3,
    overdue: 2,
    suppliers: [
      {
        name: "ABB Germany",
        onTimeDelivery: 96,
        quality: 98,
        status: "Good Standing"
      },
      {
        name: "Siemens Iran",
        onTimeDelivery: 92,
        quality: 94,
        status: "Good Standing"
      },
      {
        name: "Sepas Local",
        onTimeDelivery: 88,
        quality: 90,
        status: "Watch List"
      }
    ],
    averageCost: 145000,
    costTrend: -2.3 // percent change
  },

  // Engineering
  engineering: {
    activeDesigns: 8,
    inReview: 2,
    completed: 156,
    pendingApproval: 3,
    designIssues: 5,
    testingPhase: [
      {
        test: "High Voltage Withstand",
        progress: 85,
        status: "In Progress"
      },
      {
        test: "Thermal Cycling",
        progress: 62,
        status: "In Progress"
      },
      {
        test: "EMC Compliance",
        progress: 100,
        status: "Passed"
      }
    ]
  },

  // Resources
  resources: {
    totalEmployees: 156,
    production: 98,
    engineering: 28,
    quality: 12,
    maintenance: 8,
    administrative: 10,
    engineersNeeded: 4,
    techniciansTrain: 3,
    absenteeism: 2.1, // percent
    overtimeHours: 2340 // per month
  },

  // Risks & Issues
  risks: [
    {
      id: 1,
      category: "Supply Chain",
      title: "Critical Relay Shortage",
      severity: "High",
      probability: 0.8,
      impact: "Project Metro Tehran delay",
      owner: "Procurement Manager",
      mitigationPlan: "Secondary supplier identified",
      status: "Active"
    },
    {
      id: 2,
      category: "Technical",
      title: "Design Approval Delay",
      severity: "High",
      probability: 0.6,
      impact: "Isfahan project timeline risk",
      owner: "Engineering Manager",
      mitigationPlan: "Expedited review process started",
      status: "Active"
    },
    {
      id: 3,
      category: "Operational",
      title: "Equipment Downtime",
      severity: "Medium",
      probability: 0.4,
      impact: "Production delay",
      owner: "Maintenance Manager",
      mitigationPlan: "Preventive maintenance schedule updated",
      status: "Monitoring"
    }
  ],

  // Historical Performance
  history: {
    lastMonth: {
      revenue: 850000,
      cost: 620000,
      projectsCompleted: 1,
      qualityIssues: 3,
      customerSatisfaction: 92
    },
    last3Months: {
      revenue: 2340000,
      cost: 1820000,
      projectsCompleted: 4,
      qualityIssues: 7,
      customerSatisfaction: 91
    },
    lastYear: {
      revenue: 8950000,
      cost: 6200000,
      projectsCompleted: 18,
      qualityIssues: 31,
      customerSatisfaction: 89
    }
  },

  // KPI Summary
  kpis: {
    projectOnTimeCompletion: 88,
    productionEfficiency: 82,
    qualityRate: 96,
    customerSatisfaction: 92,
    employeeRetention: 94,
    supplierPerformance: 92,
    margin: 26.8,
    riskScore: 42 // out of 100
  }
};

/**
 * Get company context for AI analysis
 * @returns {Object} Complete company operational data
 */
export function getCompanyContext() {
  return demoCompanyContext;
}

/**
 * Get specific context section
 * @param {string} section - Section name (projects, production, inventory, etc.)
 * @returns {Object} Requested context section
 */
export function getContextSection(section) {
  return demoCompanyContext[section] || null;
}

/**
 * Get project context by ID
 * @param {number} projectId - Project ID
 * @returns {Object} Project details
 */
export function getProjectContext(projectId) {
  return demoCompanyContext.projects.find(p => p.id === projectId) || null;
}

/**
 * Get risk assessment for decision making
 * @returns {Object} Risk analysis and probability
 */
export function getRiskAssessment() {
  const { risks } = demoCompanyContext;
  const highRisks = risks.filter(r => r.severity === "High");
  const activeRisks = risks.filter(r => r.status === "Active");
  
  return {
    totalRisks: risks.length,
    highRisks: highRisks.length,
    activeRisks: activeRisks.length,
    averageProbability: (risks.reduce((sum, r) => sum + r.probability, 0) / risks.length).toFixed(2),
    risks: risks
  };
}

/**
 * Get capacity assessment for project acceptance
 * @returns {Object} Capacity analysis
 */
export function getCapacityAssessment() {
  const { production, resources, inventory } = demoCompanyContext;
  
  return {
    productionCapacityUtilization: production.capacity,
    availableCapacity: 100 - production.capacity,
    activeProductions: production.activeLines,
    totalLines: 4,
    teamCapacity: {
      total: resources.totalEmployees,
      available: resources.totalEmployees - (resources.overtimeHours / 8), // rough estimate
      utilizationRate: 82
    },
    criticalInventoryStatus: inventory.criticalParts.filter(p => p.risk === "High").length > 0 ? "At Risk" : "Normal",
    productionEfficiency: production.efficiency,
    averageLeadTime: production.averageLeadTime
  };
}

/**
 * Format context for AI prompt
 * @returns {string} Formatted company context
 */
export function formatContextForAI() {
  const context = demoCompanyContext;
  return `
SIMOPRIME OPERATIONAL INTELLIGENCE - CURRENT STATE

EXECUTIVE SUMMARY:
- Company: ${context.company}
- Total Projects: ${context.projects.length}
- Production Efficiency: ${context.production.efficiency}%
- Quality Rate: ${context.production.qualityRate}%
- Risk Score: ${context.kpis.riskScore}/100

ACTIVE PROJECTS:
${context.projects.map(p => `
  • ${p.name} (${p.product})
    Status: ${p.status} | Progress: ${p.progress}% | Deadline: ${p.deadline}
    Delay: ${p.delayDays} days | Priority: ${p.priority}
    Risks: ${p.risks.join(", ") || "None"}
    Budget: ${p.budgetUsed}/${p.budget} (${Math.round(p.budgetUsed/p.budget*100)}%)
`).join("")}

PRODUCTION STATUS:
- Efficiency: ${context.production.efficiency}% | Capacity: ${context.production.capacity}%
- Active Lines: ${context.production.activeLines}/4
- Quality Rate: ${context.production.qualityRate}%
- Average Lead Time: ${context.production.averageLeadTime} days

CRITICAL INVENTORY ALERTS:
${context.inventory.criticalParts.map(p => `
  ⚠️ ${p.part}
     Stock: ${p.stock} | Required: ${p.required} | Risk: ${p.risk}
     Reorder Level: ${p.reorderLevel} | Lead Time: ${p.leadTime} days
`).join("")}

RESOURCES:
- Total Employees: ${context.resources.totalEmployees}
- Absenteeism: ${context.resources.absenteeism}%
- Overtime Hours (monthly): ${context.resources.overtimeHours}
- Engineers Needed: ${context.resources.engineersNeeded}

KEY RISKS:
${context.risks.filter(r => r.status === "Active").map(r => `
  🔴 ${r.title} (${r.severity})
     Probability: ${(r.probability * 100).toFixed(0)}% | Impact: ${r.impact}
     Mitigation: ${r.mitigationPlan}
`).join("")}

PERFORMANCE KPIs:
- On-Time Completion: ${context.kpis.projectOnTimeCompletion}%
- Production Efficiency: ${context.kpis.productionEfficiency}%
- Quality Rate: ${context.kpis.qualityRate}%
- Customer Satisfaction: ${context.kpis.customerSatisfaction}%
- Profit Margin: ${context.kpis.margin}%
`;
}

export default demoCompanyContext;
