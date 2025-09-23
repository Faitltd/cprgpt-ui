import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import ContactCard from './ContactCard';
import DealCard from './DealCard';

export default function Sidebar() {
  const [q, setQ] = useState('');
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function search() {
    const name = q.trim();
    if (!name) return;
    setLoading(true); setError('');
    try {
      const [c, d] = await Promise.all([
        apiGet(`/crm/contacts/search?name=${encodeURIComponent(name)}`),
        apiGet(`/crm/deals/search?name=${encodeURIComponent(name)}`),
      ]);
      setContacts(Array.isArray(c?.data) ? c.data : []);
      setDeals(Array.isArray(d?.data) ? d.data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') search();
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__header">Contacts / Deals</div>
      <div className="sidebar__search">
        <input
          className="sidebar__input"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search name (e.g., Nick Laris)"
        />
        <button className="sidebar__btn" onClick={search} disabled={loading}>Search</button>
      </div>
      {error && <div className="sidebar__error">{error}</div>}
      <div className="sidebar__section">
        <div className="sidebar__sectionTitle">Contacts</div>
        {contacts.length === 0 && <div className="sidebar__empty">No contacts</div>}
        {contacts.slice(0, 10).map(c => (
          <ContactCard key={c.id} c={c} />
        ))}
      </div>
      <div className="sidebar__section">
        <div className="sidebar__sectionTitle">Deals</div>
        {deals.length === 0 && <div className="sidebar__empty">No deals</div>}
        {deals.slice(0, 10).map(d => (
          <DealCard key={d.id} d={d} />
        ))}
      </div>
    </aside>
  );
}

