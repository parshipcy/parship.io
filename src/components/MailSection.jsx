import { useState } from 'react';
import { CONFIG } from '../data/content';

export function MailSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.email)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Message from ${name} via portfolio`,
            _captcha: 'false',
          }),
        },
      );
      if (!res.ok) throw new Error('send failed');
      setName('');
      setEmail('');
      setMessage('');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="mail" className="sec" aria-labelledby="h-mail">
      <h2 id="h-mail" className="rv">
        Mail
      </h2>
      <p className="muted rv mail-lead">
        Send a message directly - I&apos;ll get it in my inbox.
      </p>
      <form className="mail-form rv" onSubmit={onSubmit}>
        <label className="mail-field">
          <span>Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="mail-field">
          <span>Your email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="mail-field">
          <span>Message</span>
          <textarea
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className="mail-actions">
          <button className="btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          {status === 'sent' && (
            <p className="mail-status ok" role="status">
              Thanks for reaching out.
            </p>
          )}
          {status === 'error' && (
            <p className="mail-status err" role="alert">
              Something went wrong. Try again in a moment.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
