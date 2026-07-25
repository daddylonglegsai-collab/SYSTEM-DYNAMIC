import React, { useMemo, useState, Fragment } from 'react';
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  BrainCircuitIcon,
  Building2Icon,
  ChevronRightIcon,
  FactoryIcon,
  GaugeIcon,
  PackageCheckIcon,
  PackageSearchIcon,
  ShieldCheckIcon,
  UsersRoundIcon,
  WrenchIcon } from
'lucide-react';
import {
  customers,
  getCustomerContractValue,
  getCustomerProjects,
  getProjectEconomics,
  getProjectProductBreakdown,
  projects,
  type ManufacturingOrder,
  type Project } from
'../data/demo';
import { useI18n } from '../i18n';
import { AmountVisibilityControl, useSecurity } from './Security';
import { Panel, RadialGauge, SectionHeading, StatusPill } from './ExecutiveUI';
import { ProductPortfolio } from './ProductPortfolio';
export function ProjectCommand() {
  const { t, formatNumber } = useI18n();
  const { amountsVisible } = useSecurity();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId
  );
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  const selectedOrder = selectedProject ?
  getProjectProductBreakdown(selectedProject.id).find(
    (item) => item.order.id === selectedOrderId
  ) :
  undefined;
  const formatAmount = (value: number) =>
  amountsVisible ?
  `${formatNumber(Math.round(value))} ${t('finance.unit')}` :
  '••••••';
  const selectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId || null);
    setSelectedProjectId(null);
    setSelectedProductId(null);
    setSelectedOrderId(null);
  };
  const selectProject = (projectId: string) => {
    const firstOrder = getProjectProductBreakdown(projectId)[0];
    setSelectedProjectId(projectId);
    setSelectedProductId(firstOrder?.product.id ?? null);
    setSelectedOrderId(firstOrder?.order.id ?? null);
  };
  return (
    <div className="mx-auto max-w-[1640px]">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-[#23b3ec]/20 bg-[#169cda]/10 text-[#5bc7f2]">
            <Building2Icon size={20} />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#55c6f2]">
            {t('projects.eyebrow')}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {t('projects.title')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            {t('projects.description')}
          </p>
        </div>
        <AmountVisibilityControl />
      </div>
      <HierarchyTrail
        selectedCustomer={selectedCustomer}
        selectedProject={selectedProject}
        selectedProductNameKey={selectedOrder?.product.nameKey}
        selectedOrderId={selectedOrder?.order.id}
        selectedStageNameKey={
        selectedOrder?.order.stages.find((stage) => stage.progress < 100)?.
        nameKey
        }
        onCustomers={() => selectCustomer('')}
        onCustomer={() => {
          setSelectedProjectId(null);
          setSelectedProductId(null);
          setSelectedOrderId(null);
        }} />
      
      {!selectedCustomer &&
      <CustomerPortfolio
        onSelectCustomer={selectCustomer}
        formatAmount={formatAmount} />

      }
      {selectedCustomer && !selectedProject &&
      <CustomerProjects
        customerId={selectedCustomer.id}
        onBack={() => selectCustomer('')}
        onSelectProject={selectProject}
        formatAmount={formatAmount} />

      }
      {selectedProject && selectedCustomer &&
      <ProjectCommandCenter
        project={selectedProject}
        customer={selectedCustomer}
        selectedProductId={selectedProductId}
        selectedOrderId={selectedOrderId}
        onBack={() => {
          setSelectedProjectId(null);
          setSelectedProductId(null);
          setSelectedOrderId(null);
        }}
        onSelectProduct={setSelectedProductId}
        onSelectOrder={setSelectedOrderId}
        formatAmount={formatAmount} />

      }
      {!selectedCustomer && !selectedProject &&
      <ProductPortfolio
        selectedProductId={selectedProductId}
        onSelectProduct={setSelectedProductId} />

      }
    </div>);

}
function HierarchyTrail({
  selectedCustomer,
  selectedProject,
  selectedProductNameKey,
  selectedOrderId,
  selectedStageNameKey,
  onCustomers,
  onCustomer








}: {selectedCustomer: (typeof customers)[number] | undefined;selectedProject: Project | undefined;selectedProductNameKey?: string;selectedOrderId?: string;selectedStageNameKey?: string;onCustomers: () => void;onCustomer: () => void;}) {
  const { t, dir } = useI18n();
  const items = [
  {
    key: 'hierarchy.company',
    active: false,
    onClick: onCustomers
  },
  {
    key: 'hierarchy.customers',
    active: !selectedCustomer,
    onClick: onCustomers
  },
  ...(selectedCustomer ?
  [
  {
    key: selectedCustomer.nameKey,
    active: !selectedProject,
    onClick: onCustomer
  }] :

  []),
  ...(selectedProject ?
  [
  {
    key: selectedProject.nameKey,
    active: !selectedProductNameKey,
    onClick: () => undefined
  }] :

  []),
  ...(selectedProductNameKey ?
  [
  {
    key: selectedProductNameKey,
    active: !selectedOrderId,
    onClick: () => undefined
  }] :

  []),
  ...(selectedOrderId ?
  [
  {
    key: selectedOrderId,
    active: !selectedStageNameKey,
    onClick: () => undefined
  }] :

  []),
  ...(selectedStageNameKey ?
  [
  {
    key: selectedStageNameKey,
    active: true,
    onClick: () => undefined
  }] :

  [])];

  return (
    <nav
      className="mb-5 flex flex-wrap items-center gap-1.5 text-[11px]"
      aria-label={t('projects.drilldown')}>
      
      {items.map((item, index) =>
      <Fragment key={item.key}>
          {index > 0 &&
        <ChevronRightIcon
          size={13}
          className={`text-slate-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />

        }
          <button
          type="button"
          disabled={item.active}
          onClick={item.onClick}
          className={`rounded-md px-1.5 py-1 ${item.active ? 'font-semibold text-[#72d6f7]' : 'text-slate-500 hover:text-slate-200'}`}>
          
            {t(item.key)}
          </button>
        </Fragment>
      )}
    </nav>);

}
function CustomerPortfolio({
  onSelectCustomer,
  formatAmount



}: {onSelectCustomer: (customerId: string) => void;formatAmount: (value: number) => string;}) {
  const { t, formatNumber } = useI18n();
  return (
    <section className="mb-6" aria-labelledby="customers-heading">
      <SectionHeading
        title={t('customers.title')}
        detail={t('customers.description')} />
      
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer, index) => {
          const activeProjects = getCustomerProjects(customer.id);
          return (
            <Panel key={customer.id} className="relative overflow-hidden p-5">
              <div
                className="absolute inset-x-0 top-0 h-px bg-[#37bcef]"
                style={{
                  opacity: 0.2 + index * 0.08
                }} />
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-100">
                    {t(customer.nameKey)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t(customer.industryKey)}
                  </p>
                </div>
                <StatusPill status={customer.risk} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <MiniMetric
                  label={t('customers.activeProjects')}
                  value={formatNumber(activeProjects.length)} />
                
                <MiniMetric
                  label={t('customers.contractValue')}
                  value={formatAmount(getCustomerContractValue(customer.id))}
                  tone="text-[#78d7f7]" />
                
                <MiniMetric
                  label={t('customers.satisfaction')}
                  value={`${customer.satisfaction}%`} />
                
                <MiniMetric
                  label={t('customers.deliveryPerformance')}
                  value={`${customer.deliveryPerformance}%`} />
                
              </div>
              <div className="mt-4 rounded-xl border border-white/[.065] bg-[#0b131a]/60 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-slate-500">
                    {t('customers.paymentStatus')}
                  </p>
                  <StatusPill status={customer.paymentStatus} />
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    {t('customers.strategicImportance')}
                  </span>
                  <span className="font-semibold text-amber-300">
                    {customer.strategicImportance}/100
                  </span>
                </div>
                <p className="mt-3 border-t border-white/[.06] pt-3 text-[11px] leading-5 text-slate-400">
                  <span className="font-semibold text-[#65cef5]">
                    {t('customers.aiRisk')} ·{' '}
                  </span>
                  {t(customer.riskRecommendationKey)}
                </p>
              </div>
              <button
                onClick={() => onSelectCustomer(customer.id)}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#67cef5] hover:text-white">
                
                {t('customers.openProfile')}
                <ChevronRightIcon size={14} />
              </button>
            </Panel>);

        })}
      </div>
    </section>);

}
function CustomerProjects({
  customerId,
  onBack,
  onSelectProject,
  formatAmount





}: {customerId: string;onBack: () => void;onSelectProject: (projectId: string) => void;formatAmount: (value: number) => string;}) {
  const { t, formatNumber } = useI18n();
  const customer = customers.find((item) => item.id === customerId)!;
  const customerProjects = getCustomerProjects(customerId);
  return (
    <section className="mb-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white">
            
            <ArrowLeftIcon size={14} />
            {t('projects.backToCustomers')}
          </button>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {t(customer.nameKey)}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t('customers.projectsForCustomer')}
          </p>
        </div>
        <StatusPill status={customer.risk} />
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <MiniMetric
          label={t('customers.activeProjects')}
          value={formatNumber(customerProjects.length)} />
        
        <MiniMetric
          label={t('customers.satisfaction')}
          value={`${customer.satisfaction}%`} />
        
        <MiniMetric
          label={t('customers.deliveryPerformance')}
          value={`${customer.deliveryPerformance}%`} />
        
        <MiniMetric
          label={t('customers.contractValue')}
          value={formatAmount(getCustomerContractValue(customerId))}
          tone="text-[#71d6f7]" />
        
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {customerProjects.map((project) =>
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onSelectProject(project.id)}
          formatAmount={formatAmount} />

        )}
      </div>
    </section>);

}
function ProjectCard({
  project,
  onClick,
  formatAmount




}: {project: Project;onClick: () => void;formatAmount: (value: number) => string;}) {
  const { t } = useI18n();
  const economics = getProjectEconomics(project);
  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">
            {t(project.nameKey)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {project.contractNumber} · {t(project.currentStageKey)}
          </p>
        </div>
        <StatusPill status={project.delayRisk} />
      </div>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-slate-400">
          <span>{t('projects.contractProgress')}</span>
          <span className="font-semibold text-slate-200">
            {project.progress}%
          </span>
        </div>
        <Progress value={project.progress} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/[.065] py-4">
        <MiniMetric
          label={t('projects.healthScore')}
          value={`${project.healthScore}/100`} />
        
        <MiniMetric
          label={t('projects.materialReadiness')}
          value={`${project.materialReadiness}%`} />
        
        <MiniMetric
          label={t('finance.expectedProfit')}
          value={formatAmount(economics.expectedProfit)}
          tone="text-emerald-300" />
        
        <MiniMetric
          label={t('projects.deliveryDate')}
          value={t(project.deliveryDateKey)} />
        
      </div>
      <button
        onClick={onClick}
        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#62cef5] hover:text-white">
        
        {t('projects.openCommand')}
        <ChevronRightIcon size={14} />
      </button>
    </Panel>);

}
function ProjectCommandCenter({
  project,
  customer,
  selectedProductId,
  selectedOrderId,
  onBack,
  onSelectProduct,
  onSelectOrder,
  formatAmount









}: {project: Project;customer: (typeof customers)[number];selectedProductId: string | null;selectedOrderId: string | null;onBack: () => void;onSelectProduct: (productId: string) => void;onSelectOrder: (orderId: string) => void;formatAmount: (value: number) => string;}) {
  const { t } = useI18n();
  const details = useMemo(
    () => getProjectProductBreakdown(project.id),
    [project.id]
  );
  const economics = getProjectEconomics(project);
  const selectedOrder =
  details.find((item) => item.order.id === selectedOrderId)?.order ??
  details[0]?.order;
  const bottleneck =
  details.find((item) => item.order.qualityStatus !== 'healthy') ?? details[0];
  return (
    <section className="mb-6">
      <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <button
            onClick={onBack}
            className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white">
            
            <ArrowLeftIcon size={14} />
            {t('projects.backToProjects')}
          </button>
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#65cef5]">
            {t('projects.commandCenter')}
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {t(project.nameKey)}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {t(customer.nameKey)} · {project.contractNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={project.delayRisk} />
          <span className="rounded-lg border border-white/[.08] bg-white/[.03] px-3 py-2 text-xs text-slate-400">
            {t('projects.deliveryDate')}:{' '}
            <strong className="text-slate-200">
              {t(project.deliveryDateKey)}
            </strong>
          </span>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MiniMetric
          label={t('projects.contractProgress')}
          value={`${project.progress}%`}
          tone="text-[#76d9f8]" />
        
        <MiniMetric
          label={t('projects.healthScore')}
          value={`${project.healthScore}/100`}
          tone="text-emerald-300" />
        
        <MiniMetric
          label={t('projects.materialReadiness')}
          value={`${project.materialReadiness}%`} />
        
        <MiniMetric
          label={t('projects.deliveryConfidence')}
          value={`${project.healthScore + 4}%`}
          tone="text-[#75d5f7]" />
        
        <MiniMetric
          label={t('finance.expectedProfit')}
          value={formatAmount(economics.expectedProfit)}
          tone="text-emerald-300" />
        
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <Panel className="overflow-hidden p-5">
          <SectionHeading
            title={t('projects.productionTimeline')}
            detail={t('projects.ganttDetail')} />
          
          <div className="space-y-4">
            {details.map(({ order, product }) =>
            <button
              key={order.id}
              onClick={() => {
                onSelectProduct(product.id);
                onSelectOrder(order.id);
              }}
              aria-pressed={selectedOrder?.id === order.id}
              className={`w-full rounded-xl border p-3 text-start transition ${selectedOrder?.id === order.id ? 'border-[#28afe9]/40 bg-[#159bdb]/[.08]' : 'border-white/[.065] bg-[#0b131a]/45 hover:border-white/15'}`}>
              
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      {t(product.nameKey)}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {order.id} · {order.quantity} {t('products.units')}
                    </p>
                  </div>
                  <StatusPill status={order.qualityStatus} />
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {order.stages.map((stage) =>
                <div key={stage.id}>
                      <div className="h-2 overflow-hidden rounded bg-white/[.07]">
                        <div
                      className={`h-full rounded ${stage.status === 'critical' ? 'bg-red-400' : stage.status === 'watch' ? 'bg-amber-400' : 'bg-[#31b8ed]'}`}
                      style={{
                        width: `${Math.min(100, stage.progress)}%`
                      }} />
                    
                      </div>
                      <p className="mt-1 truncate text-[9px] text-slate-600">
                        {t(stage.nameKey)}
                      </p>
                    </div>
                )}
                </div>
              </button>
            )}
          </div>
        </Panel>
        <Panel className="p-5">
          <SectionHeading
            title={t('projects.riskMatrix')}
            detail={t('projects.deliveryConfidence')} />
          
          <div className="grid grid-cols-2 gap-3">
            <RadialGauge
              value={project.healthScore + 4}
              label={t('projects.deliveryConfidence')}
              tone="emerald" />
            
            <RadialGauge
              value={
              project.delayRisk === 'critical' ?
              74 :
              project.delayRisk === 'watch' ?
              42 :
              18
              }
              label={t('projects.delayRisk')}
              tone={project.delayRisk === 'critical' ? 'red' : 'amber'} />
            
          </div>
          <div className="mt-5 border-t border-white/[.07] pt-4">
            <p className="text-[10px] text-slate-500">
              {t('projects.currentStage')}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-200">
              {t(project.currentStageKey)}
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              {t(project.recommendationKey)}
            </p>
          </div>
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <Panel className="p-5">
          <SectionHeading
            title={t('projects.resourceCommand')}
            detail={t('projects.allocationDetail')} />
          
          <div className="space-y-4">
            <Allocation
              icon={<PackageSearchIcon size={16} />}
              label={t('projects.materialDashboard')}
              value={`${project.materialReadiness}%`}
              detail={t('projects.materialAllocation')}
              tone="bg-[#2db6ed]" />
            
            <Allocation
              icon={<UsersRoundIcon size={16} />}
              label={t('projects.workforceAllocation')}
              value="34"
              detail={t('projects.assignedSpecialists')}
              tone="bg-emerald-400" />
            
            <Allocation
              icon={<WrenchIcon size={16} />}
              label={t('projects.machineAllocation')}
              value="76%"
              detail={t('projects.machineAvailability')}
              tone="bg-amber-400" />
            
          </div>
          <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/[.045] p-4">
            <div className="flex items-center gap-2 text-red-300">
              <AlertTriangleIcon size={16} />
              <p className="text-xs font-semibold">
                {t('projects.productionBottlenecks')}
              </p>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              {bottleneck ?
              `${t(bottleneck.product.nameKey)} · ${t(bottleneck.order.productionLineKey)} · ${t('projects.bottleneckDetail')}` :
              t('projects.noBottlenecks')}
            </p>
          </div>
        </Panel>
        <Panel className="p-5">
          <SectionHeading
            title={t('projects.digitalTwin')}
            detail={t('projects.digitalTwinDetail')} />
          
          <div className="relative min-h-[262px] overflow-hidden rounded-xl border border-white/[.07] bg-[#0b131a]">
            <div className="industrial-grid absolute inset-0 opacity-50" />
            <div className="relative grid h-full min-h-[262px] grid-cols-3 grid-rows-2 gap-3 p-5">
              <TwinNode
                label={t('stage.fabrication')}
                tone="border-[#31b8ed] bg-[#159bdb]/15"
                value="82%" />
              
              <TwinNode
                label={t('stage.assembly')}
                tone="border-amber-300/70 bg-amber-400/10"
                value="74%" />
              
              <TwinNode
                label={t('stage.wiring')}
                tone="border-red-300/70 bg-red-400/10"
                value="91%" />
              
              <TwinNode
                label={t('stage.testing')}
                tone="border-emerald-300/70 bg-emerald-400/10"
                value="67%" />
              
              <div className="col-span-2 flex items-end justify-between rounded-lg border border-white/10 bg-[#101d27]/80 p-3">
                <div>
                  <p className="text-[10px] text-slate-500">
                    {t('projects.factoryFlow')}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-200">
                    {t(selectedOrder?.productionLineKey ?? 'line.assemblyA')}
                  </p>
                </div>
                <FactoryIcon size={20} className="text-[#67cef5]" />
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <Panel className="p-5">
          <SectionHeading
            title={t('projects.productBreakdown')}
            detail={t('projects.productBreakdownDetail')} />
          
          <div className="grid gap-3 md:grid-cols-3">
            {details.map(({ order, product }) =>
            <button
              key={order.id}
              onClick={() => {
                onSelectProduct(product.id);
                onSelectOrder(order.id);
              }}
              aria-pressed={selectedProductId === product.id}
              className={`rounded-xl border p-4 text-start transition ${selectedProductId === product.id ? 'border-[#2ab7ed]/40 bg-[#159bdb]/[.09]' : 'border-white/[.065] bg-[#0b131a]/50 hover:border-white/15'}`}>
              
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {t(product.nameKey)}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {order.quantity} {t('products.units')}
                    </p>
                  </div>
                  <StatusPill status={order.qualityStatus} />
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex justify-between text-[10px] text-slate-500">
                    <span>{t('products.productProgress')}</span>
                    <span>{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} />
                </div>
                <dl className="mt-4 space-y-2 text-[11px]">
                  <Row
                  label={t('projects.materialReadiness')}
                  value={`${order.materialReadiness}%`} />
                
                  <Row
                  label={t('projects.productionLine')}
                  value={t(order.productionLineKey)} />
                
                  <Row
                  label={t('projects.assignedFactory')}
                  value={t(order.factoryKey)} />
                
                  <Row
                  label={t('projects.estimatedCompletion')}
                  value={t(order.estimatedCompletionKey)} />
                
                </dl>
              </button>
            )}
          </div>
        </Panel>
        <Panel className="border-[#1ba6e8]/20 bg-[#108dc4]/[.055] p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#1ba6e8]/15 text-[#6ed2f6]">
              <BrainCircuitIcon size={18} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#78d9f8]">
                {t('projects.aiExecutiveAnalysis')}
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">
                {t('projects.aiAnalysisTitle')}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-300">
            {t(project.recommendationKey)}
          </p>
          <div className="mt-5 border-t border-[#49c3f0]/15 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#78d9f8]">
              {t('projects.aiRecommendedActions')}
            </p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-300">
              <li className="flex gap-2">
                <ShieldCheckIcon
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-300" />
                
                {t('projects.actionOne')}
              </li>
              <li className="flex gap-2">
                <ShieldCheckIcon
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-300" />
                
                {t('projects.actionTwo')}
              </li>
            </ul>
          </div>
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[.85fr_1.15fr]">
        <Panel className="p-5">
          <SectionHeading
            title={t('projects.financialOverview')}
            detail={t('projects.contractFinancialDetail')} />
          
          <div className="grid grid-cols-2 gap-3">
            <MiniMetric
              label={t('finance.contractValue')}
              value={formatAmount(economics.contractValue)} />
            
            <MiniMetric
              label={t('finance.actualCost')}
              value={formatAmount(economics.actualCost)} />
            
            <MiniMetric
              label={t('finance.expectedProfit')}
              value={formatAmount(economics.expectedProfit)}
              tone="text-emerald-300" />
            
            <MiniMetric
              label={t('finance.margin')}
              value={`${economics.margin.toFixed(1)}%`} />
            
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs text-slate-400">
              <span>{t('projects.contractProgress')}</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>
        </Panel>
        <Panel className="p-5">
          <SectionHeading
            title={t('projects.materialFlow')}
            detail={t('projects.materialFlowDetail')} />
          
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
            <FlowStep
              label={t('projects.inboundMaterials')}
              tone="text-[#6ed4f7]" />
            
            <ChevronRightIcon size={15} className="text-slate-600" />
            <FlowStep
              label={t('projects.productionCell')}
              tone="text-amber-300" />
            
            <ChevronRightIcon size={15} className="text-slate-600" />
            <FlowStep
              label={t('projects.deliveryGate')}
              tone="text-emerald-300" />
            
          </div>
        </Panel>
      </div>
      {selectedOrder &&
      <ProductionDetail
        order={selectedOrder}
        productNameKey={
        details.find((item) => item.order.id === selectedOrder.id)?.product.
        nameKey ?? ''
        } />

      }
    </section>);

}
function ProductionDetail({
  order,
  productNameKey



}: {order: ManufacturingOrder;productNameKey: string;}) {
  const { t } = useI18n();
  return (
    <Panel className="mt-5 overflow-hidden border-[#2cb9ee]/30">
      <div className="border-b border-white/[.07] bg-[#0f1a23] px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#72d5f8]">
          {t('projects.productionDetail')}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white">
          {t(productNameKey)} · {order.id}
        </h3>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-3">
        <MiniMetric
          label={t('projects.productionLine')}
          value={t(order.productionLineKey)} />
        
        <MiniMetric
          label={t('projects.assignedFactory')}
          value={t(order.factoryKey)} />
        
        <MiniMetric
          label={t('projects.qualityStatus')}
          value={t(`status.${order.qualityStatus}`)} />
        
        <div className="md:col-span-3">
          <p className="mb-3 text-xs font-semibold text-slate-200">
            {t('projects.productionStages')}
          </p>
          <div className="grid gap-2 sm:grid-cols-5">
            {order.stages.map((stage) =>
            <div
              key={stage.id}
              className="rounded-xl border border-white/[.065] bg-[#0b131a]/60 p-3">
              
                <p className="truncate text-[10px] text-slate-500">
                  {t(stage.nameKey)}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {Math.round(stage.progress)}%
                </p>
                <div className="mt-2">
                  <Progress value={Math.min(100, stage.progress)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Panel>);

}
function Allocation({
  icon,
  label,
  value,
  detail,
  tone






}: {icon: React.ReactNode;label: string;value: string;detail: string;tone: string;}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[.05] text-[#70d5f7]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-200">{label}</p>
        <p className="mt-1 text-[10px] text-slate-500">{detail}</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-100">{value}</p>
        <div className="mt-1 h-1 w-16 overflow-hidden rounded bg-white/[.07]">
          <div className={`h-full w-3/4 rounded ${tone}`} />
        </div>
      </div>
    </div>);

}
function TwinNode({
  label,
  tone,
  value




}: {label: string;tone: string;value: string;}) {
  return (
    <div className={`rounded-lg border p-3 ${tone}`}>
      <p className="text-[10px] text-slate-300">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
      <GaugeIcon size={14} className="mt-2 text-slate-400" />
    </div>);

}
function FlowStep({ label, tone }: {label: string;tone: string;}) {
  return (
    <div className="rounded-xl border border-white/[.065] bg-[#0b131a]/70 p-3">
      <PackageCheckIcon size={16} className={`mx-auto ${tone}`} />
      <p className="mt-2 text-[10px] font-medium text-slate-300">{label}</p>
    </div>);

}
function MiniMetric({
  label,
  value,
  tone = 'text-slate-200'




}: {label: string;value: string;tone?: string;}) {
  return (
    <div className="rounded-xl border border-white/[.065] bg-[#0b131a]/60 p-3">
      <p className="text-[10px] leading-4 text-slate-500">{label}</p>
      <p className={`mt-1 truncate text-sm font-semibold ${tone}`}>{value}</p>
    </div>);

}
function Row({ label, value }: {label: string;value: string;}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-end font-medium text-slate-300">{value}</dd>
    </div>);

}
function Progress({ value }: {value: number;}) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/[.07]">
      <div
        className="h-full rounded-full bg-[#2fb8ec]"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`
        }} />
      
    </div>);

}