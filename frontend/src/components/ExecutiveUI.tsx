import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  MoreHorizontalIcon } from
'lucide-react';
import { useI18n } from '../i18n';
type Tone = 'blue' | 'emerald' | 'amber' | 'red';
export function SectionHeading({
  title,
  detail,
  action




}: {title: string;detail?: string;action?: React.ReactNode;}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-slate-100">
          {title}
        </h2>
        {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
      </div>
      {action}
    </div>);

}
export function Panel({
  children,
  className = ''



}: {children: React.ReactNode;className?: string;}) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.075] bg-[#111820] shadow-panel ${className}`}>
      
      {children}
    </section>);

}
export function StatusPill({
  status


}: {status: 'healthy' | 'watch' | 'critical' | 'low' | 'medium' | 'high';}) {
  const { t } = useI18n();
  const normalized =
  status === 'low' ?
  'healthy' :
  status === 'medium' ?
  'watch' :
  status === 'high' ?
  'critical' :
  status;
  const styles = {
    healthy: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
    watch: 'bg-amber-400/10 text-amber-300 ring-amber-400/20',
    critical: 'bg-red-400/10 text-red-300 ring-red-400/20'
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold ring-1 ${styles[normalized]}`}>
      
      <span
        className={`h-1.5 w-1.5 rounded-full ${normalized === 'healthy' ? 'bg-emerald-400' : normalized === 'watch' ? 'bg-amber-400' : 'bg-red-400'}`} />
      
      {t(`status.${normalized}`)}
    </span>);

}
export function KpiCard({
  label,
  value,
  delta,
  tone = 'blue',
  sub






}: {label: string;value: string;delta: string;tone?: Tone;sub: string;}) {
  const positive = !delta.startsWith('-');
  const palette = {
    blue: 'bg-[#1ba6e8]/10 text-[#61caff] border-[#1ba6e8]/20',
    emerald: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    amber: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    red: 'bg-red-400/10 text-red-300 border-red-400/20'
  };
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="min-w-0 rounded-2xl border border-white/[0.075] bg-[#111820] p-4 shadow-panel">
      
      <div className="flex min-h-[2.5rem] items-start justify-between gap-2">
        <p className="text-xs font-medium leading-4 text-slate-400">{label}</p>
        <button
          aria-label={label}
          className="shrink-0 text-slate-600 transition hover:text-slate-300">
          
          <MoreHorizontalIcon size={16} />
        </button>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <strong className="min-w-0 text-xl font-semibold tracking-tight text-slate-100 2xl:text-2xl">
          {value}
        </strong>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-lg border px-1.5 py-1 text-[10px] font-semibold ${palette[tone]}`}>
          
          {positive ?
          <ArrowUpRightIcon size={12} /> :

          <ArrowDownRightIcon size={12} />
          }
          {delta}
        </span>
      </div>
      <p className="mt-2 truncate text-[11px] text-slate-500">{sub}</p>
    </motion.article>);

}
export function Sparkline({
  values,
  tone = 'blue'



}: {values: number[];tone?: Tone;}) {
  const stroke = {
    blue: '#35b7f2',
    emerald: '#4ade80',
    amber: '#fbbf24',
    red: '#fb7185'
  }[tone];
  const points = values.
  map(
    (value, index) =>
    `${index * (100 / (values.length - 1))},${48 - value * 0.42}`
  ).
  join(' ');
  return (
    <svg
      viewBox="0 0 100 52"
      className="h-16 w-full overflow-visible"
      preserveAspectRatio="none"
      aria-hidden="true">
      
      <defs>
        <linearGradient id={`fill-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={stroke} stopOpacity=".24" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M0,52 L${points} L100,52 Z`} fill={`url(#fill-${tone})`} />
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        vectorEffect="non-scaling-stroke" />
      
    </svg>);

}
export function RadialGauge({
  value,
  label,
  tone = 'blue'




}: {value: number;label: string;tone?: Tone;}) {
  const color = {
    blue: '#35b7f2',
    emerald: '#4ade80',
    amber: '#fbbf24',
    red: '#fb7185'
  }[tone];
  const circumference = 201;
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 84 84"
        className="h-24 w-24"
        aria-label={`${label}: ${value}%`}>
        
        <circle
          cx="42"
          cy="42"
          r="32"
          fill="none"
          stroke="#26313d"
          strokeWidth="7" />
        
        <motion.circle
          initial={{
            strokeDashoffset: circumference
          }}
          animate={{
            strokeDashoffset: circumference - circumference * value / 100
          }}
          transition={{
            duration: 0.9
          }}
          cx="42"
          cy="42"
          r="32"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          transform="rotate(-90 42 42)" />
        
        <text
          x="42"
          y="46"
          textAnchor="middle"
          fill="#f1f5f9"
          fontSize="17"
          fontWeight="700">
          
          {value}%
        </text>
      </svg>
      <span className="mt-1 text-center text-[11px] text-slate-400">
        {label}
      </span>
    </div>);

}