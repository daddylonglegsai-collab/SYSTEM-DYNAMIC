import React, { useMemo, useState, createContext, useContext } from 'react';
import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../i18n';
type SecurityContextValue = {
  amountsVisible: boolean;
  verifyPassword: (password: string) => boolean;
  showAmounts: (password: string) => boolean;
  hideAmounts: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
};
const SecurityContext = createContext<SecurityContextValue | null>(null);
export function SecurityProvider({ children }: {children: React.ReactNode;}) {
  const [password, setPassword] = useState('1234');
  const [amountsVisible, setAmountsVisible] = useState(false);
  const value = useMemo<SecurityContextValue>(
    () => ({
      amountsVisible,
      verifyPassword: (candidate) => candidate === password,
      showAmounts: (candidate) => {
        if (candidate !== password) return false;
        setAmountsVisible(true);
        return true;
      },
      hideAmounts: () => setAmountsVisible(false),
      changePassword: (currentPassword, newPassword) => {
        if (currentPassword !== password || newPassword.length < 4) return false;
        setPassword(newPassword);
        return true;
      }
    }),
    [amountsVisible, password]
  );
  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>);

}
export function AmountVisibilityControl({
  className = ''


}: {className?: string;}) {
  const { t } = useI18n();
  const { amountsVisible, hideAmounts, showAmounts } = useSecurity();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const openAccessDialog = () => {
    setPassword('');
    setPasswordError(false);
    setDialogOpen(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={amountsVisible ? hideAmounts : openAccessDialog}
        aria-pressed={amountsVisible}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${amountsVisible ? 'border-[#35b7f2]/35 bg-[#159bdb]/10 text-[#84dcfb] hover:bg-[#159bdb]/20' : 'border-white/10 bg-white/[.035] text-slate-300 hover:bg-white/[.07]'} ${className}`}>
        
        {amountsVisible ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
        {t(amountsVisible ? 'finance.hideAmounts' : 'finance.showAmounts')}
      </button>

      <AnimatePresence>
        {dialogOpen &&
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
          aria-labelledby="finance-password-title">
          
            <motion.form
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            onSubmit={(event) => {
              event.preventDefault();
              if (!showAmounts(password)) {
                setPasswordError(true);
                return;
              }
              setDialogOpen(false);
            }}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#121c25] p-5 shadow-2xl">
            
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#1ba6e8]/15 text-[#73d4f7]">
                  <LockKeyholeIcon size={17} />
                </div>
                <div>
                  <h3
                  id="finance-password-title"
                  className="text-lg font-semibold text-white">
                  
                    {t('finance.passwordTitle')}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {t('finance.showPasswordDescription')}
                  </p>
                </div>
              </div>
              <label
              className="mt-5 block text-xs font-medium text-slate-300"
              htmlFor="finance-password">
              
                {t('finance.passwordLabel')}
              </label>
              <input
              id="finance-password"
              autoFocus
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError(false);
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b131a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#31b9ec]" />
            
              {passwordError &&
            <p className="mt-2 text-xs text-red-300" role="alert">
                  {t('finance.passwordError')}
                </p>
            }
              <div className="mt-5 flex justify-end gap-2">
                <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-white/[.05]">
                
                  {t('finance.cancel')}
                </button>
                <button
                type="submit"
                className="rounded-lg bg-[#169cda] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2ab5ec]">
                
                  {t('finance.confirmShow')}
                </button>
              </div>
            </motion.form>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context)
  throw new Error('useSecurity must be used inside SecurityProvider');
  return context;
}