import React, { useState } from 'react';
import { FileBarChartIcon, PlayIcon, SparklesIcon } from 'lucide-react';
import { AppShell, type Page } from './components/AppShell';
import { Dashboard } from './pages/Dashboard';
import { OperationsPage } from './pages/Operations';
import { Advisor } from './pages/Advisor';
import { Panel, SectionHeading } from './components/ExecutiveUI';
import { I18nProvider, useI18n } from './i18n';
import { SecurityProvider, useSecurity } from './components/Security';
import { useScreenInit } from './useScreenInit.js';
import { apiService, type SimulationResponse } from './services/api';

function Simulation() {
  const { t } = useI18n();
  const { amountsVisible } = useSecurity();
  const [scenario, setScenario] = useState('simulation.addProject');
  const [intensity, setIntensity] = useState(42);
  const [run, setRun] = useState(false);
  const [loading, setLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scenarios = [
    'simulation.addProject',
    'simulation.demand',
    'simulation.failure',
    'simulation.absence',
    'simulation.delay'
  ];

  const outputs = [
    [
      'simulation.capacity',
      `${84 - Math.round(intensity / 9)}%`,
      'text-[#67cef5]'
    ],
    [
      'simulation.delivery',
      `+${Math.max(1, Math.round(intensity / 12))}d`,
      'text-amber-300'
    ],
    ['simulation.inventory', `-${Math.round(intensity / 7)}%`, 'text-red-300'],
    ['simulation.cost', `+${Math.round(intensity * 1.8)}M`, 'text-amber-300'],
    ['simulation.profit', `-${Math.round(intensity / 10)}%`, 'text-red-300'],
    [
      'simulation.utilization',
      `${76 + Math.round(intensity / 7)}%`,
      'text-emerald-300'
    ],
    [
      'simulation.risk',
      `${Math.round(intensity * 1.25)}/100`,
      'text-amber-300'
    ]
  ];

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    setSimulationResult(null);

    try {
      const result = await apiService.runSimulation({
        scenario,
        intensity
      });
      setSimulationResult(result);
      setRun(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1420px]">
      <div className="mb-7">
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-[#23b3ec]/20 bg-[#169cda]/10 text-[#5bc7f2]">
          <SparklesIcon size={20} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('simulation.title')}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {t('simulation.description')}
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-[.76fr_1.24fr]">
        <Panel className="p-5">
          <SectionHeading
            title={t('simulation.scenario')}
            detail={t('simulation.ready')}
          />

          <div className="space-y-2">
            {scenarios.map((key) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                disabled={loading}
                className={`w-full rounded-xl border p-3 text-start text-xs transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  scenario === key
                    ? 'border-[#28afe9]/40 bg-[#1ba6e8]/[.1] text-[#8adcf9]'
                    : 'border-white/[.065] bg-white/[.02] text-slate-300 hover:border-[#33b8ec]/30 hover:bg-[#1ba6e8]/[.06]'
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
          <div className="mt-7 border-t border-white/[.07] pt-5">
            <div className="mb-3 flex justify-between text-xs text-slate-400">
              <span>{t('simulation.intensity')}</span>
              <span className="font-semibold text-slate-100">{intensity}%</span>
            </div>
            <input
              aria-label={t('simulation.intensity')}
              type="range"
              min="10"
              max="90"
              value={intensity}
              onChange={(event) => setIntensity(Number(event.target.value))}
              disabled={loading}
              className="w-full accent-[#25ace7] disabled:opacity-50"
            />

            <button
              onClick={handleRun}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#169cda] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#28afe8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {t('common.loading') || 'Running...'}
                </>
              ) : (
                <>
                  <PlayIcon size={15} />
                  {t('common.run')}
                </>
              )}
            </button>

            {error && (
              <div className="mt-3 rounded-lg bg-red-500/10 p-2 text-xs text-red-400">
                {error}
              </div>
            )}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel className="overflow-hidden p-5">
            <SectionHeading
              title={t('common.impact')}
              detail={
                simulationResult
                  ? t('simulation.ready')
                  : run
                    ? t(scenario)
                    : t('advisor.source')
              }
            />

            {simulationResult?.success && (
              <div className="mt-4 rounded-lg bg-emerald-500/10 p-4 text-xs text-emerald-400">
                <p className="whitespace-pre-wrap font-mono">
                  {simulationResult.simulation}
                </p>
              </div>
            )}

            <div className="relative mt-6 h-48 overflow-hidden rounded-xl border border-white/[.065] bg-[#0b131a] p-5">
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/[.08]" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/[.06]" />
              <svg
                viewBox="0 0 600 190"
                className="relative h-full w-full"
                preserveAspectRatio="none"
                aria-label="Simulation trend chart"
              >
                <polyline
                  points={`0,145 70,122 140,131 210,${118 - intensity / 6} 280,${132 - intensity / 7} 350,${105 - intensity / 8} 420,${120 - intensity / 6} 490,${85 - intensity / 9} 600,${94 - intensity / 8}`}
                  fill="none"
                  stroke="#3ac0f3"
                  strokeWidth="4"
                  vectorEffect="non-scaling-stroke"
                />

                <polyline
                  points="0,155 70,151 140,148 210,146 280,142 350,144 420,140 490,139 600,135"
                  fill="none"
                  stroke="#f5b942"
                  strokeWidth="2"
                  strokeDasharray="6 7"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </Panel>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {outputs.map(([label, value, color]) => {
              const hiddenAmount =
                label === 'simulation.cost' && !amountsVisible;
              return (
                <Panel key={label} className="p-4">
                  <p className="text-[11px] text-slate-500">{t(label)}</p>
                  <p className={`mt-3 text-xl font-semibold ${color}`}>
                    {hiddenAmount ? '••••••' : value}
                  </p>
                </Panel>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Reports() {
  const { t } = useI18n();
  const [prepared, setPrepared] = useState<string | null>(null);
  const reports = [
    'reports.executive',
    'reports.production',
    'reports.inventory',
    'reports.worker',
    'reports.supplier',
    'reports.summary'
  ];

  return (
    <div className="mx-auto max-w-[1420px]">
      <div className="mb-7">
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-[#23b3ec]/20 bg-[#169cda]/10 text-[#5bc7f2]">
          <FileBarChartIcon size={20} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('reports.title')}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {t('reports.description')}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report, index) => (
          <Panel key={report} className="relative overflow-hidden p-5">
            <div
              className="absolute inset-x-0 top-0 h-1 bg-[#159bdb]"
              style={{
                opacity: 0.35 + index * 0.08
              }}
            />

            <FileBarChartIcon size={20} className="text-[#5bc7f2]" />
            <h2 className="mt-7 text-lg font-semibold">{t(report)}</h2>
            <p className="mt-2 text-xs text-slate-500">
              {prepared === report
                ? t('reports.generated')
                : t('common.updated')}
            </p>
            <button
              onClick={() => setPrepared(report)}
              className="mt-6 rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-[#38baf0]/30 hover:bg-[#1ba6e8]/[.09]"
            >
              {prepared === report ? t('reports.toast') : t('common.generate')}
            </button>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function Application() {
  const initialScreen = useScreenInit() as {
    page?: Page;
  };
  const [page, setPage] = useState<Page>(initialScreen.page ?? 'dashboard');
  const content: Record<Page, React.ReactNode> = {
    dashboard: <Dashboard />,
    projects: <OperationsPage type="projects" />,
    people: <OperationsPage type="people" />,
    warehouse: <OperationsPage type="warehouse" />,
    procurement: <OperationsPage type="procurement" />,
    factory: <OperationsPage type="factory" />,
    advisor: <Advisor />,
    simulation: <Simulation />,
    reports: <Reports />
  };
  return (
    <AppShell page={page} setPage={setPage}>
      {content[page]}
    </AppShell>
  );
}

export function App() {
  return (
    <I18nProvider>
      <SecurityProvider>
        <Application />
      </SecurityProvider>
    </I18nProvider>
  );
}
