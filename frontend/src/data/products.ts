export type HealthStatus = 'healthy' | 'watch' | 'critical';

export type ProductFamily = {
  id: string;
  nameKey: string;
  typeKey: string;
  annualProduction: number;
  currentCapacity: number;
  oee: number;
  profitMargin: number;
  leadTimeDays: number;
  averageManufacturingCost: number;
  inventoryAvailability: number;
  qualityScore: number;
  recommendationKey: string;
};

export const productFamilies: ProductFamily[] = [
{
  id: 'simoprime',
  nameKey: 'product.simoprime',
  typeKey: 'product.type.simoprime',
  annualProduction: 468,
  currentCapacity: 82,
  oee: 78,
  profitMargin: 24,
  leadTimeDays: 28,
  averageManufacturingCost: 980,
  inventoryAvailability: 91,
  qualityScore: 98,
  recommendationKey: 'products.recommendation.simoprime'
},
{
  id: 'sivacon-s8',
  nameKey: 'product.sivacon',
  typeKey: 'product.type.sivacon',
  annualProduction: 286,
  currentCapacity: 76,
  oee: 74,
  profitMargin: 21,
  leadTimeDays: 36,
  averageManufacturingCost: 1280,
  inventoryAvailability: 72,
  qualityScore: 96,
  recommendationKey: 'products.recommendation.sivacon'
},
{
  id: '8pt',
  nameKey: 'product.8pt',
  typeKey: 'product.type.8pt',
  annualProduction: 392,
  currentCapacity: 88,
  oee: 83,
  profitMargin: 26,
  leadTimeDays: 22,
  averageManufacturingCost: 760,
  inventoryAvailability: 94,
  qualityScore: 99,
  recommendationKey: 'products.recommendation.8pt'
},
{
  id: 'a4',
  nameKey: 'product.a4',
  typeKey: 'product.type.a4',
  annualProduction: 344,
  currentCapacity: 69,
  oee: 71,
  profitMargin: 19,
  leadTimeDays: 24,
  averageManufacturingCost: 620,
  inventoryAvailability: 86,
  qualityScore: 95,
  recommendationKey: 'products.recommendation.a4'
},
{
  id: 'ek36',
  nameKey: 'product.ek36',
  typeKey: 'product.type.ek36',
  annualProduction: 214,
  currentCapacity: 73,
  oee: 76,
  profitMargin: 22,
  leadTimeDays: 31,
  averageManufacturingCost: 890,
  inventoryAvailability: 83,
  qualityScore: 97,
  recommendationKey: 'products.recommendation.ek36'
}];


export function getProductFamily(productId: string) {
  return productFamilies.find((product) => product.id === productId);
}