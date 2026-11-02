"use client";

import Link from "next/link";

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowRight, ArrowUpRight, UserCircle, ShieldCheck, SquaresFour, Wallet, List, X, LockSimple, Check } from '@phosphor-icons/react';
import { AccountAuthFlow } from './account-auth-flow';
import { AccountTaskWorkspace, views, type AccountView, type ReviewKind } from './account-task-workspace';
import { AccountDataControls } from './account-data-controls';
import { installReferenceReveals } from '@/lib/reference-reveals';

const subscribe = (callback: () => void) => {
  window.addEventListener('popstate', callback); window.addEventListener('hashchange', callback);
  return () => { window.removeEventListener('popstate', callback); window.removeEventListener('hashchange', callback); };
};
const snapshot = () => window.location.search + window.location.hash;
const serverSnapshot = () => '';
const destinations = [
  { name: 'Profile', body: 'Name, email and preferences.', action: 'Edit profile', view: 'profile' as AccountView, icon: UserCircle },
  { name: 'Security', body: 'Login methods and active sessions.', action: 'Review security', view: 'security' as AccountView, icon: ShieldCheck },
  { name: 'Apps', body: 'Access and purchases by product.', action: 'View apps', view: 'apps' as AccountView, icon: SquaresFour },
  { name: 'Credits', body: 'Available credits and usage.', action: 'View credits', view: 'credits' as AccountView, icon: Wallet },
];
const reviews: Record<ReviewKind | 'leave', { title: string; body: string; action?: string; result?: string }> = {
  google: { title: 'Review Google linking', body: 'A Google login method belongs to this account only after verification. This example does not connect a Google account.', action: 'Preview linking', result: 'Demo linking preview complete. No login method changed.' },
  session: { title: 'Sign out this session?', body: 'This action would end the selected browser session. In this demo, no real session is changed.', action: 'Preview session sign-out', result: 'Demo session sign-out preview complete. No real session changed.' },
  all_sessions: { title: 'Sign out all sessions?', body: 'This action would end sessions across participating apps. In this demo, no real session is changed.', action: 'Preview global sign-out', result: 'Demo global sign-out preview complete. No real sessions changed.' },
  topup: { title: 'Review top-up', body: 'No top-up options are available.' },
  billing: { title: 'Review billing', body: 'No purchases yet. No transactions yet. No support requests.' },
  leave: { title: 'Leave your profile changes?', body: 'Your unsaved demo changes will be discarded when you leave the account.', action: 'Discard changes' },
};

export function AccountApp() {
  const location = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const params = new URLSearchParams(location.split('#')[0]);
  const demo = params.get('mode') === 'demo';
  const selected = params.get('view');
  const view: AccountView = views.includes(selected as AccountView) ? selected as AccountView : 'profile';
  const activeDestination = location.endsWith('#account_overview') || view === 'profile' ? 'account' : view;
  const [menu, setMenu] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [review, setReview] = useState<ReviewKind | 'leave' | null>(null);
  const [notice, setNotice] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  function navigate(href: string) {
    window.history.pushState(null, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMenu(false);
  }
  function go(next: AccountView) { navigate(`/?mode=demo&view=${next}#account_workspace`); }
  function signIn() { if (dirty) setReview('leave'); else navigate('/#account_entry'); }
  useEffect(() => {
    if (!root.current) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const owned: Animation[] = [];
    if (!reduced.matches && !window.location.hash && window.scrollY < 100) {
      root.current.querySelectorAll<HTMLElement>('[data-entrance]').forEach((element, i) => {
        const animation = element.animate([{ transform: 'translateY(16px)' }, { transform: 'none' }], {
          duration: i === 0 ? 650 : 500, delay: i * 80, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        });
        element.dataset.entranceStarted = 'true'; owned.push(animation);
      });
    }
    const stop = () => owned.forEach(animation => animation.cancel());
    const change = () => { if (reduced.matches) stop(); };
    reduced.addEventListener('change', change);
    return () => { stop(); reduced.removeEventListener('change', change); };
  }, []);
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;
      element.scrollIntoView({ block: 'start', behavior: 'instant' });
      const target = id === 'account_workspace' ? document.getElementById('task-heading') : element;
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    // The preceding navigation effect restores the destination first. Measure
    // afterwards so content already in view never receives a hidden entrance.
    const frame = requestAnimationFrame(() => {
      if (root.current) cleanup = installReferenceReveals(root.current);
    });
    return () => { cancelAnimationFrame(frame); cleanup?.(); };
  }, [demo]);
  useEffect(() => {
    if (review && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [review]);
  useEffect(() => {
    const preventExit = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload', preventExit);
    return () => window.removeEventListener('beforeunload', preventExit);
  }, [dirty]);
  function closeReview() { dialog.current?.close(); setReview(null); }
  return <div ref={root} className="account-app">
    <Link prefetch={false} className="skip-link" href={demo ? '#account_overview' : '#sign_in_form'}>Skip to account content</Link>
    <header className="site-header" onKeyDown={event => { if (menu && event.key === "Escape") { setMenu(false); menuButton.current?.focus(); } }}>
      <div className="header-row"><Link prefetch={false} className="wordmark" href="/#account_entry" onClick={e => { e.preventDefault(); signIn(); }}>Nous<span>Account</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {demo ? ['Account', 'Apps', 'Credits', 'Security'].map(label => <Link prefetch={false} key={label} className={label.toLowerCase() === activeDestination ? 'selected' : ''} aria-current={label.toLowerCase() === activeDestination ? 'page' : undefined} href={label === 'Account' ? '/?mode=demo#account_overview' : `/?mode=demo&view=${label.toLowerCase()}#account_workspace`} onClick={e => { e.preventDefault(); if (label === 'Account') navigate('/?mode=demo#account_overview'); else go(label.toLowerCase() as AccountView); }}>{label}</Link>) : <><Link prefetch={false} href="#sign_in_form">Sign in</Link><Link prefetch={false} href="/?mode=demo#account_overview" onClick={e => { e.preventDefault(); navigate('/?mode=demo#account_overview'); }}>Explore demo account <ArrowUpRight size={16} aria-hidden="true" /></Link></>}
        </nav>
        <div className="header-end">{demo && <span className="demo-label">Demo data</span>}<button ref={menuButton} className="icon-button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="account-menu" onClick={() => setMenu(!menu)}>{menu ? <X size={26} /> : <List size={26} />}</button></div>
      </div>
      {menu && <nav id="account-menu" className="expanded-menu" aria-label="Account menu" onKeyDown={e => { if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } }}>
        {demo ? <>{views.map(item => <Link prefetch={false} key={item} href={`/?mode=demo&view=${item}#account_workspace`} onClick={e => { e.preventDefault(); go(item); }}>{item[0].toUpperCase() + item.slice(1)}<ArrowUpRight size={18} /></Link>)}<Link prefetch={false} href="/?mode=demo#data_controls" onClick={e => { e.preventDefault(); navigate('/?mode=demo#data_controls'); }}>Data controls <ArrowUpRight size={18} /></Link><button onClick={signIn}>Sign in <ArrowRight size={18} /></button></> : <><Link prefetch={false} href="#sign_in_form" onClick={() => setMenu(false)}>Sign in</Link><Link prefetch={false} href="/?mode=demo#account_overview" onClick={e => { e.preventDefault(); navigate('/?mode=demo#account_overview'); }}>Explore demo account</Link></>}
      </nav>}
    </header>
    <main>
      <section className="entry" id="account_entry" tabIndex={-1} aria-labelledby="entry-heading">
        <div className="entry-top"><h1 id="entry-heading" data-entrance>NOUS<span>ACCOUNT</span></h1><p className="entry-explanation" data-entrance>Your account works across Nous and participating TFIS apps.</p></div>
        <div className="entry-bottom"><div className="entry-actions"><Link prefetch={false} className="entry-primary" href="#sign_in_form" onClick={() => requestAnimationFrame(() => document.getElementById('sign-in-email')?.focus())}>Continue with<br />Nous Account <ArrowRight size={28} aria-hidden="true" /></Link><Link prefetch={false} className="entry-demo" href="/?mode=demo#account_overview" onClick={e => { e.preventDefault(); navigate('/?mode=demo#account_overview'); }}>Explore demo account <ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="auth-inset" data-entrance><AccountAuthFlow onDemo={() => navigate('/?mode=demo#account_overview')} /></div></div>
      </section>
      {demo && <>
        <section className="overview" id="account_overview" tabIndex={-1} aria-labelledby="overview-heading">
          <div className="section-inner"><div className="account-context"><span>Nous Account</span><span className="demo-label">Demo data</span></div><div className="overview-heading"><h2 id="overview-heading">YOUR ACCOUNT.<br />YOUR CONTROLS.</h2><div><p>Choose what to manage.</p><Link prefetch={false} className="button primary" href="/?mode=demo&view=security#account_workspace" onClick={e => { e.preventDefault(); go('security'); }}>Review security <ArrowRight size={19} aria-hidden="true" /></Link></div></div>
          <div className="destination-grid">{destinations.map(({ name, body, action, view: next, icon: Icon }, index) => <article className={`destination-card ${next === 'credits' ? 'accent-card' : ''}`} data-reveal="slide" data-stagger={index * 70} key={next}><Icon size={36} weight="light" aria-hidden="true" /><h3>{name}</h3><div className="destination-bottom"><p>{body}</p><Link prefetch={false} href={`/?mode=demo&view=${next}#account_workspace`} onClick={e => { e.preventDefault(); go(next); }}>{action}<ArrowUpRight size={19} aria-hidden="true" /></Link></div></article>)}</div></div>
        </section>
        <section className="workspace-section section-inner" id="account_workspace" tabIndex={-1} aria-labelledby="workspace-heading"><header className="workspace-heading"><h2 id="workspace-heading">MANAGE YOUR ACCOUNT</h2><span className="small-label">ACCOUNT DETAILS</span></header><AccountTaskWorkspace view={view} go={go} review={setReview} onDirty={setDirty} /></section>
        <AccountDataControls />
        <div className="account-end section-inner"><span>Nous Account</span><span><LockSimple size={16} aria-hidden="true" /> Your private account center.</span><button className="text-button" onClick={signIn}>Back to sign in <ArrowUpRight size={17} aria-hidden="true" /></button></div>
      </>}
    </main>
    <nav className="account-legal section-inner" aria-label="Legal policies">
      <Link prefetch={false} className="text-button" href="/privacy-policy">Privacy Policy</Link>
      <Link prefetch={false} className="text-button" href="/terms-of-service">Terms of Service</Link>
    </nav>
    {notice && <div className="notice" role="status"><Check size={20} aria-hidden="true" /><p>{notice}</p><button className="icon-button" aria-label="Dismiss update" onClick={() => setNotice('')}><X size={20} /></button></div>}
    {review && <dialog ref={dialog} className="review-dialog" aria-labelledby="review-title" onCancel={() => setReview(null)} onClose={() => setReview(null)}>
      <div className="dialog-top"><span className="badge">Demo account</span><button className="icon-button" aria-label="Close review" onClick={closeReview}><X size={22} /></button></div><h2 id="review-title">{reviews[review].title}</h2><p>{reviews[review].body}</p><div className="form-actions">{reviews[review].action && <button className="button primary" onClick={() => {
        if (review === 'leave') { setDirty(false); navigate('/#account_entry'); }
        else setNotice(reviews[review].result || '');
        closeReview();
      }}>{reviews[review].action}</button>}<button className="button secondary" onClick={closeReview}>{reviews[review].action ? 'Cancel' : 'Close'}</button></div>
    </dialog>}
  </div>;
}
