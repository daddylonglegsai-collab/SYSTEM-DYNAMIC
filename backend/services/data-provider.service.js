/**
 * DATA PROVIDER SERVICE
 * 
 * Interface for retrieving company operational context
 * Today: Returns demo data
 * Future: Replace with Kafka consumer, REST API, SQL Server, Logstash, MES, ERP
 * 
 * IMPORTANT: This interface ensures AI layer never needs to change
 */

import { 
  getCompanyContext, 
  getContextSection, 
  getProjectContext,
  getRiskAssessment,
  getCapacityAssessment,
  formatContextForAI
} from './demo-context.service.js';

/**
 * Get complete company operational context
 * @returns {Promise<Object>} Complete company context
 */
export async function getCompanyOperationalContext() {
  try {
    // Today: Return demo data
    const context = getCompanyContext();
    
    return {
      success: true,
      data: context,
      timestamp: new Date().toISOString(),
      source: 'demo-operational-intelligence'
    };
    
    // Future: Replace with real-time data
    // return await kafkaConsumer.getLatestContext();
    // return await restApiClient.getCompanyData();
    // return await sqlServer.query('SELECT * FROM CompanyContext');
  } catch (error) {
    console.error('Error fetching company context:', error);
    throw new Error(`Failed to retrieve company context: ${error.message}`);
  }
}

/**
 * Get projects with complete details
 * @returns {Promise<Array>} All active projects
 */
export async function getProjectsContext() {
  try {
    const context = getCompanyContext();
    return {
      success: true,
      projects: context.projects,
      totalProjects: context.projects.length,
      activeProjects: context.projects.filter(p => p.status !== 'Completed').length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching projects context:', error);
    throw new Error(`Failed to retrieve projects: ${error.message}`);
  }
}

/**
 * Get specific project details
 * @param {number} projectId - Project ID
 * @returns {Promise<Object>} Project details with analysis
 */
export async function getProjectDetails(projectId) {
  try {
    const project = getProjectContext(projectId);
    
    if (!project) {
      throw new Error(`Project ${projectId} not found`);
    }
    
    return {
      success: true,
      project: project,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw new Error(`Failed to retrieve project details: ${error.message}`);
  }
}

/**
 * Get production and operational metrics
 * @returns {Promise<Object>} Production KPIs and status
 */
export async function getProductionContext() {
  try {
    const context = getCompanyContext();
    
    return {
      success: true,
      production: context.production,
      manufacturing: context.manufacturing,
      efficiency: context.production.efficiency,
      capacity: context.production.capacity,
      qualityRate: context.production.qualityRate,
      activeLines: context.production.activeLines,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching production context:', error);
    throw new Error(`Failed to retrieve production data: ${error.message}`);
  }
}

/**
 * Get inventory and supply chain status
 * @returns {Promise<Object>} Inventory metrics and critical parts
 */
export async function getInventoryContext() {
  try {
    const context = getCompanyContext();
    const criticalParts = context.inventory.criticalParts;
    const atRiskParts = criticalParts.filter(p => p.risk === 'High');
    
    return {
      success: true,
      inventory: context.inventory,
      totalValue: context.inventory.total,
      criticalParts: criticalParts,
      atRiskParts: atRiskParts,
      atRiskCount: atRiskParts.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching inventory context:', error);
    throw new Error(`Failed to retrieve inventory data: ${error.message}`);
  }
}

/**
 * Get financial metrics and budget status
 * @returns {Promise<Object>} Financial analysis
 */
export async function getFinancialContext() {
  try {
    const context = getCompanyContext();
    const projects = context.projects;
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalUsed = projects.reduce((sum, p) => sum + p.budgetUsed, 0);
    const utilization = Math.round((totalUsed / totalBudget) * 100);
    const atRisk = totalBudget - totalUsed;
    
    return {
      success: true,
      financial: {
        totalBudget: totalBudget,
        totalUsed: totalUsed,
        remaining: atRisk,
        utilizationPercent: utilization,
        projects: projects.map(p => ({
          name: p.name,
          budget: p.budget,
          used: p.budgetUsed,
          remaining: p.budget - p.budgetUsed,
          percent: Math.round((p.budgetUsed / p.budget) * 100)
        }))
      },
      history: context.history,
      kpis: context.kpis,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching financial context:', error);
    throw new Error(`Failed to retrieve financial data: ${error.message}`);
  }
}

/**
 * Get risk assessment
 * @returns {Promise<Object>} Risk analysis and mitigation
 */
export async function getRiskContext() {
  try {
    const riskAssessment = getRiskAssessment();
    
    return {
      success: true,
      risks: riskAssessment,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching risk context:', error);
    throw new Error(`Failed to retrieve risk data: ${error.message}`);
  }
}

/**
 * Get capacity assessment
 * @returns {Promise<Object>} Capacity analysis for decision making
 */
export async function getCapacityContext() {
  try {
    const capacityAssessment = getCapacityAssessment();
    
    return {
      success: true,
      capacity: capacityAssessment,
      canAcceptProject: capacityAssessment.availableCapacity > 10,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching capacity context:', error);
    throw new Error(`Failed to retrieve capacity data: ${error.message}`);
  }
}

/**
 * Get resources and team status
 * @returns {Promise<Object>} Resource availability and allocation
 */
export async function getResourcesContext() {
  try {
    const context = getCompanyContext();
    const resources = context.resources;
    
    return {
      success: true,
      resources: resources,
      teamUtilization: {
        total: resources.totalEmployees,
        available: resources.totalEmployees - 
                   Math.round(resources.overtimeHours / 20), // rough estimate
        departments: [
          { name: 'Production', count: resources.production },
          { name: 'Engineering', count: resources.engineering },
          { name: 'Quality', count: resources.quality },
          { name: 'Maintenance', count: resources.maintenance },
          { name: 'Administrative', count: resources.administrative }
        ]
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching resources context:', error);
    throw new Error(`Failed to retrieve resource data: ${error.message}`);
  }
}

/**
 * Get formatted context string for AI analysis
 * @returns {Promise<string>} Formatted operational intelligence for AI
 */
export async function getContextForAIAnalysis() {
  try {
    const contextString = formatContextForAI();
    
    return {
      success: true,
      context: contextString,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error formatting context for AI:', error);
    throw new Error(`Failed to format context: ${error.message}`);
  }
}

/**
 * Get summary dashboard data
 * @returns {Promise<Object>} Dashboard summary with all key metrics
 */
export async function getDashboardSummary() {
  try {
    const context = getCompanyContext();
    
    const projects = context.projects;
    const delayedProjects = projects.filter(p => p.delayDays > 0);
    const atRiskProjects = projects.filter(p => p.risks.length > 0);
    
    return {
      success: true,
      summary: {
        company: context.company,
        lastUpdated: context.lastUpdated,
        keyMetrics: {
          totalProjects: projects.length,
          delayedProjects: delayedProjects.length,
          atRiskProjects: atRiskProjects.length,
          productionEfficiency: context.production.efficiency,
          qualityRate: context.production.qualityRate,
          riskScore: context.kpis.riskScore,
          customerSatisfaction: context.kpis.customerSatisfaction
        },
        projects: projects.map(p => ({
          id: p.id,
          name: p.name,
          product: p.product,
          progress: p.progress,
          status: p.status,
          deadline: p.deadline,
          delay: p.delayDays,
          priority: p.priority,
          risks: p.risks.length
        })),
        alerts: {
          critical: context.risks.filter(r => r.severity === 'High' && r.status === 'Active'),
          warning: context.risks.filter(r => r.severity === 'Medium' && r.status === 'Active'),
          criticalParts: context.inventory.criticalParts.filter(p => p.risk === 'High')
        }
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    throw new Error(`Failed to retrieve dashboard data: ${error.message}`);
  }
}

/**
 * Validate and prepare context for AI analysis
 * Ensures all required data is present and properly formatted
 * 
 * @returns {Promise<Object>} Validated context ready for AI
 */
export async function prepareContextForAI() {
  try {
    const [
      projects,
      production,
      inventory,
      financial,
      risks,
      capacity,
      resources
    ] = await Promise.all([
      getProjectsContext(),
      getProductionContext(),
      getInventoryContext(),
      getFinancialContext(),
      getRiskContext(),
      getCapacityContext(),
      getResourcesContext()
    ]);
    
    return {
      success: true,
      complete: true,
      data: {
        projects,
        production,
        inventory,
        financial,
        risks,
        capacity,
        resources
      },
      timestamp: new Date().toISOString(),
      ready: true
    };
  } catch (error) {
    console.error('Error preparing context for AI:', error);
    throw new Error(`Failed to prepare complete context: ${error.message}`);
  }
}

export default {
  getCompanyOperationalContext,
  getProjectsContext,
  getProjectDetails,
  getProductionContext,
  getInventoryContext,
  getFinancialContext,
  getRiskContext,
  getCapacityContext,
  getResourcesContext,
  getContextForAIAnalysis,
  getDashboardSummary,
  prepareContextForAI
};
