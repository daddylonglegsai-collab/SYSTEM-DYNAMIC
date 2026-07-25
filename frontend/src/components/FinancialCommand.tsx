import React from 'react';
import { AlertTriangleIcon, WalletCardsIcon } from 'lucide-react';
import {
  cashForecast,
  customers,
  financialSummary,
  getProjectEconomics,
  projects } from
'../data/demo';
import { productFamilies } from '../data/products';
import { useI18n } from '../i18n';
import { AmountVisibilityControl, useSecurity } from './Security';
import { Panel, StatusPill } from './ExecutiveUI';
export function FinancialCommand() {
  const { t, formatNumber } = useI18n();
  const { amountsVisible } = useSecurity();
  const formatAmount = (value: number) =>
  amountsVisible ?
  `${formatNumber(Math.round(value))} ${t('finance.unit')}` :
  '••••••';
  const metrics = [
  {
    label: 'finance.currentMonthProfit',
    value: financialSummary.currentMonthProfit,
    tone: 'text-emerald-300',
    detail: 'finance.monthProfitDetail'
  },
  {
    label: 'finance.purchaseBudget',
    value: financialSummary.purchaseBudget,
    tone: 'text-amber-300',
    detail: 'finance.commitmentCount'
  },
  {
    label: 'finance.checkCollections',
    value: financialSummary.expectedCheckCollections,
    tone: 'text-[#75d5f7]',
    detail: 'finance.checkCount'
  },
  {
    label: 'finance.netCashPosition',
    value: financialSummary.netCashPosition,
    tone: 'text-emerald-300',
    detail: 'finance.positiveCash'
  }];

  return (
    <Panel className="mt-5 overflow-hidden border-[#1ba6e8]/20">
      <div className="border-b border-white/[.075] bg-[#0f1d27] px-5 py-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#1ba6e8]/15 text-[#6dd2f6]">
              <WalletCardsIcon size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-slate-100">
                {t('finance.command')}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                {t('finance.commandDescription')} · {t('finance.unit')}
              </p>
            </div>
          </div>
          <AmountVisibilityControl className="self-start sm:self-auto" />
        </div>
      </div>
      <div className="p-5">
        {!amountsVisible &&
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-white/[.07] bg-white/[.025] px-3 py-2 text-[11px] text-slate-500">
            <AlertTriangleIcon size={14} className="text-[#75d5f7]" />
            {t('finance.amountsHidden')}
          </div>
        }
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {metrics.map((metric) =>
          <div
            key={metric.label}
            className="rounded-xl border border-white/[.07] bg-[#0b131a]/75 p-3">
            
              <p className="text-[10px] leading-4 text-slate-500">
                {t(metric.label)}
              </p>
              <p
              className={`mt-3 truncate text-lg font-semibold tracking-tight ${metric.tone}`}>
              
                {formatAmount(metric.value)}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                {t(metric.detail)}
              </p>
            </div>
          )}
        </div>
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.42fr_.9fr]">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-200">
                {t('finance.cashForecast')}
              </p>
              <div className="flex gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <i className="h-2 w-2 rounded-sm bg-[#39bdf0]" />
                  {t('finance.cashIn')}
                </span>
                <span className="flex items-center gap-1">
                  <i className="h-2 w-2 rounded-sm bg-amber-400" />
                  {t('finance.cashOut')}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 rounded-xl border border-white/[.065] bg-[#0b131a]/65 p-3">
              {cashForecast.map((week) => {
                const net = week.cashIn - week.cashOut;
                return (
                  <div key={week.week} className="min-w-0">
                    <div
                      className="flex h-24 items-end justify-center gap-1"
                      aria-label={t(week.week)}>
                      
                      <div
                        className="w-3 rounded-t bg-[#35b7f2]"
                        style={{
                          height: `${week.cashIn / 15000 * 100}%`
                        }} />
                      
                      <div
                        className="w-3 rounded-t bg-amber-400"
                        style={{
                          height: `${week.cashOut / 15000 * 100}%`
                        }} />
                      
                    </div>
                    <p className="mt-2 text-center text-[10px] text-slate-500">
                      {t(week.week)}
                    </p>
                    <p
                      className={`mt-1 text-center text-[10px] font-semibold ${net >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                      
                      {amountsVisible ?
                      `${net >= 0 ? '+' : ''}${formatNumber(net)}` :
                      '••••'}
                    </p>
                  </div>);

              })}
            </div>
          </div>
          <div className="rounded-xl border border-amber-400/15 bg-amber-400/[.055] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-amber-300">
              {t('finance.economicExposure')}
            </p>
            <h3 className="mt-2 text-sm font-semibold text-white">
              {t('finance.exposureTitle')}
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              {t('finance.exposureText')}
            </p>
            <p className="mt-4 text-xl font-semibold text-amber-200">
              {formatAmount(financialSummary.economicExposure)}
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              {formatNumber(financialSummary.exposedOrders)}{' '}
              {t('finance.ordersNeedAttention')}
            </p>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-white/[.065]">
          <table className="w-full min-w-[1200px] text-start">
            <caption className="sr-only">{t('finance.projectTable')}</caption>
            <thead className="bg-[#0b131a]/70 text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                {[
                'finance.customer',
                'finance.project',
                'finance.contractValue',
                'finance.actualCost',
                'finance.expectedProfit',
                'finance.margin',
                'finance.deliveryStatus',
                'finance.risk',
                'finance.paymentStatus',
                'finance.productsIncluded'].
                map((key) =>
                <th key={key} className="px-4 py-3 font-medium">
                    {t(key)}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const customer = customers.find(
                  (item) => item.id === project.customerId
                );
                const economics = getProjectEconomics(project);
                return (
                  <tr
                    key={project.id}
                    className="border-t border-white/[.055] text-xs">
                    
                    <td className="px-4 py-3.5 font-semibold text-slate-200">
                      {customer ? t(customer.nameKey) : ''}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-200">
                        {t(project.nameKey)}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {project.contractNumber}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-slate-400">
                      {formatAmount(economics.contractValue)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-400">
                      {formatAmount(economics.actualCost)}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-emerald-300">
                      {formatAmount(economics.expectedProfit)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-300">
                      {economics.margin.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusPill status={project.deliveryStatus} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusPill status={project.delayRisk} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusPill status={project.paymentStatus} />
                    </td>
                    <td className="px-4 py-3.5 text-slate-400">
                      {project.productIds.
                      map((id) =>
                      productFamilies.find((product) => product.id === id)
                      ).
                      filter(Boolean).
                      map((product) => t(product!.nameKey)).
                      join(' · ')}
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>);

}