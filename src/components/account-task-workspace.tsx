"use client";

import Link from "next/link";

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, Check, EnvelopeSimple, GoogleLogo, ShieldCheck, Monitor, Plus, CreditCard, LockSimple } from '@phosphor-icons/react';

export type AccountView = 'profile' | 'security' | 'apps' | 'credits' | 'billing';
export type ReviewKind = 'google' | 'session' | 'all_sessions' | 'topup' | 'billing';
const descriptions: Record<AccountView, string> = {
  profile: 'Keep your name and preferences up to date.',
  security: 'Review how you sign in and where your account is open.',
  apps: 'Review access for each product.',
  credits: 'Check available credits, reservations and usage.',
  billing: 'Review purchases, transactions and support requests.',
};
export const views: AccountView[] = ['profile', 'security', 'apps', 'credits', 'billing'];
export function AccountTaskWorkspace({ view, go, review, onDirty }: {
  view: AccountView;
  go: (view: AccountView) => void;
  review: (kind: ReviewKind) => void;
  onDirty: (dirty: boolean) => void;
}) {
  const [profile, setProfile] = useState({ name: 'Alex Example', email: 'alex@example.com', locale: 'English', timezone: 'Asia/Kuala_Lumpur' });
  const [saved, setSaved] = useState(profile);
  const [message, setMessage] = useState('');
  useEffect(() => () => onDirty(false), [onDirty]);
  function edit(field: keyof typeof profile, value: string) {
    const next = { ...profile, [field]: value };
    setProfile(next); setMessage(''); onDirty(JSON.stringify(next) !== JSON.stringify(saved));
  }
  let content: ReactNode;
  if (view === 'profile') content = <form className="profile-form" onSubmit={e => {
    e.preventDefault(); setSaved(profile); onDirty(false); setMessage('Demo profile updated.');
  }}>
    <div className="profile-identity"><span className="avatar" aria-hidden="true">{profile.name.split(' ').filter(Boolean).slice(0, 2).map(word => word[0]).join('')}</span><div><strong>{profile.name}</strong><span className="muted">{profile.email}</span></div><span className="badge">Demo data</span></div>
    <div className="field-grid">
      <div><label htmlFor="profile-name">Name</label><input id="profile-name" required maxLength={100} value={profile.name} onChange={e => edit('name', e.target.value)} /></div>
      <div><label htmlFor="profile-email">Email address</label><input id="profile-email" type="email" value={profile.email} readOnly aria-describedby="email-verification-note" /><small id="email-verification-note">Email changes require separate verification.</small></div>
      <div><label htmlFor="profile-locale">Locale</label><select id="profile-locale" value={profile.locale} onChange={e => edit('locale', e.target.value)}><option>English</option><option>Bahasa Melayu</option></select></div>
      <div><label htmlFor="profile-timezone">Timezone</label><select id="profile-timezone" value={profile.timezone} onChange={e => edit('timezone', e.target.value)}><option>Asia/Kuala_Lumpur</option><option>UTC</option><option>Asia/Singapore</option></select></div>
    </div>
    <div className="form-actions"><button className="button primary" type="submit">Save profile <Check size={18} aria-hidden="true" /></button><button className="text-button" type="button" onClick={() => { setProfile(saved); onDirty(false); setMessage('Changes discarded.'); }}>Discard changes</button></div>
    <p className="status-message" role="status">{message}</p>
  </form>;
  else if (view === 'security') content = <div className="task-content">
    <h4>Connected login methods</h4>
    <div className="setting-row"><EnvelopeSimple size={24} aria-hidden="true" /><div><strong>Email sign-in</strong><span>alex@example.com</span></div><span className="badge">Demo method</span></div>
    <p className="help"><LockSimple aria-hidden="true" /> Keep at least one sign-in method.</p>
    <button className="button" onClick={() => review('google')}><GoogleLogo size={20} aria-hidden="true" /> Connect Google <Plus size={18} aria-hidden="true" /></button>
    <h4 className="task-subheading">Active sessions</h4>
    <div className="setting-row"><Monitor size={24} aria-hidden="true" /><div><strong>This browser</strong><span>Illustrative session</span></div><button className="text-button" onClick={() => review('session')}>Sign out this session</button></div>
    <p className="help">App sessions: No app sessions yet.</p>
    <button className="button" onClick={() => review('all_sessions')}>Sign out all sessions <ArrowUpRight size={18} aria-hidden="true" /></button>
  </div>;
  else if (view === 'apps') content = <div className="task-content">
    {['Nous', 'TFIS'].map(brand => <div className="brand-access" key={brand}><h4>{brand}</h4><p className="empty-line">No product access yet.</p></div>)}
    <details className="light-disclosure"><summary>Purchases <Plus size={18} aria-hidden="true" /></summary><p>No purchases yet.</p></details>
    <p className="help">Access belongs to each product. An account does not grant access to every app.</p>
  </div>;
  else if (view === 'credits') content = <div className="task-content">
    <div className="balance-grid">{['Available', 'Reserved'].map(name => <div key={name}><span className="small-label">{name}</span><h4>No credits yet</h4></div>)}</div>
    <dl className="credit-types">{['Purchased', 'Promotional', 'Plan'].map(name => <div key={name}><dt>{name}</dt><dd>No credits yet</dd></div>)}</dl>
    <button className="button primary" onClick={() => review('topup')}>Review top-up <Plus size={18} aria-hidden="true" /></button>
    <h4 className="task-subheading">Usage receipts</h4>
    <div className="receipt-table" role="table" aria-label="Usage receipts"><div role="row" className="receipt-head">{['Product', 'Job', 'Quantity', 'Rate version', 'Cost'].map(label => <span role="columnheader" key={label}>{label}</span>)}</div><p>No usage yet.</p></div>
    <p className="help">No active reservations.</p>
  </div>;
  else content = <div className="task-content">
    <CreditCard size={32} aria-hidden="true" />
    <dl className="billing-list">{[['Purchases', 'No purchases yet.'], ['Transactions', 'No transactions yet.'], ['Support requests', 'No support requests.']].map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
    <button className="button primary" onClick={() => review('billing')}>Review billing <ArrowUpRight size={18} aria-hidden="true" /></button>
  </div>;
  return <div className="workspace-frame" data-reveal="rise">
    <div className="workspace-interior">
      <aside className="workspace-summary"><span className="small-label">Nous Account</span><h3 id="task-heading" tabIndex={-1}>{view[0].toUpperCase() + view.slice(1)}</h3><p>{descriptions[view]}</p><span className="visibility"><ShieldCheck size={18} aria-hidden="true" /> Profile visibility: Private</span></aside>
      <div className="workspace-fields">{content}</div>
    </div>
    <nav className="workspace-tabs" aria-label="Account tasks">{views.map(item => <Link prefetch={false} key={item} aria-current={view === item ? 'page' : undefined} href={`/?mode=demo&view=${item}#account_workspace`} onClick={e => { e.preventDefault(); go(item); }}>{item[0].toUpperCase() + item.slice(1)}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}</nav>
  </div>;
}
