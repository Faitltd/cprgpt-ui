export default function ContactCard({ c }) {
  const fullName = c.Full_Name || [c.First_Name, c.Last_Name].filter(Boolean).join(' ') || '(no name)';
  const phone = c.Phone || c.Mobile || c.Home_Phone || '—';
  const email = c.Email || c.Secondary_Email || '—';
  return (
    <div className="card card--contact">
      <div className="card__title">{fullName}</div>
      <div className="card__row"><span>Phone:</span> <strong>{phone}</strong></div>
      <div className="card__row"><span>Email:</span> <strong>{email}</strong></div>
      {c.Owner?.name && (
        <div className="card__row"><span>Owner:</span> {c.Owner.name}</div>
      )}
    </div>
  );
}

