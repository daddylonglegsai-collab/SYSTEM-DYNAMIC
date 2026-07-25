import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  BrainCircuitIcon,
  CircleCheckIcon,
  ShieldCheckIcon } from
'lucide-react';
import {
  KpiCard,
  Panel,
  RadialGauge,
  SectionHeading,
  Sparkline,
  StatusPill } from
'../components/ExecutiveUI';
import { FinancialCommand } from '../components/FinancialCommand';
import { useI18n } from '../i18n';
export function Dashboard() {
  const { t, dir } = useI18n();
  const metrics = [
  ['dashboard.capacity', '84%', '+4.2%', 'dashboard.vsLastWeek', 'blue'],
  ['dashboard.projects', '18', '+2', 'dashboard.projectsDue', 'blue'],
  ['dashboard.inventory', '91%', '+3.8%', 'dashboard.stockCover', 'emerald'],
  ['dashboard.materials', '4', '-2', 'dashboard.items', 'amber'],
  ['dashboard.risk', 'Medium', '-8%', 'dashboard.riskAction', 'amber'],
  ['dashboard.delivery', '93.6%', '+1.5%', 'dashboard.delivered', 'emerald'],
  ['dashboard.oee', '76.4%', '+2.1%', 'dashboard.oeeTarget', 'blue'],
  ['dashboard.health', '87/100', '+4', 'dashboard.healthSub', 'emerald']] as
  const;
  return (
    <div className="mx-auto max-w-[1640px]">
      <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.18em] text-[#46bff3]">
            {t('dashboard.eyebrow')}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {t('dashboard.title')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {t('dashboard.description')}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/[.075] bg-white/[.025] px-3 py-2 text-xs text-slate-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {t('common.updated')}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        {metrics.map(([label, value, delta, sub, tone], index) =>
        <motion.div
          key={label}
          transition={{
            delay: index * 0.035
          }}>
          
            <KpiCard
            label={t(label)}
            value={value}
            delta={delta}
            sub={t(sub)}
            tone={tone} />
          
          </motion.div>
        )}
      </div>

      <FinancialCommand />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_.8fr]">
        <Panel className="overflow-hidden p-5">
          <SectionHeading
            title={t('dashboard.titleFactory')}
            detail={t('dashboard.factoryDescription')}
            action={
            <button className="text-xs font-semibold text-[#66c9f5] hover:text-white">
                {t('common.details')}
              </button>
            } />
          
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-3xl font-semibold text-white">76.4%</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t('dashboard.oee')}
                  </p>
                </div>
                <StatusPill status="healthy" />
              </div>
              <Sparkline
                values={[
                38, 44, 40, 49, 48, 52, 54, 49, 58, 61, 57, 66, 68, 72]
                } />
              
              <div className="mt-3 flex justify-between text-[10px] text-slate-600">
                <span>06:00</span>
                <span>10:00</span>
                <span>14:00</span>
                <span>18:00</span>
                <span>22:00</span>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {[
                ['dashboard.lineLaser', '84', 'healthy'],
                ['dashboard.lineAssembly', '88', 'watch'],
                ['dashboard.lineTesting', '81', 'healthy'],
                ['dashboard.linePacking', '63', 'healthy']].
                map(([label, value, status]) =>
                <div
                  key={label}
                  className="rounded-xl border border-white/[.065] bg-white/[.025] p-2.5">
                  
                    <p className="truncate text-[10px] text-slate-500">
                      {t(label)}
                    </p>
                    <p className="mt-2 text-sm font-semibold">{value}%</p>
                    <span
                    className={`mt-2 block h-1 rounded-full ${status === 'watch' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-white/[.065] bg-[#0d151d] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-300">
                  {t('dashboard.factoryOverview')}
                </p>
                <div size={16} className="text-[#48c0f4]" />
              </div>
              <div className="relative h-[206px] overflow-hidden rounded-lg">
                <img
                  src="/magic_4.jpg"
                  alt={t('dashboard.factoryImage')}
                  className="h-full w-full object-cover opacity-55" />
                
                <div className="absolute inset-0 bg-[#06111a]/45" />
                <div className="absolute left-[13%] top-[23%] h-14 w-24 rounded border border-[#4ec7f5]/70 bg-[#159bdb]/20" />
                <div className="absolute right-[18%] top-[38%] h-12 w-20 rounded border border-emerald-300/60 bg-emerald-400/15" />
                <div className="absolute bottom-[18%] left-[40%] h-10 w-20 rounded border border-amber-300/70 bg-amber-300/10" />
                <div className="absolute bottom-3 left-3 rounded bg-[#06111a]/85 px-2 py-1 text-[10px] text-[#86d9fb]">
                  8 {t('factory.running')}
                </div>
              </div>
            </div>
          </div>
        </Panel>
        <Panel className="p-5">
          <SectionHeading
            title={t('dashboard.recommendations')}
            detail={t('top.alerts')} />
          
          <div className="rounded-xl border border-[#1ba6e8]/20 bg-[#1ba6e8]/[.07] p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#1ba6e8]/15 text-[#64cef7]">
                <BrainCircuitIcon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-5 text-white">
                  {t('dashboard.recommendationTitle')}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {t('dashboard.recommendationText')}
                </p>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#6ed0f7] transition hover:text-white">
              {t('dashboard.action')}
              <ArrowRightIcon
                className={dir === 'rtl' ? 'rotate-180' : ''}
                size={14} />
              
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[.065] p-3">
              <div className="flex justify-between">
                <AlertTriangleIcon size={16} className="text-amber-300" />
                <span className="text-[10px] text-slate-500">S8</span>
              </div>
              <p className="mt-3 text-xl font-semibold">6h</p>
              <p className="mt-1 text-[11px] text-slate-500">
                {t('dashboard.timeline')}
              </p>
            </div>
            <div className="rounded-xl border border-white/[.065] p-3">
              <div className="flex justify-between">
                <ShieldCheckIcon size={16} className="text-emerald-300" />
                <span className="text-[10px] text-slate-500">8PT</span>
              </div>
              <p className="mt-3 text-xl font-semibold">100%</p>
              <p className="mt-1 text-[11px] text-slate-500">
                {t('dashboard.inventory')}
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <Panel className="p-5">
          <SectionHeading
            title={t('dashboard.timeline')}
            detail={t('dashboard.riskMatrixText')} />
          
          <div className="space-y-5">
            {[
            ['SIMOPRIME', 'stage.assembly', '72', 'healthy'],
            ['SIVACON S8', 'stage.assembly', '54', 'critical'],
            ['8PT', 'stage.testing', '88', 'healthy'],
            ['EK36', 'stage.packing', '67', 'watch']].
            map(([name, stage, progress, status]) =>
            <div
              key={name}
              className="grid grid-cols-[112px_1fr_auto] items-center gap-3">
              
                <div>
                  <p className="text-xs font-semibold text-slate-200">{name}</p>
                  <p className="mt-1 text-[10px] text-slate-500">{t(stage)}</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[.07]">
                  <motion.div
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${progress}%`
                  }}
                  className={`h-full rounded-full ${status === 'critical' ? 'bg-red-400' : status === 'watch' ? 'bg-amber-400' : 'bg-[#32b6ee]'}`} />
                
                </div>
                <StatusPill
                status={status as 'healthy' | 'watch' | 'critical'} />
              
              </div>
            )}
          </div>
        </Panel>
        <Panel className="p-5">
          <SectionHeading
            title={t('dashboard.riskMatrix')}
            detail={t('dashboard.riskMatrixText')} />
          
          <div className="grid grid-cols-2 gap-5">
            <RadialGauge
              value={82}
              label={t('dashboard.delivery')}
              tone="emerald" />
            
            <RadialGauge value={48} label={t('dashboard.risk')} tone="amber" />
          </div>
          <div className="mt-5 border-t border-white/[.07] pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CircleCheckIcon size={15} className="text-emerald-400" />
              {t('common.stable')}
              <span className="ms-auto text-slate-200">14</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <AlertTriangleIcon size={15} className="text-amber-400" />
              {t('common.medium')}
              <span className="ms-auto text-slate-200">4</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>);

}