import { type HealthStatus, productFamilies } from './products';

export type Customer = {
  id: string;
  nameKey: string;
  industryKey: string;
  satisfaction: number;
  deliveryPerformance: number;
  paymentStatus: HealthStatus;
  strategicImportance: number;
  risk: HealthStatus;
  riskRecommendationKey: string;
};

export type Project = {
  id: string;
  customerId: string;
  nameKey: string;
  contractNumber: string;
  contractValue: number;
  currentCost: number;
  expectedProfit: number;
  deliveryDateKey: string;
  currentStageKey: string;
  healthScore: number;
  delayRisk: HealthStatus;
  paymentStatus: HealthStatus;
  deliveryStatus: HealthStatus;
  progress: number;
  materialReadiness: number;
  recommendationKey: string;
  productIds: string[];
};

export type ProductionStage = {
  id: string;
  nameKey: string;
  progress: number;
  status: HealthStatus;
};

export type ManufacturingOrder = {
  id: string;
  projectId: string;
  productId: string;
  quantity: number;
  progress: number;
  materialReadiness: number;
  productionLineKey: string;
  factoryKey: string;
  estimatedCompletionKey: string;
  qualityStatus: HealthStatus;
  stages: ProductionStage[];
};

export const customers: Customer[] = [
{
  id: 'tehran-metro',
  nameKey: 'customer.tehranMetro',
  industryKey: 'industry.transport',
  satisfaction: 92,
  deliveryPerformance: 89,
  paymentStatus: 'healthy',
  strategicImportance: 98,
  risk: 'watch',
  riskRecommendationKey: 'customer.risk.tehranMetro'
},
{
  id: 'mashhad-metro',
  nameKey: 'customer.mashhadMetro',
  industryKey: 'industry.transport',
  satisfaction: 88,
  deliveryPerformance: 86,
  paymentStatus: 'watch',
  strategicImportance: 84,
  risk: 'watch',
  riskRecommendationKey: 'customer.risk.mashhadMetro'
},
{
  id: 'isfahan-steel',
  nameKey: 'customer.isfahanSteel',
  industryKey: 'industry.steel',
  satisfaction: 95,
  deliveryPerformance: 94,
  paymentStatus: 'healthy',
  strategicImportance: 96,
  risk: 'healthy',
  riskRecommendationKey: 'customer.risk.isfahanSteel'
},
{
  id: 'khuzestan-steel',
  nameKey: 'customer.khuzestanSteel',
  industryKey: 'industry.steel',
  satisfaction: 82,
  deliveryPerformance: 78,
  paymentStatus: 'watch',
  strategicImportance: 91,
  risk: 'critical',
  riskRecommendationKey: 'customer.risk.khuzestanSteel'
},
{
  id: 'national-grid',
  nameKey: 'customer.nationalGrid',
  industryKey: 'industry.energy',
  satisfaction: 90,
  deliveryPerformance: 91,
  paymentStatus: 'healthy',
  strategicImportance: 93,
  risk: 'healthy',
  riskRecommendationKey: 'customer.risk.nationalGrid'
}];


export const projects: Project[] = [
{
  id: 'metro-line-7',
  customerId: 'tehran-metro',
  nameKey: 'project.metroLine7',
  contractNumber: 'TM-1405-07',
  contractValue: 68200,
  currentCost: 33100,
  expectedProfit: 14800,
  deliveryDateKey: 'date.sep18',
  currentStageKey: 'stage.assembly',
  healthScore: 74,
  delayRisk: 'watch',
  paymentStatus: 'healthy',
  deliveryStatus: 'watch',
  progress: 58,
  materialReadiness: 78,
  recommendationKey: 'projects.recommendation.metroLine7',
  productIds: ['simoprime', 'sivacon-s8', 'ek36']
},
{
  id: 'metro-line-8',
  customerId: 'tehran-metro',
  nameKey: 'project.metroLine8',
  contractNumber: 'TM-1405-12',
  contractValue: 42800,
  currentCost: 15400,
  expectedProfit: 11200,
  deliveryDateKey: 'date.oct05',
  currentStageKey: 'stage.engineering',
  healthScore: 86,
  delayRisk: 'healthy',
  paymentStatus: 'healthy',
  deliveryStatus: 'healthy',
  progress: 36,
  materialReadiness: 92,
  recommendationKey: 'projects.recommendation.metroLine8',
  productIds: ['8pt', 'a4']
},
{
  id: 'mashhad-depot',
  customerId: 'mashhad-metro',
  nameKey: 'project.mashhadDepot',
  contractNumber: 'MM-1405-18',
  contractValue: 51600,
  currentCost: 28400,
  expectedProfit: 9800,
  deliveryDateKey: 'date.sep26',
  currentStageKey: 'stage.wiring',
  healthScore: 69,
  delayRisk: 'watch',
  paymentStatus: 'watch',
  deliveryStatus: 'watch',
  progress: 61,
  materialReadiness: 84,
  recommendationKey: 'projects.recommendation.mashhadDepot',
  productIds: ['sivacon-s8', 'ek36']
},
{
  id: 'steel-expansion',
  customerId: 'isfahan-steel',
  nameKey: 'project.steelExpansion',
  contractNumber: 'IS-1405-03',
  contractValue: 74800,
  currentCost: 48200,
  expectedProfit: 16700,
  deliveryDateKey: 'date.aug29',
  currentStageKey: 'stage.testing',
  healthScore: 91,
  delayRisk: 'healthy',
  paymentStatus: 'healthy',
  deliveryStatus: 'healthy',
  progress: 79,
  materialReadiness: 96,
  recommendationKey: 'projects.recommendation.steelExpansion',
  productIds: ['simoprime', '8pt', 'ek36']
},
{
  id: 'hot-strip-line',
  customerId: 'khuzestan-steel',
  nameKey: 'project.hotStripLine',
  contractNumber: 'KS-1405-09',
  contractValue: 63400,
  currentCost: 40100,
  expectedProfit: 9200,
  deliveryDateKey: 'date.sep12',
  currentStageKey: 'stage.wiring',
  healthScore: 58,
  delayRisk: 'critical',
  paymentStatus: 'watch',
  deliveryStatus: 'critical',
  progress: 55,
  materialReadiness: 71,
  recommendationKey: 'projects.recommendation.hotStripLine',
  productIds: ['sivacon-s8', 'a4']
},
{
  id: 'grid-west',
  customerId: 'national-grid',
  nameKey: 'project.gridWest',
  contractNumber: 'NG-1405-21',
  contractValue: 58700,
  currentCost: 23900,
  expectedProfit: 15300,
  deliveryDateKey: 'date.oct17',
  currentStageKey: 'stage.fabrication',
  healthScore: 82,
  delayRisk: 'healthy',
  paymentStatus: 'healthy',
  deliveryStatus: 'healthy',
  progress: 44,
  materialReadiness: 89,
  recommendationKey: 'projects.recommendation.gridWest',
  productIds: ['simoprime', 'a4']
}];


const standardStages = (
progress: number,
activeStage: string,
status: HealthStatus)
: ProductionStage[] => [
{
  id: 'engineering',
  nameKey: 'stage.engineering',
  progress: progress > 18 ? 100 : progress * 5,
  status: 'healthy'
},
{
  id: 'fabrication',
  nameKey: 'stage.fabrication',
  progress: progress > 42 ? 100 : Math.max(0, (progress - 18) * 4),
  status: 'healthy'
},
{
  id: 'assembly',
  nameKey: 'stage.assembly',
  progress:
  activeStage === 'stage.assembly' ?
  Math.min(100, progress) :
  progress > 70 ?
  100 :
  Math.max(0, (progress - 42) * 3.5),
  status
},
{
  id: 'wiring',
  nameKey: 'stage.wiring',
  progress:
  activeStage === 'stage.wiring' ?
  Math.min(100, progress) :
  progress > 82 ?
  100 :
  Math.max(0, (progress - 62) * 3),
  status
},
{
  id: 'testing',
  nameKey: 'stage.testing',
  progress:
  activeStage === 'stage.testing' ?
  Math.min(100, progress) :
  Math.max(0, (progress - 82) * 5),
  status: 'healthy'
}];


export const manufacturingOrders: ManufacturingOrder[] = [
{
  id: 'mo-071',
  projectId: 'metro-line-7',
  productId: 'simoprime',
  quantity: 22,
  progress: 64,
  materialReadiness: 82,
  productionLineKey: 'line.assemblyA',
  factoryKey: 'factory.tehran',
  estimatedCompletionKey: 'date.sep10',
  qualityStatus: 'healthy',
  stages: standardStages(64, 'stage.assembly', 'watch')
},
{
  id: 'mo-072',
  projectId: 'metro-line-7',
  productId: 'sivacon-s8',
  quantity: 14,
  progress: 51,
  materialReadiness: 71,
  productionLineKey: 'line.wiringB',
  factoryKey: 'factory.tehran',
  estimatedCompletionKey: 'date.sep15',
  qualityStatus: 'watch',
  stages: standardStages(51, 'stage.assembly', 'watch')
},
{
  id: 'mo-073',
  projectId: 'metro-line-7',
  productId: 'ek36',
  quantity: 6,
  progress: 59,
  materialReadiness: 88,
  productionLineKey: 'line.fabricationC',
  factoryKey: 'factory.tehran',
  estimatedCompletionKey: 'date.sep08',
  qualityStatus: 'healthy',
  stages: standardStages(59, 'stage.fabrication', 'healthy')
},
{
  id: 'mo-081',
  projectId: 'metro-line-8',
  productId: '8pt',
  quantity: 18,
  progress: 42,
  materialReadiness: 94,
  productionLineKey: 'line.assemblyA',
  factoryKey: 'factory.tehran',
  estimatedCompletionKey: 'date.sep29',
  qualityStatus: 'healthy',
  stages: standardStages(42, 'stage.engineering', 'healthy')
},
{
  id: 'mo-082',
  projectId: 'metro-line-8',
  productId: 'a4',
  quantity: 10,
  progress: 28,
  materialReadiness: 89,
  productionLineKey: 'line.fabricationC',
  factoryKey: 'factory.tehran',
  estimatedCompletionKey: 'date.oct03',
  qualityStatus: 'healthy',
  stages: standardStages(28, 'stage.engineering', 'healthy')
},
{
  id: 'mo-181',
  projectId: 'mashhad-depot',
  productId: 'sivacon-s8',
  quantity: 16,
  progress: 61,
  materialReadiness: 84,
  productionLineKey: 'line.wiringB',
  factoryKey: 'factory.mashhad',
  estimatedCompletionKey: 'date.sep21',
  qualityStatus: 'watch',
  stages: standardStages(61, 'stage.wiring', 'watch')
},
{
  id: 'mo-182',
  projectId: 'mashhad-depot',
  productId: 'ek36',
  quantity: 8,
  progress: 56,
  materialReadiness: 83,
  productionLineKey: 'line.wiringB',
  factoryKey: 'factory.mashhad',
  estimatedCompletionKey: 'date.sep23',
  qualityStatus: 'healthy',
  stages: standardStages(56, 'stage.wiring', 'healthy')
},
{
  id: 'mo-031',
  projectId: 'steel-expansion',
  productId: 'simoprime',
  quantity: 12,
  progress: 82,
  materialReadiness: 98,
  productionLineKey: 'line.assemblyA',
  factoryKey: 'factory.isfahan',
  estimatedCompletionKey: 'date.aug20',
  qualityStatus: 'healthy',
  stages: standardStages(82, 'stage.testing', 'healthy')
},
{
  id: 'mo-032',
  projectId: 'steel-expansion',
  productId: '8pt',
  quantity: 14,
  progress: 85,
  materialReadiness: 96,
  productionLineKey: 'line.testingD',
  factoryKey: 'factory.isfahan',
  estimatedCompletionKey: 'date.aug24',
  qualityStatus: 'healthy',
  stages: standardStages(85, 'stage.testing', 'healthy')
},
{
  id: 'mo-033',
  projectId: 'steel-expansion',
  productId: 'ek36',
  quantity: 7,
  progress: 71,
  materialReadiness: 93,
  productionLineKey: 'line.testingD',
  factoryKey: 'factory.isfahan',
  estimatedCompletionKey: 'date.aug27',
  qualityStatus: 'healthy',
  stages: standardStages(71, 'stage.assembly', 'healthy')
},
{
  id: 'mo-091',
  projectId: 'hot-strip-line',
  productId: 'sivacon-s8',
  quantity: 20,
  progress: 58,
  materialReadiness: 69,
  productionLineKey: 'line.wiringB',
  factoryKey: 'factory.ahvaz',
  estimatedCompletionKey: 'date.sep08',
  qualityStatus: 'critical',
  stages: standardStages(58, 'stage.wiring', 'critical')
},
{
  id: 'mo-092',
  projectId: 'hot-strip-line',
  productId: 'a4',
  quantity: 11,
  progress: 52,
  materialReadiness: 74,
  productionLineKey: 'line.assemblyA',
  factoryKey: 'factory.ahvaz',
  estimatedCompletionKey: 'date.sep10',
  qualityStatus: 'watch',
  stages: standardStages(52, 'stage.assembly', 'watch')
},
{
  id: 'mo-211',
  projectId: 'grid-west',
  productId: 'simoprime',
  quantity: 15,
  progress: 48,
  materialReadiness: 91,
  productionLineKey: 'line.fabricationC',
  factoryKey: 'factory.tehran',
  estimatedCompletionKey: 'date.oct09',
  qualityStatus: 'healthy',
  stages: standardStages(48, 'stage.fabrication', 'healthy')
},
{
  id: 'mo-212',
  projectId: 'grid-west',
  productId: 'a4',
  quantity: 13,
  progress: 40,
  materialReadiness: 87,
  productionLineKey: 'line.fabricationC',
  factoryKey: 'factory.tehran',
  estimatedCompletionKey: 'date.oct14',
  qualityStatus: 'healthy',
  stages: standardStages(40, 'stage.fabrication', 'healthy')
}];


export function getCustomerProjects(customerId: string) {
  return projects.filter((project) => project.customerId === customerId);
}
export function getProjectOrders(projectId: string) {
  return manufacturingOrders.filter((order) => order.projectId === projectId);
}
export function getOrderProduct(order: ManufacturingOrder) {
  return productFamilies.find((product) => product.id === order.productId);
}
export function getProjectEconomics(project: Project) {
  const margin = project.contractValue ?
  project.expectedProfit / project.contractValue * 100 :
  0;
  return {
    actualCost: project.currentCost,
    expectedProfit: project.expectedProfit,
    contractValue: project.contractValue,
    margin,
    costPressure: Math.max(
      0,
      project.currentCost -
      (project.contractValue - project.expectedProfit) * project.progress /
      100
    )
  };
}
export function getCustomerContractValue(customerId: string) {
  return getCustomerProjects(customerId).reduce(
    (sum, project) => sum + project.contractValue,
    0
  );
}
export function getProductOrders(productId: string) {
  return manufacturingOrders.filter((order) => order.productId === productId);
}
export function getProjectProductBreakdown(projectId: string) {
  return getProjectOrders(projectId).
  map((order) => ({ order, product: getOrderProduct(order) })).
  filter(
    (
    item)
    : item is {
      order: ManufacturingOrder;
      product: NonNullable<ReturnType<typeof getOrderProduct>>;
    } => Boolean(item.product)
  );
}

const totalExpectedProfit = projects.reduce(
  (sum, project) => sum + project.expectedProfit,
  0
);
export const financialSummary = {
  currentMonthProfit: Math.round(totalExpectedProfit * 0.43),
  purchaseBudget: 25400,
  expectedCheckCollections: 55200,
  netCashPosition: 15300,
  economicExposure: projects.
  filter((project) => project.delayRisk !== 'healthy').
  reduce((sum, project) => sum + project.contractValue * 0.035, 0),
  exposedOrders: manufacturingOrders.filter(
    (order) => order.qualityStatus !== 'healthy'
  ).length
};
export const cashForecast = [
{ week: 'finance.week1', cashIn: 10500, cashOut: 7400 },
{ week: 'finance.week2', cashIn: 12200, cashOut: 9800 },
{ week: 'finance.week3', cashIn: 14300, cashOut: 6800 },
{ week: 'finance.week4', cashIn: 10800, cashOut: 11400 },
{ week: 'finance.week5', cashIn: 7400, cashOut: 4500 }];

export const purchaseCommitments = [
{
  name: 'Copper busbar',
  amount: 9200,
  due: 'finance.week2',
  status: 'critical'
},
{
  name: 'Steel sheet',
  amount: 6100,
  due: 'finance.week3',
  status: 'healthy'
},
{
  name: 'Breakers & contactors',
  amount: 5400,
  due: 'finance.week3',
  status: 'watch'
},
{
  name: 'Cables & relays',
  amount: 4700,
  due: 'finance.week4',
  status: 'healthy'
}];

export const warehouseItems = [
{
  name: 'Copper busbar',
  cover: 9,
  reorder: 14,
  status: 'critical',
  type: 'A'
},
{ name: 'Steel sheet', cover: 22, reorder: 12, status: 'healthy', type: 'A' },
{ name: 'Cable', cover: 16, reorder: 10, status: 'watch', type: 'A' },
{ name: 'Breaker', cover: 28, reorder: 15, status: 'healthy', type: 'B' },
{ name: 'Contactor', cover: 18, reorder: 14, status: 'watch', type: 'B' },
{ name: 'Relay', cover: 45, reorder: 20, status: 'healthy', type: 'C' }];

export const processes = [
{ key: 'Laser', value: 84, status: 'healthy' },
{ key: 'Punch', value: 79, status: 'healthy' },
{ key: 'Bending', value: 67, status: 'watch' },
{ key: 'Painting', value: 92, status: 'healthy' },
{ key: 'Mechanical Assembly', value: 74, status: 'healthy' },
{ key: 'Electrical Assembly', value: 88, status: 'watch' },
{ key: 'Testing', value: 81, status: 'healthy' },
{ key: 'Packing', value: 63, status: 'healthy' }];