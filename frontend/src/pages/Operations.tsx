import React from 'react';
import { FactoryIcon, PackageCheckIcon, UsersRoundIcon } from 'lucide-react';
import { Panel, SectionHeading, StatusPill } from '../components/ExecutiveUI';
import { ProjectCommand } from '../components/ProjectCommand';
import { AmountVisibilityControl, useSecurity } from '../components/Security';
import {
  financialSummary,
  processes,
  purchaseCommitments,
  warehouseItems } from
'../data/demo';
import { useI18n } from '../i18n';
type OperationsPageProps = {
  type: 'projects' | 'people' | 'warehouse' | 'procurement' | 'factory';
};
function PageHeader({
  title,
  description,
  icon: Icon




}: {title: string;description: string;icon: React.ElementType;}) {
  const { t } = useI18n();
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-[#23b3ec]/20 bg-[#169cda]/10 text-[#5bc7f2]">
          <Icon size={20} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>
      <button className="rounded-xl border border-white/10 bg-white/[.035] px-3 py-2 text-xs text-slate-300 hover:bg-white/[.07]">
        {t('common.export')}
      </button>
    </div>);

}
function Projects() {
  return <ProjectCommand />;
}
function People() {
  const { t } = useI18n();
  const departments = [
  'department.assembly',
  'department.wiring',
  'department.testing',
  'department.quality',
  'department.engineering',
  'department.warehouse',
  'department.planning'];

  return (
    <div>
      <PageHeader
        title={t('hr.title')}
        description={t('hr.description')}
        icon={UsersRoundIcon} />
      
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <Panel className="p-5">
          <SectionHeading
            title={t('hr.skillMatrix')}
            detail={t('common.updated')} />
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-start">
              <thead className="text-[10px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">{t('hr.skillMatrix')}</th>
                  {['5', '4', '3', '2', '1'].map((star) =>
                  <th key={star} className="pb-3 text-center font-medium">
                      ★ {star}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {departments.map((department, i) =>
                <tr key={department} className="border-t border-white/[.06]">
                    <td className="py-4 text-xs text-slate-300">
                      {t(department)}
                    </td>
                    {[0, 1, 2, 3, 4].map((column) =>
                  <td key={column} className="py-4 text-center">
                        <span
                      className={`inline-grid h-7 w-7 place-items-center rounded-md text-[11px] font-semibold ${column < i % 4 + 1 ? 'bg-[#1aa5e4]/15 text-[#6bd0f6]' : 'bg-white/[.035] text-slate-500'}`}>
                      
                          {[12, 18, 24, 9, 4][(column + i) % 5]}
                        </span>
                      </td>
                  )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel className="border-[#22b2eb]/15 bg-[#148bc2]/[.055] p-5">
            <p className="text-xs font-semibold text-[#74d3f6]">
              {t('hr.workforce')}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              {t('hr.workforceText')}
            </p>
            <button className="mt-5 rounded-lg bg-[#1ca6e4] px-3 py-2 text-xs font-semibold text-white">
              {t('common.apply')}
            </button>
          </Panel>
          <Panel className="p-5">
            <SectionHeading title={t('hr.available')} />
            {[
            ['hr.star5', '19'],
            ['hr.star4', '43'],
            ['hr.star3', '28'],
            ['hr.star2', '9'],
            ['hr.star1', '3']].
            map(([key, count]) =>
            <div key={key} className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">{t(key)}</span>
                <span className="text-sm font-semibold">{count}</span>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>);

}
function Warehouse() {
  const { t } = useI18n();
  return (
    <div>
      <PageHeader
        title={t('warehouse.title')}
        description={t('warehouse.description')}
        icon={PackageCheckIcon} />
      
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <Panel className="overflow-hidden p-5">
          <SectionHeading
            title={t('warehouse.abc')}
            detail={t('warehouse.stock')} />
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-start">
              <thead className="text-[10px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-4 font-medium">Material</th>
                  <th className="pb-4 font-medium">{t('warehouse.stock')}</th>
                  <th className="pb-4 font-medium">{t('warehouse.reorder')}</th>
                  <th className="pb-4 font-medium">ABC</th>
                  <th className="pb-4 font-medium">{t('warehouse.status')}</th>
                </tr>
              </thead>
              <tbody>
                {warehouseItems.map((item) =>
                <tr
                  key={item.name}
                  className="border-t border-white/[.065] text-xs">
                  
                    <td className="py-4 font-medium text-slate-200">
                      {item.name}
                    </td>
                    <td className="py-4 text-slate-400">{item.cover} d</td>
                    <td className="py-4 text-slate-400">{item.reorder} d</td>
                    <td className="py-4">
                      <span className="rounded bg-white/[.06] px-2 py-1 text-[10px] font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4">
                      <StatusPill
                      status={item.status as 'healthy' | 'watch' | 'critical'} />
                    
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel className="p-5">
          <SectionHeading
            title={t('warehouse.heatmap')}
            detail={t('warehouse.fast')} />
          
          <div className="grid grid-cols-5 gap-2">
            {Array.from(
              {
                length: 25
              },
              (_, i) =>
              <div
                key={i}
                className={`aspect-square rounded-md ${[3, 8, 12, 13, 17].includes(i) ? 'bg-red-400/80' : [1, 6, 7, 11, 16, 21].includes(i) ? 'bg-amber-400/70' : 'bg-emerald-400/35'}`} />


            )}
          </div>
          <div className="mt-5 space-y-3 border-t border-white/[.07] pt-4">
            {[
            ['warehouse.fast', '132'],
            ['warehouse.slow', '38'],
            ['warehouse.critical', '4']].
            map(([label, value]) =>
            <div key={label} className="flex justify-between text-xs">
                <span className="text-slate-400">{t(label)}</span>
                <span className="font-semibold">{value}</span>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>);

}
function Procurement() {
  const { t, formatNumber } = useI18n();
  const { amountsVisible } = useSecurity();
  const suppliers = [
  ['Aria Metal', '84', 'healthy'],
  ['Tavan Control', '76', 'watch'],
  ['Nikan Copper', '69', 'critical'],
  ['Pars Relay', '92', 'healthy']];

  const formatAmount = (value: number) =>
  amountsVisible ? `${formatNumber(value)} ${t('finance.unit')}` : '••••••';
  return (
    <div>
      <PageHeader
        title={t('procurement.title')}
        description={t('procurement.description')}
        icon={PackageCheckIcon} />
      
      <div className="mb-4 flex justify-end">
        <AmountVisibilityControl />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
        ['procurement.leadTime', '18d'],
        ['procurement.purchaseOrders', '42'],
        ['procurement.delayed', '6'],
        [
        'finance.purchaseBudget',
        formatAmount(financialSummary.purchaseBudget)]].

        map(([label, value]) =>
        <Panel key={label} className="p-4">
            <p className="text-xs text-slate-500">{t(label)}</p>
            <p className="mt-4 text-2xl font-semibold">{value}</p>
          </Panel>
        )}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <Panel className="p-5">
          <SectionHeading
            title={t('finance.commitmentPlan')}
            detail={`${t('finance.totalDue')}: ${formatAmount(financialSummary.purchaseBudget)}`} />
          
          <div className="space-y-4">
            {purchaseCommitments.map((commitment) =>
            <div
              key={commitment.name}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/[.06] pb-3 last:border-0 last:pb-0">
              
                <div>
                  <p className="text-xs font-medium text-slate-200">
                    {commitment.name}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {t(commitment.due)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-amber-300">
                    {formatAmount(commitment.amount)}
                  </span>
                  <StatusPill
                  status={
                  commitment.status as 'healthy' | 'watch' | 'critical'
                  } />
                
                </div>
              </div>
            )}
          </div>
        </Panel>
        <Panel className="p-5">
          <SectionHeading
            title={t('procurement.supplierScore')}
            detail={t('procurement.sanction')} />
          
          <div className="space-y-4">
            {suppliers.map(([name, score, status]) =>
            <div
              key={name}
              className="grid grid-cols-[110px_1fr_auto] items-center gap-3">
              
                <span className="truncate text-xs font-medium text-slate-300">
                  {name}
                </span>
                <div className="h-2 rounded-full bg-white/[.07]">
                  <div
                  className="h-full rounded-full bg-[#2db6ed]"
                  style={{
                    width: `${score}%`
                  }} />
                
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{score}</span>
                  <StatusPill
                  status={status as 'healthy' | 'watch' | 'critical'} />
                
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>);

}
function Factory() {
  const { t } = useI18n();
  return (
    <div>
      <PageHeader
        title={t('factory.title')}
        description={t('factory.description')}
        icon={FactoryIcon} />
      
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <Panel className="overflow-hidden">
          <div className="relative h-[350px]">
            <img
              src="/magic_3.jpg"
              alt={t('dashboard.factoryImage')}
              className="h-full w-full object-cover opacity-65" />
            
            <div className="absolute inset-0 bg-[#061119]/45" />
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-3 p-6">
              {processes.map((process) =>
              <div
                key={process.key}
                className="flex flex-col justify-between rounded-lg border border-white/15 bg-[#08131c]/80 p-3">
                
                  <span className="text-[10px] text-slate-300">
                    {process.key}
                  </span>
                  <strong className="text-lg">{process.value}%</strong>
                  <span
                  className={`h-1 rounded-full ${process.status === 'watch' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                
                </div>
              )}
            </div>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel className="p-5">
            <SectionHeading title={t('factory.utilization')} />
            <div className="space-y-3">
              {processes.slice(0, 5).map((process) =>
              <div key={process.key}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-slate-400">{process.key}</span>
                    <span>{process.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[.07]">
                    <div
                    className="h-full rounded-full bg-[#36baf0]"
                    style={{
                      width: `${process.value}%`
                    }} />
                  
                  </div>
                </div>
              )}
            </div>
          </Panel>
          <Panel className="p-5">
            <SectionHeading title={t('factory.maintenance')} />
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">CNC 04</span>
                <StatusPill status="watch" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Paint line</span>
                <StatusPill status="healthy" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Test bench 02</span>
                <StatusPill status="healthy" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>);

}
export function OperationsPage({ type }: OperationsPageProps) {
  if (type === 'projects') return <Projects />;
  if (type === 'people') return <People />;
  if (type === 'warehouse') return <Warehouse />;
  if (type === 'procurement') return <Procurement />;
  return <Factory />;
}