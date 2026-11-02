"use client";

import { useRef, useState } from "react";
import { ArrowRight, EnvelopeSimple, GoogleLogo, ArrowLeft, Clock } from "@phosphor-icons/react";

type AuthState = 'choose' | 'email' | 'expired' | 'google';
export function AccountAuthFlow({ onDemo }: { onDemo: () => void }) {
  const [state, setState] = useState<AuthState>('choose');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const title = useRef<HTMLHeadingElement>(null);
  function change(next: AuthState) {
    setError(''); setState(next);
    requestAnimationFrame(() => title.current?.focus());
  }
  return <div className="auth-panel" id="sign_in_form" tabIndex={-1}>
    <div className="auth-heading"><span className="small-label">Nous Account</span><span className="private-mark">Private account</span></div>
    <h2 ref={title} tabIndex={-1}>{state === 'choose' ? 'Sign in' : state === 'google' ? 'Google sign-in example' : state === 'expired' ? 'This link has expired' : 'Demo email link'}</h2>
    {state === 'choose' ? <>
      <button className="button google-button" onClick={() => change('google')}><GoogleLogo size={20} aria-hidden="true" /> Preview Google sign-in <ArrowRight size={18} aria-hidden="true" /></button>
      <div className="method-separator"><span>or use your email</span></div>
      <form noValidate onSubmit={event => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Enter a valid email address.'); return; }
        change('email');
      }}>
        <label htmlFor="sign-in-email">Email</label>
        <input id="sign-in-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} aria-invalid={!!error} aria-describedby={error ? 'email-error' : undefined} />
        {error && <p id="email-error" className="field-error" role="alert">{error}</p>}
        <button className="button primary full" type="submit"><EnvelopeSimple size={19} aria-hidden="true" /> Preview email sign-in <ArrowRight size={18} aria-hidden="true" /></button>
      </form>
    </> : <div className="auth-state">
      {state === 'expired' ? <Clock size={32} aria-hidden="true" /> : <span className="badge">Demo</span>}
      <p>{state === 'google' ? 'Preview the account experience without connecting a Google account.' : state === 'expired' ? 'Request another link to continue.' : `Preview email sign-in for ${email}. No email is sent.`}</p>
      {state !== 'expired' && <button className="button primary full" onClick={onDemo}>Open demo account <ArrowRight size={18} aria-hidden="true" /></button>}
      {state === 'email' && <button className="text-button" onClick={() => change('expired')}>View expired-link example</button>}
      <button className="text-button" onClick={() => change('choose')}><ArrowLeft size={16} aria-hidden="true" />{state === 'expired' ? 'Request another link' : state === 'google' ? 'Cancel' : 'Change email'}</button>
    </div>}
  </div>;
}
