import React, { useMemo } from 'react';
import { BoxesIcon, PackageCheckIcon, TrendingUpIcon } from 'lucide-react';
import { getProductOrders } from '../data/demo';
import { productFamilies } from '../data/products';
import { useI18n } from '../i18n';
import { AmountVisibilityControl, useSecurity } from './Security';
import { Panel, StatusPill } from './ExecutiveUI';
type ProductPortfolioProps = {
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
};
export function ProductPortfolio({
  selectedProductId,
  onSelectProduct
}: ProductPortfolioProps) {
  const { t, formatNumber } = useI18n();
  const { amountsVisible } = useSecurity();
  const selectedProduct = useMemo(
    () =>
    productFamilies.find((product) => product.id === selectedProductId) ??
    productFamilies[0],
    [selectedProductId]
  );
  const selectedOrders = getProductOrders(selectedProduct.id);
  const formatAmount = (value: number) =>
  amountsVisible ? `${formatNumber(value)} ${t('finance.unit')}` : '••••••';
  return (
    <section className="mb-5" aria-labelledby="product-families-heading">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#69cef5]">
            <BoxesIcon size={16} />
            <span className="text-[11px] font-semibold uppercase tracking-[.14em]">
              {t('products.eyebrow')}
            </span>
          </div>
          <h2
            id="product-families-heading"
            className="text-xl font-semibold tracking-tight text-white">
            
            {t('products.title')}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t('products.description')}
          </p>
        </div>
        <AmountVisibilityControl />
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {productFamilies.map((product) => {
          const selected = product.id === selectedProduct.id;
          const orders = getProductOrders(product.id);
          return (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              aria-pressed={selected}
              className={`rounded-2xl border p-4 text-start transition ${selected ? 'border-[#26afe7]/45 bg-[#159bdb]/[.11] shadow-[0_10px_28px_rgba(0,0,0,.16)]' : 'border-white/[.075] bg-[#111820] hover:border-white/15 hover:bg-white/[.035]'}`}>
              
              <p className="text-base font-semibold text-slate-100">
                {t(product.nameKey)}
              </p>
              <p className="mt-1 truncate text-[11px] text-slate-500">
                {t(product.typeKey)}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <strong className="text-2xl text-[#70d3f6]">
                  {formatNumber(orders.length)}
                </strong>
                <span className="text-[10px] text-slate-500">
                  {t('products.productionOrders')}
                </span>
              </div>
            </button>);

        })}
      </div>
      <Panel className="mt-4 overflow-hidden border-[#1ba6e8]/20">
        <div className="border-b border-white/[.07] bg-[#0f1a23] px-5 py-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#69cef5]">
                {t('products.selectedProduct')}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {t(selectedProduct.nameKey)}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {t(selectedProduct.typeKey)}
              </p>
            </div>
            <StatusPill
              status={
              selectedProduct.inventoryAvailability < 80 ? 'watch' : 'healthy'
              } />
            
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-5">
            <Metric
              label={t('products.annualProduction')}
              value={formatNumber(selectedProduct.annualProduction)} />
            
            <Metric
              label={t('products.capacity')}
              value={`${selectedProduct.currentCapacity}%`} />
            
            <Metric
              label={t('products.oee')}
              value={`${selectedProduct.oee}%`} />
            
            <Metric
              label={t('products.margin')}
              value={`${selectedProduct.profitMargin}%`} />
            
            <Metric
              label={t('products.leadTime')}
              value={`${formatNumber(selectedProduct.leadTimeDays)} ${t('products.days')}`} />
            
          </div>
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-[1.15fr_.85fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Metric
              label={t('products.averageCost')}
              value={formatAmount(selectedProduct.averageManufacturingCost)} />
            
            <Metric
              label={t('products.inventoryAvailability')}
              value={`${selectedProduct.inventoryAvailability}%`} />
            
            <Metric
              label={t('products.qualityScore')}
              value={`${selectedProduct.qualityScore}%`} />
            
            <Metric
              label={t('products.productionOrders')}
              value={formatNumber(selectedOrders.length)} />
            
            <Metric
              label={t('products.activeLine')}
              value={t(
                selectedOrders[0]?.productionLineKey ?? 'line.assemblyA'
              )} />
            
            <Metric
              label={t('products.factoryProducts')}
              value={t('products.productFamily')} />
            
          </div>
          <div className="rounded-xl border border-[#1ba6e8]/20 bg-[#1ba6e8]/[.055] p-4">
            <div className="flex items-center gap-2 text-[#71d2f5]">
              <TrendingUpIcon size={15} />
              <p className="text-[10px] font-semibold uppercase tracking-[.12em]">
                {t('products.aiRecommendation')}
              </p>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              {t(selectedProduct.recommendationKey)}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
              <PackageCheckIcon size={13} className="text-emerald-300" />
              {t('products.productionReady')}
            </div>
          </div>
        </div>
      </Panel>
    </section>);

}
function Metric({ label, value }: {label: string;value: string;}) {
  return (
    <div className="rounded-xl border border-white/[.065] bg-[#0b131a]/70 p-3">
      <p className="text-[10px] text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>);

}