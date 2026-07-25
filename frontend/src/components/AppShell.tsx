import React, { useMemo, useState } from 'react';
import {
  BellIcon,
  BotIcon,
  BoxesIcon,
  Building2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  FactoryIcon,
  GaugeIcon,
  Globe2Icon,
  MenuIcon,
  PackageSearchIcon,
  SearchIcon,
  Settings2Icon,
  SparklesIcon,
  UsersRoundIcon,
  XIcon } from
'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../i18n';
import { useSecurity } from './Security';
export type Page =
'dashboard' |
'projects' |
'people' |
'warehouse' |
'procurement' |
'factory' |
'advisor' |
'simulation' |
'reports';
const navigation: {
  id: Page;
  label: string;
  icon: React.ElementType;
}[] = [
{
  id: 'dashboard',
  label: 'nav.dashboard',
  icon: GaugeIcon
},
{
  id: 'projects',
  label: 'nav.projects',
  icon: ClipboardListIcon
},
{
  id: 'people',
  label: 'nav.people',
  icon: UsersRoundIcon
},
{
  id: 'warehouse',
  label: 'nav.warehouse',
  icon: BoxesIcon
},
{
  id: 'procurement',
  label: 'nav.procurement',
  icon: PackageSearchIcon
},
{
  id: 'factory',
  label: 'nav.factory',
  icon: FactoryIcon
},
{
  id: 'advisor',
  label: 'nav.advisor',
  icon: BotIcon
},
{
  id: 'simulation',
  label: 'nav.simulation',
  icon: SparklesIcon
},
{
  id: 'reports',
  label: 'nav.reports',
  icon: Building2Icon
}];

type AppShellProps = {
  page: Page;
  setPage: (page: Page) => void;
  children: React.ReactNode;
};
export function AppShell({ page, setPage, children }: AppShellProps) {
  const { locale, setLocale, t, dir } = useI18n();
  const { changePassword } = useSecurity();
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<
    'error' | 'mismatch' | 'success' | null>(
    null);
  const records = useMemo(
    () =>
    [
    'SIMOPRIME',
    'SIVACON S8',
    'Copper busbar',
    'Electrical Assembly',
    'EK36'].
    filter((record) => record.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  return (
    <div className="min-h-screen bg-[#091016] text-slate-100" dir={dir}>
      <div className="industrial-grid pointer-events-none fixed inset-0 opacity-40" />
      <aside
        className={`fixed inset-y-0 z-30 hidden flex-col border-e border-white/[0.075] bg-[#0b131a]/95 px-3 py-5 backdrop-blur xl:flex ${collapsed ? 'w-[76px]' : 'w-[238px]'}`}>
        
        <div className="flex h-10 items-center gap-3 px-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#159bdb] text-white shadow-[0_0_24px_rgba(21,155,219,.25)]">
            <FactoryIcon size={19} />
          </div>
          {!collapsed &&
          <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">
                {t('app.name')}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                {t('app.subtitle')}
              </p>
            </div>
          }
        </div>
        <nav
          className="mt-9 flex flex-1 flex-col gap-1"
          aria-label="Main navigation">
          
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.id === page;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                title={collapsed ? t(item.label) : undefined}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? 'bg-[#159bdb] text-white shadow-[0_8px_18px_rgba(10,137,201,.15)]' : 'text-slate-400 hover:bg-white/[0.045] hover:text-slate-100'}`}>
                
                <Icon size={18} strokeWidth={active ? 2.3 : 1.8} />
                <span className={collapsed ? 'hidden' : 'truncate'}>
                  {t(item.label)}
                </span>
              </button>);

          })}
        </nav>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center rounded-xl border border-white/[0.075] py-2 text-slate-400 transition hover:border-white/15 hover:text-white"
          aria-label={t(collapsed ? 'nav.expand' : 'nav.collapse')}>
          
          {collapsed ?
          dir === 'rtl' ?
          <ChevronLeftIcon size={17} /> :

          <ChevronRightIcon size={17} /> :

          dir === 'rtl' ?
          <ChevronRightIcon size={17} /> :

          <ChevronLeftIcon size={17} />
          }
        </button>
      </aside>

      <main
        className={`relative min-h-screen transition-[padding] duration-200 ${collapsed ? 'xl:ps-[76px]' : 'xl:ps-[238px]'}`}>
        
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b border-white/[0.075] bg-[#0b131a]/85 px-4 backdrop-blur-xl md:px-7">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white xl:hidden"
            aria-label={t('nav.expand')}>
            
            <MenuIcon size={20} />
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden max-w-[440px] flex-1 items-center gap-2 rounded-xl border border-white/[0.075] bg-white/[0.035] px-3 py-2 text-start text-xs text-slate-500 transition hover:border-white/15 sm:flex">
            
            <SearchIcon size={15} />
            <span className="flex-1">{t('top.search')}</span>
            <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px]">
              ⌘ K
            </kbd>
          </button>
          <div className="ms-auto flex items-center gap-1.5">
            <div className="hidden items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/[.06] px-2.5 py-1.5 text-[11px] font-medium text-emerald-300 lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {t('top.live')}
            </div>
            <button
              onClick={() => setLocale(locale === 'en' ? 'fa' : 'en')}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label={t('top.language')}
              title={t('top.language')}>
              
              <Globe2Icon size={18} />
              <span className="sr-only">{locale}</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                aria-label={t('top.notifications')}>
                
                <BellIcon size={18} />
                <span className="absolute end-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400 ring-2 ring-[#0b131a]" />
              </button>
              <AnimatePresence>
                {notificationsOpen &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -6
                  }}
                  className="absolute end-0 top-11 w-80 rounded-xl border border-white/10 bg-[#121c25] p-3 shadow-2xl">
                  
                    <p className="mb-2 px-2 text-xs font-semibold text-slate-200">
                      {t('top.notifications')}
                    </p>
                    {['', '2'].map((suffix) =>
                  <div
                    key={suffix}
                    className="rounded-lg p-2.5 hover:bg-white/[.04]">
                    
                        <p className="text-xs font-medium text-slate-200">
                          {t(`notification.title${suffix}`)}
                        </p>
                        <p className="mt-1 text-[11px] leading-4 text-slate-500">
                          {t(`notification.text${suffix}`)}
                        </p>
                      </div>
                  )}
                  </motion.div>
                }
              </AnimatePresence>
            </div>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg p-1.5 ps-2 text-start hover:bg-white/5">
                
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-slate-200">
                    {t('profile.name')}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {t('profile.role')}
                  </p>
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#253c4e] text-xs font-bold text-[#8bd8ff]">
                  NF
                </div>
              </button>
              <AnimatePresence>
                {profileOpen &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -6
                  }}
                  className="absolute end-0 top-11 w-48 rounded-xl border border-white/10 bg-[#121c25] p-1.5 shadow-2xl">
                  
                    <button className="w-full rounded-lg px-3 py-2 text-start text-xs text-slate-300 hover:bg-white/5">
                      {t('profile.settings')}
                    </button>
                    <button
                    onClick={() => {
                      setProfileOpen(false);
                      setPasswordMessage(null);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setPasswordDialogOpen(true);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-start text-xs text-slate-300 hover:bg-white/5">
                    
                      {t('profile.changePassword')}
                    </button>
                    <button className="w-full rounded-lg px-3 py-2 text-start text-xs text-red-300 hover:bg-red-400/10">
                      {t('profile.signout')}
                    </button>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </header>
        <div className="px-4 py-6 md:px-7 md:py-8">{children}</div>
      </main>

      <AnimatePresence>
        {passwordDialogOpen &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-password-title">
          
            <motion.form
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            onSubmit={(event) => {
              event.preventDefault();
              if (newPassword !== confirmPassword) {
                setPasswordMessage('mismatch');
                return;
              }
              if (!changePassword(currentPassword, newPassword)) {
                setPasswordMessage('error');
                return;
              }
              setPasswordMessage('success');
              setTimeout(() => setPasswordDialogOpen(false), 800);
            }}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#121c25] p-5 shadow-2xl">
            
              <h2
              id="profile-password-title"
              className="text-lg font-semibold text-white">
              
                {t('profile.passwordTitle')}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {t('profile.passwordHint')}
              </p>
              <label
              className="mt-5 block text-xs font-medium text-slate-300"
              htmlFor="current-password">
              
                {t('profile.currentPassword')}
              </label>
              <input
              id="current-password"
              autoFocus
              type="password"
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value);
                setPasswordMessage(null);
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b131a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#31b9ec]" />
            
              <label
              className="mt-3 block text-xs font-medium text-slate-300"
              htmlFor="new-password">
              
                {t('profile.newPassword')}
              </label>
              <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setPasswordMessage(null);
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b131a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#31b9ec]" />
            
              <label
              className="mt-3 block text-xs font-medium text-slate-300"
              htmlFor="confirm-password">
              
                {t('profile.confirmPassword')}
              </label>
              <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setPasswordMessage(null);
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b131a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#31b9ec]" />
            
              {passwordMessage &&
            <p
              className={`mt-3 text-xs ${passwordMessage === 'success' ? 'text-emerald-300' : 'text-red-300'}`}
              role="alert">
              
                  {t(
                passwordMessage === 'success' ?
                'profile.passwordSuccess' :
                passwordMessage === 'mismatch' ?
                'profile.passwordMismatch' :
                'profile.passwordError'
              )}
                </p>
            }
              <div className="mt-5 flex justify-end gap-2">
                <button
                type="button"
                onClick={() => setPasswordDialogOpen(false)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-white/[.05]">
                
                  {t('profile.cancel')}
                </button>
                <button
                type="submit"
                className="rounded-lg bg-[#169cda] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2ab5ec]">
                
                  {t('profile.savePassword')}
                </button>
              </div>
            </motion.form>
          </motion.div>
        }
        {searchOpen &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 z-50 grid place-items-start bg-black/60 p-4 pt-24 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t('search.title')}>
          
            <motion.div
            initial={{
              y: -12
            }}
            animate={{
              y: 0
            }}
            className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#121c25] p-3 shadow-2xl">
            
              <div className="flex items-center gap-2 border-b border-white/[.07] px-2 pb-3">
                <SearchIcon size={17} className="text-slate-400" />
                <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.hint')}
                className="flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600" />
              
                <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close"
                className="text-slate-500 hover:text-white">
                
                  <XIcon size={17} />
                </button>
              </div>
              <div className="py-2">
                {records.length ?
              records.map((record) =>
              <button
                key={record}
                onClick={() => setSearchOpen(false)}
                className="block w-full rounded-lg px-3 py-2.5 text-start text-sm text-slate-300 hover:bg-white/[.05]">
                
                      {record}
                    </button>
              ) :

              <p className="px-3 py-7 text-center text-xs text-slate-500">
                    {t('search.empty')}
                  </p>
              }
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}