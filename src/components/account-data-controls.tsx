"use client";

import { useRef, useState } from 'react';
import { Plus, ArrowRight } from '@phosphor-icons/react';
const choices = [
  { id: 'export', title: 'Export account data', body: 'Review the profile and account records included in your export.', action: 'Review export' },
  { id: 'product_data', title: 'Product data', body: "Review each product’s data controls separately.", action: 'Review product data' },
  { id: 'deletion', title: 'Delete account', body: 'Review affected access and data before requesting deletion.', action: 'Review account deletion' },
];
export function AccountDataControls() {
  const [review, setReview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  function close() { setReview(null); setMessage(''); requestAnimationFrame(() => returnFocus.current?.focus()); }
  return <section className="data-section" id="data_controls" aria-labelledby="data-heading" tabIndex={-1}>
    <div className="section-inner">
      <header className="data-heading"><span className="small-label">/ DATA CONTROLS /</span><h2 id="data-heading">YOUR DATA.<br />CLEAR CHOICES.</h2><p>Choose the scope before you continue.</p></header>
      <div className="data-disclosures">{choices.map((choice, index) => <details key={choice.id} name="account-data" data-reveal="rise" open={index === 0 ? true : undefined}>
        <summary>{choice.title}<Plus size={22} aria-hidden="true" /></summary>
        <div className="disclosure-answer"><p>{choice.body}</p><button className="text-button" onClick={e => {
          returnFocus.current = e.currentTarget; setReview(choice.id); setMessage('');
          requestAnimationFrame(() => document.getElementById(`${choice.id}_review`)?.focus());
        }}>{choice.action}<ArrowRight size={18} aria-hidden="true" /></button>
        {review === choice.id && <div className="data-review" id={`${choice.id}_review`} tabIndex={-1}>
          <h3>{choice.action}</h3>
          {choice.id === 'export' ? <><p>Select the account records to include.</p><label className="check-label"><input type="checkbox" defaultChecked /> Profile</label><label className="check-label"><input type="checkbox" defaultChecked /> Account activity</label></> : choice.id === 'product_data' ? <p>No product access yet. Product data is managed separately from your account.</p> : <p>Deleting an account can remove access to participating products. Product data and retention rules must be reviewed separately.</p>}
          <div className="form-actions">{choice.id !== 'product_data' && <button className="button primary" onClick={() => setMessage(choice.id === 'export' ? 'Demo export preview prepared. No private records were downloaded.' : 'Demo deletion preview prepared. No account was changed.')}>{choice.id === 'export' ? 'Preview export' : 'Preview deletion request'}</button>}<button className="button secondary" onClick={close}>Cancel</button></div>
          <p role="status">{message}</p>
        </div>}
        </div>
      </details>)}</div>
    </div>
  </section>;
}
