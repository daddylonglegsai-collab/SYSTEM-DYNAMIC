import React, { useState } from 'react';
import { BotIcon, SendIcon, SparklesIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Panel, SectionHeading, StatusPill } from '../components/ExecutiveUI';
import { useI18n } from '../i18n';
import { apiService, type AdvisorResponse } from '../services/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

export function Advisor() {
  const { t } = useI18n();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AdvisorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [asked, setAsked] = useState(false);

  const suggestions = ['advisor.q1', 'advisor.q2', 'advisor.q3', 'advisor.q4'];

  const submit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setAsked(true);

    try {
      const result = await apiService.askAdvisor(prompt);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setPrompt(t(suggestion));
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-[#1ba6e8]/30 bg-[#169cda]/10 text-[#6ad1f6]">
          <BotIcon size={24} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('advisor.title')}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          {t('advisor.description')}
        </p>
      </div>

      <Panel className="overflow-hidden p-2">
        <div className="flex items-center gap-2 rounded-xl bg-[#0b131a] p-3">
          <SparklesIcon className="shrink-0 text-[#57c6f2]" size={20} />
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && submit()}
            placeholder={t('advisor.prompt')}
            disabled={loading}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600 disabled:opacity-50"
          />
          <button
            onClick={submit}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg bg-[#169cda] px-3 py-2 text-xs font-semibold text-white hover:bg-[#28afe8] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <SendIcon size={14} />
            {loading ? t('common.loading') || 'Loading...' : t('advisor.ask')}
          </button>
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
        <Panel className="p-5">
          <SectionHeading title={t('advisor.suggestions')} />
          <div className="space-y-2">
            {suggestions.map((key) => (
              <button
                key={key}
                onClick={() => handleSuggestion(key)}
                disabled={loading}
                className="mb-2 w-full rounded-xl border border-white/[.065] bg-white/[.02] p-3 text-start text-xs leading-5 text-slate-300 transition hover:border-[#33b8ec]/30 hover:bg-[#1ba6e8]/[.06] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t(key)}
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="min-h-[380px] p-5">
          <SectionHeading
            title={t('advisor.answer')}
            detail={asked ? prompt : t('advisor.source')}
          />

          <div className="rounded-xl border border-[#1ba6e8]/15 bg-[#1ba6e8]/[.045] p-5">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#169cda] border-t-transparent" />
                <p className="text-sm text-slate-400">{t('common.loading') || 'Loading...'}</p>
              </div>
            ) : error ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle size={17} className="text-red-400" />
                  <p className="text-sm font-semibold text-red-400">Error</p>
                </div>
                <p className="text-sm text-red-300">{error}</p>
              </div>
           ) : response?.success ? (
  <div className="space-y-4">

    <div className="flex items-center gap-2">
      <CheckCircle2 size={17} className="text-emerald-400" />

      <p className="text-sm font-semibold text-white">
        {t('advisor.responseTitle')}
      </p>
    </div>

    <div className="text-sm leading-7 text-slate-300">
      <MarkdownRenderer 
        content={response.analysis}
      />
    </div>

  </div>
) : (
  <div className="text-sm text-slate-400">
    {t('advisor.source')}
  </div>
)}
          </div>
        </Panel>
      </div>
    </div>
  );
}
