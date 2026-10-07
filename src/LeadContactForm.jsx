import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function LeadContactForm({
  className,
  headingClassName,
  errorClassName,
  noteClassName,
  eventPrefix,
  pageType,
  location,
  projectType,
  requestMessage,
  title,
  description,
  buttonLabel = 'Être recontacté',
}) {
  const [values, setValues] = React.useState({ firstName: '', phone: '', email: '' });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const started = React.useRef(false);

  function track(eventName) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: `${eventPrefix}_${eventName}`, page_type: pageType, location });
  }

  function start() {
    if (!started.current) {
      started.current = true;
      track('form_start');
    }
  }

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  }

  function validate() {
    const next = {};
    if (!values.firstName.trim()) next.firstName = 'Indiquez votre prénom.';
    if (!/^[+()\d\s.-]{8,20}$/.test(values.phone.trim())) next.phone = 'Indiquez un numéro de téléphone valide.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Indiquez une adresse email valide.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event) {
    event.preventDefault();
    setStatus('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.firstName.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          projectType,
          message: requestMessage,
        }),
      });
      if (!response.ok) throw new Error('Envoi impossible');
      setValues({ firstName: '', phone: '', email: '' });
      setStatus('Merci. Nous revenons vers vous rapidement.');
      track('form_submit');
    } catch {
      setStatus('Une erreur est survenue. Réessayez dans quelques instants.');
    } finally {
      setSubmitting(false);
    }
  }

  return <form className={className} onSubmit={submit} onFocus={start} noValidate>
    <div className={headingClassName}><h2>{title}</h2><p>{description}</p></div>
    <label>Prénom<input name="firstName" autoComplete="given-name" value={values.firstName} onChange={(event) => update('firstName', event.target.value)} aria-invalid={Boolean(errors.firstName)} aria-describedby={`${location}-firstName-error`} required />{errors.firstName && <span className={errorClassName} id={`${location}-firstName-error`}>{errors.firstName}</span>}</label>
    <label>Téléphone<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onFocus={() => track('phone_focus')} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={`${location}-phone-error`} required />{errors.phone && <span className={errorClassName} id={`${location}-phone-error`}>{errors.phone}</span>}</label>
    <label>Email<input name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onFocus={() => track('email_focus')} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={`${location}-email-error`} required />{errors.email && <span className={errorClassName} id={`${location}-email-error`}>{errors.email}</span>}</label>
    <button className="button button-primary" type="submit" disabled={submitting} onClick={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: `${eventPrefix}_cta_click`, page_type: pageType, location }); }}>{submitting ? 'Envoi en cours…' : buttonLabel} {!submitting && <ArrowRight size={18} />}</button>
    <small className={noteClassName}>Échange sans engagement.</small>
    {status && <p className="form-status" role="status">{status}</p>}
  </form>;
}
