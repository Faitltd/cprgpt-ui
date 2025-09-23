import { useState } from 'react';
import { apiPatch } from '../lib/api';

export default function DealCard({ d }) {
  const [stage, setStage] = useState(d.Stage || '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function saveStage() {
    if (!stage || stage === d.Stage) return;
    setSaving(true); setMsg('');
    try {
      const body = { Stage: stage };
      await apiPatch(`/crm/deals/${encodeURIComponent(d.id)}/stage`, body);
      setMsg('Updated');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card card--deal">
      <div className="card__title">{d.Deal_Name || '(unnamed)'} <span className="card__id">{d.id}</span></div>
      <div className="card__row"><span>Stage:</span>
        <input className="card__input" value={stage} onChange={e => setStage(e.target.value)} placeholder="Stage" />
        <button className="card__btn" onClick={saveStage} disabled={saving}>Save</button>
      </div>
      <div className="card__row"><span>Amount:</span> {d.Amount != null ? `$${Number(d.Amount).toLocaleString()}` : '—'}</div>
      <div className="card__row"><span>Close date:</span> {d.Closing_Date || '—'}</div>
      <div className="card__row"><span>Owner:</span> {d.Owner?.name || '—'}</div>
      {msg && <div className="card__msg">{msg}</div>}
    </div>
  );
}

