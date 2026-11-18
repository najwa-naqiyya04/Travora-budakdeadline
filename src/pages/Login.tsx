import React, { useEffect, useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { DEMO_PASSWORD, DEMO_PROFILE, useApp } from '../lib/store';
import { navigate, readRoute } from '../lib/router';
import { Logo } from '../components/Logo';
import './login.css';

export default function Login() {
  const { login, register, consumeNext, user } = useApp();
  const [registerMode, setRegisterMode] = useState(readRoute().query.get('mode') === 'register');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (user) navigate(consumeNext() || '/home');
  }, [user, consumeNext]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const switchMode = (reg: boolean) => {
    setError('');
    setRegisterMode(reg);
  };

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(form.email, form.password);
    if (err) setError(err);
  };
  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const err = register(form.name, form.email, form.password);
    if (err) setError(err);
  };

  const fillDemo = () => {
    setError('');
    setForm((f) => ({ ...f, email: DEMO_PROFILE.email, password: DEMO_PASSWORD }));
  };

  const pwField = (
    <div className="pw-field">
      <input
        type={showPw ? 'text' : 'password'}
        placeholder="Kata Sandi"
        value={form.password}
        onChange={set('password')}
        autoComplete={registerMode ? 'new-password' : 'current-password'}
        aria-label="Kata sandi"
      />
      <button
        type="button"
        className="pw-toggle"
        onClick={() => setShowPw((v) => !v)}
        aria-label={showPw ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
      >
        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );

  return (
    <section className="login-page">
      <button type="button" className="login-back" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className={`login-container ${registerMode ? 'active' : ''}`}>
        {/* Form daftar */}
        <div className="form-container sign-up" aria-hidden={!registerMode}>
          <form onSubmit={onRegister} noValidate>
            <Logo className="w-10 h-10" />
            <h2>Buat Akun</h2>
            <span>daftar menggunakan email</span>
            <input type="text" placeholder="Nama" value={form.name} onChange={set('name')} autoComplete="name" aria-label="Nama" tabIndex={registerMode ? 0 : -1} />
            <input type="email" placeholder="Email" value={form.email} onChange={set('email')} autoComplete="email" aria-label="Email" tabIndex={registerMode ? 0 : -1} />
            {registerMode && pwField}
            {registerMode && error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="primary" tabIndex={registerMode ? 0 : -1}>Daftar</button>
            <button type="button" className="switch-link" onClick={() => switchMode(false)}>Sudah punya akun? Masuk</button>
          </form>
        </div>

        {/* Form masuk */}
        <div className="form-container sign-in" aria-hidden={registerMode}>
          <form onSubmit={onLogin} noValidate>
            <Logo className="w-10 h-10" />
            <h2>Masuk</h2>
            <span>masuk menggunakan email</span>
            <input type="email" placeholder="Email" value={form.email} onChange={set('email')} autoComplete="email" aria-label="Email" tabIndex={registerMode ? -1 : 0} />
            {!registerMode && pwField}
            {!registerMode && error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="primary" tabIndex={registerMode ? -1 : 0}>Masuk</button>
            <button type="button" className="demo-box" onClick={fillDemo} tabIndex={registerMode ? -1 : 0}>
              <strong>Akun demo</strong>
              <span>{DEMO_PROFILE.email}</span>
              <span>Sandi: {DEMO_PASSWORD}</span>
              <em>Klik untuk isi otomatis</em>
            </button>
            <button type="button" className="switch-link" onClick={() => switchMode(true)}>Belum punya akun? Daftar</button>
          </form>
        </div>

        {/* Panel geser (desktop/tablet) */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Selamat Datang Kembali!</h1>
              <p>Masukkan data diri kamu untuk menikmati semua fitur kami.</p>
              <button type="button" className="ghost" onClick={() => switchMode(false)}>Masuk</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Halo, Teman!</h1>
              <p>Daftarkan diri kamu untuk menikmati semua fitur yang tersedia.</p>
              <button type="button" className="ghost" onClick={() => switchMode(true)}>Daftar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
