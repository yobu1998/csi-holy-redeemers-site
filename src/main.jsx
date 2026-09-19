import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CHURCH_PHONE = '7010144926';
const PASTOR_WHATSAPP = '7010144926'; // Replace with pastor's WhatsApp number when provided.
const MAPS = 'https://maps.app.goo.gl/Yq3tobrmqfw6vrWg7';
const ADMIN_KEY = 'csi_holy_redeemer_admin_events_v2';

const weeklyServices = [
  { day: 'Sunday', taDay: 'ஞாயிற்றுக்கிழமை', title: 'Sunday Worship Service', taTitle: 'ஞாயிறு ஆராதனை', time: '9:00 AM – 11:30 AM', note: 'First Sunday: Holy Communion Service', taNote: 'முதல் ஞாயிறு: பரிசுத்த திருவிருந்து ஆராதனை' },
  { day: 'Monday', taDay: 'திங்கட்கிழமை', title: 'Youth Boys Prayer Fellowship', taTitle: 'வாலிபர் சகோதரர்கள் ஜெப ஐக்கியம்', time: '7:00 PM – 9:00 PM', note: 'Weekly prayer and fellowship', taNote: 'வாராந்திர ஜெபமும் ஐக்கியமும்' },
  { day: 'Tuesday', taDay: 'செவ்வாய்க்கிழமை', title: 'Youth Girls Prayer Fellowship', taTitle: 'வாலிப சகோதரிகள் ஜெப ஐக்கியம்', time: '7:00 PM – 9:00 PM', note: 'Weekly prayer and fellowship', taNote: 'வாராந்திர ஜெபமும் ஐக்கியமும்' },
  { day: 'Wednesday', taDay: 'புதன்கிழமை', title: "Women's Fellowship Prayer", taTitle: 'பெண்கள் ஐக்கிய ஜெபம்', time: '7:00 PM – 9:00 PM', note: 'Women’s fellowship and prayer', taNote: 'பெண்கள் ஐக்கியமும் ஜெபமும்' },
  { day: 'Thursday', taDay: 'வியாழக்கிழமை', title: 'Common Prayer Service', taTitle: 'பொது ஜெப ஆராதனை', time: '7:00 PM – 9:00 PM', note: 'Church-wide prayer service', taNote: 'சபை முழுவதற்குமான பொது ஜெப ஆராதனை' },
  { day: 'Friday', taDay: 'வெள்ளிக்கிழமை', title: 'Litany Prayer', taTitle: 'லித்தனியா ஜெபம்', time: '7:00 PM – 9:00 PM', note: 'Weekly litany prayer', taNote: 'வாராந்திர லித்தனியா ஜெபம்' },
  { day: '1st Saturday', taDay: 'முதல் சனிக்கிழமை', title: 'Monthly Fasting Prayer', taTitle: 'மாதாந்திர உபவாச ஜெபம்', time: '10:00 AM – 2:00 PM', note: 'Every first Saturday of the month', taNote: 'ஒவ்வொரு மாதமும் முதல் சனிக்கிழமை' },
];

const gallery = [
  ['/images/church-02.png', 'Church tower', 'தேவாலயக் கோபுரம்'],
  ['/images/church-04.png', 'Church exterior', 'தேவாலயத்தின் வெளிப்புறம்'],
  ['/images/church-03.png', 'Church tower view', 'தேவாலயக் கோபுரத் தோற்றம்'],
  ['/images/church-01.png', 'Church tower', 'தேவாலயக் கோபுரம்'],
  ['/images/church-05.png', 'Sanctuary', 'தேவாலயத்தின் உள்ளரங்கம்'],
  ['/images/event-wide.png', 'Church fellowship', 'சபை ஐக்கியம்'],
  ['/images/event-01.png', 'Church gathering', 'சபை ஒன்று கூடல்'],
  ['/images/event-02.png', 'Church celebration', 'சபை கொண்டாட்டம்'],
];

const defaultEvents = [
  { id: 'monthly-fasting', date: 'Every 1st Saturday', taDate: 'ஒவ்வொரு முதல் சனிக்கிழமையும்', title: 'Monthly Fasting Prayer', taTitle: 'மாதாந்திர உபவாச ஜெபம்', time: '10:00 AM – 2:00 PM', taTime: 'காலை 10:00 – பிற்பகல் 2:00', description: 'A monthly time of fasting, prayer and seeking God together.', taDescription: 'ஒவ்வொரு மாதமும் ஒன்றாக உபவாசித்து, ஜெபித்து, தேவனைத் தேடும் நேரம்.' },
  { id: 'special', date: 'Special', taDate: 'சிறப்பு', title: 'Functions & Special Prayers', taTitle: 'சபை நிகழ்வுகள் மற்றும் சிறப்பு ஜெபங்கள்', time: 'Admin will update', taTime: 'நிர்வாகி புதுப்பிப்பார்', description: 'Church functions, special prayer meetings and celebrations will be published here.', taDescription: 'சபை நிகழ்வுகள், சிறப்பு ஜெபக் கூட்டங்கள் மற்றும் கொண்டாட்டங்கள் இங்கே வெளியிடப்படும்.' },
];

const T = (en, ta, lang) => (lang === 'ta' ? ta : en);

function Icon({ name, size = 20 }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const d = {
    calendar: <><rect {...p} x="3" y="4" width="18" height="17" rx="2"/><path {...p} d="M16 2v4M8 2v4M3 9h18"/></>,
    heart: <path {...p} d="M20.8 8.8c0 5.4-8.8 10.4-8.8 10.4S3.2 14.2 3.2 8.8A5 5 0 0 1 12 6.1a5 5 0 0 1 8.8 2.7Z"/>,
    book: <><path {...p} d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path {...p} d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/></>,
    phone: <path {...p} d="M21 16.5v3a2 2 0 0 1-2.2 2A18.7 18.7 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h3a2 2 0 0 1 2 1.7l.5 2.4a2 2 0 0 1-.6 1.8L9 10.3a15 15 0 0 0 4.7 4.7l1.4-1.4a2 2 0 0 1 1.8-.6l2.4.5a2 2 0 0 1 1.7 2Z"/>,
    map: <><path {...p} d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle {...p} cx="12" cy="10" r="2.5"/></>,
    arrow: <path {...p} d="M5 12h14m-6-6 6 6-6 6"/>,
    menu: <><path {...p} d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path {...p} d="M5 5l14 14M19 5 5 19"/></>,
    lock: <><rect {...p} x="5" y="10" width="14" height="11" rx="2"/><path {...p} d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{d[name]}</svg>;
}

function App() {
  const [lang, setLang] = useState('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toast, setToast] = useState('');
  const [prayer, setPrayer] = useState({ name: '', phone: '', request: '' });
  const [events, setEvents] = useState(defaultEvents);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [newEvent, setNewEvent] = useState({ date: '', title: '', taTitle: '', time: '', taTime: '', description: '', taDescription: '' });

  const tamil = lang === 'ta';

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ADMIN_KEY) || '[]');
      if (Array.isArray(saved)) setEvents([...defaultEvents, ...saved]);
    } catch {}
  }, []);

  const labels = useMemo(() => ({
    home: T('Home', 'முகப்பு', lang), about: T('About Us', 'எங்களைப் பற்றி', lang), schedule: T('Prayer & Worship', 'ஜெபம் மற்றும் ஆராதனை', lang),
    events: T('Events & Functions', 'நிகழ்வுகள் & சபை நிகழ்ச்சிகள்', lang), gallery: T('Gallery', 'புகைப்படங்கள்', lang), sermons: T('Sermons & Messages', 'பிரசங்கங்கள் & செய்திகள்', lang),
    pastor: T('Pastor', 'ஆயர்', lang), prayer: T('Prayer Request', 'ஜெபக் கோரிக்கை', lang), contact: T('Contact', 'தொடர்பு', lang),
  }), [lang]);

  const nav = (id) => { setMobileOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const notify = (message) => { setToast(message); window.clearTimeout(window.__churchToast); window.__churchToast = window.setTimeout(() => setToast(''), 3200); };

  const sendPrayerRequest = (e) => {
    e.preventDefault();
    if (!prayer.name.trim() || !prayer.request.trim()) {
      notify(T('Please enter your name and prayer request.', 'தயவுசெய்து உங்கள் பெயர் மற்றும் ஜெபக் கோரிக்கையை உள்ளிடுங்கள்.', lang));
      return;
    }
    const message = `Prayer Request – CSI Holy Redeemer's Church\nName: ${prayer.name}\nPhone: ${prayer.phone || 'Not provided'}\nPrayer Request: ${prayer.request}`;
    window.open(`https://wa.me/${PASTOR_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setPrayer({ name: '', phone: '', request: '' });
  };

  const unlockAdmin = (e) => {
    e.preventDefault();
    if (adminPassword === 'churchadmin') {
      setAdminUnlocked(true); setAdminPassword(''); notify(T('Admin mode unlocked on this device.', 'இந்த சாதனத்தில் நிர்வாகி பகுதி திறக்கப்பட்டது.', lang));
    } else notify(T('Incorrect admin password.', 'நிர்வாகி கடவுச்சொல் தவறாக உள்ளது.', lang));
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) { notify(T('Add at least an English title and date.', 'ஆங்கில தலைப்பு மற்றும் தேதியை உள்ளிடுங்கள்.', lang)); return; }
    const item = { ...newEvent, id: `custom-${Date.now()}`, taDate: newEvent.date, taTitle: newEvent.taTitle || newEvent.title, taTime: newEvent.taTime || newEvent.time, taDescription: newEvent.taDescription || newEvent.description };
    const custom = events.filter((x) => x.id?.startsWith('custom-'));
    const next = [...custom, item];
    localStorage.setItem(ADMIN_KEY, JSON.stringify(next));
    setEvents([...defaultEvents, ...next]);
    setNewEvent({ date: '', title: '', taTitle: '', time: '', taTime: '', description: '', taDescription: '' });
    notify(T('Event added to this website on this device.', 'இந்த சாதனத்தின் இணையதளத்தில் நிகழ்வு சேர்க்கப்பட்டது.', lang));
  };

  const deleteEvent = (id) => {
    const custom = events.filter((x) => x.id?.startsWith('custom-') && x.id !== id);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(custom));
    setEvents([...defaultEvents, ...custom]);
  };

  return <>
    <header className="site-header">
      <div className="header-main wrap">
        <button className="brand-block" onClick={() => nav('home')} aria-label="Go to home">
          <img src="/images/church-logo.png" alt="Church of South India logo" />
          <span className="brand-english"><strong>CSI Holy Redeemer's Church</strong><small>V.V.R Nagar, Sayalgudi</small></span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-tamil"><strong>சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம்</strong><small>வி.வி.ஆர். நகர், சாயல்குடி</small></span>
        </button>
        <div className="header-actions">
          <button className="language-button" onClick={() => setLang(tamil ? 'en' : 'ta')}>◎ {tamil ? 'English' : 'தமிழ்'}</button>
          <a href={`tel:${CHURCH_PHONE}`}><Icon name="phone" size={17} /> <span>{CHURCH_PHONE}</span></a>
          <a href={MAPS} target="_blank" rel="noreferrer"><Icon name="map" size={17} /> <span>{tamil ? 'வழியைப் பெறுக' : 'Directions'}</span></a>
        </div>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"><Icon name={mobileOpen ? 'close' : 'menu'} /></button>
      </div>
      <div className="nav-row">
        <div className="wrap nav-inner">
          <nav className={mobileOpen ? 'mobile-visible' : ''}>
            <button onClick={() => nav('home')}>{labels.home}</button><button onClick={() => nav('about')}>{labels.about}</button><button onClick={() => nav('schedule')}>{labels.schedule}</button><button onClick={() => nav('events')}>{labels.events}</button><button onClick={() => nav('gallery')}>{labels.gallery}</button><button onClick={() => nav('sermons')}>{labels.sermons}</button><button onClick={() => nav('pastor')}>{labels.pastor}</button><button onClick={() => nav('prayer')}>{labels.prayer}</button><button onClick={() => nav('contact')}>{labels.contact}</button>
          </nav>
        </div>
      </div>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <span className="eyebrow">{tamil ? 'சர்ச் ஆஃப் சவுத் இந்தியா · CSI' : 'CHURCH OF SOUTH INDIA · CSI'}</span>
          <h1>{tamil ? <>பரிசுத்த மீட்பர் ஆலயம்<br /><em>ஆராதிப்போம் · ஜெபிப்போம் · ஒன்றாயிருப்போம்</em></> : <>A place to worship,<br /><em>pray, serve & belong.</em></>}</h1>
          <p>{tamil ? 'சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம், வி.வி.ஆர். நகர், சாயல்குடி. விசுவாசம், ஜெபம், ஐக்கியம் மற்றும் கிறிஸ்துவின் அன்பில் ஒன்றுகூடும் திருச்சபை.' : "Welcome to CSI Holy Redeemer's Church, V.V.R Nagar, Sayalgudi — a church family growing together in faith, prayer, fellowship and the love of Christ."}</p>
          <div className="hero-actions"><button className="primary" onClick={() => nav('schedule')}>{tamil ? 'ஜெபம் & ஆராதனை நேரங்கள்' : 'Prayer & Service Times'} <Icon name="arrow" /></button><button className="secondary" onClick={() => nav('prayer')}>{tamil ? 'ஜெபக் கோரிக்கை' : 'Prayer Request'}</button></div>
        </div>
        <div className="hero-verse">“That they all may be one.” <span>John 17:21</span></div>
      </section>

      <section className="schedule-strip" id="schedule">
        <div className="wrap"><div className="strip-heading"><span className="kicker">{tamil ? 'வாராந்திர அட்டவணை' : 'WEEKLY SCHEDULE'}</span><h2>{tamil ? 'ஜெபமும் ஆராதனையும்' : 'Prayer & Worship'}</h2></div><div className="service-list">{weeklyServices.map((s) => <article key={s.day}><div className="service-icon"><Icon name="calendar" size={19} /></div><div><b>{tamil ? s.taDay : s.day}</b><strong>{tamil ? s.taTitle : s.title}</strong><span>{s.time}</span><small>{tamil ? s.taNote : s.note}</small></div></article>)}</div></div>
      </section>

      <section className="section intro" id="about"><div className="wrap intro-grid"><div className="intro-image"><img src="/images/church-02.png" alt="CSI Holy Redeemer's Church" /></div><div><span className="kicker">{tamil ? 'எங்கள் திருச்சபை' : 'OUR CHURCH'}</span><h2>{tamil ? 'விசுவாசத்திலும் ஐக்கியத்திலும் ஒன்றாக.' : 'Growing together in faith and fellowship.'}</h2><p>{tamil ? 'சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம், சர்ச் ஆஃப் சவுத் இந்தியாவின் ஒரு பகுதியாக, சாயல்குடி வி.வி.ஆர். நகர் மற்றும் சுற்றுப்புற மக்களுக்கு ஆராதனை, ஜெபம், தேவனுடைய வார்த்தை மற்றும் ஐக்கியத்தின் மூலம் சேவை செய்கிறது.' : "CSI Holy Redeemer's Church is part of the Church of South India and serves the V.V.R Nagar community in Sayalgudi through worship, prayer, God's Word and fellowship."}</p><p>{tamil ? 'எங்கள் திருச்சபை குடும்பத்தில் குழந்தைகள், இளைஞர்கள், குடும்பங்கள் மற்றும் அனைத்து வயதினரும் அன்புடன் வரவேற்கப்படுகிறார்கள்.' : 'Children, young people, families and people of all ages are warmly welcomed into our church family.'}</p><div className="verse-card">{tamil ? '“அவர்கள் அனைவரும் ஒன்றாயிருக்க வேண்டும்.”' : '“That they all may be one.”'}<small>{tamil ? 'யோவான் 17:21' : 'John 17:21'}</small></div></div></div></section>

      <section className="section events-section" id="events"><div className="wrap"><div className="section-title"><div><span className="kicker">{tamil ? 'சபை வாழ்க்கை' : 'CHURCH LIFE'}</span><h2>{tamil ? 'நிகழ்வுகள் & சிறப்பு ஜெபங்கள்' : 'Events & Special Prayers'}</h2></div><p>{tamil ? 'சிறப்பு ஆராதனைகள், சபை நிகழ்வுகள் மற்றும் நிர்வாகி சேர்க்கும் அறிவிப்புகள் இங்கே தோன்றும்.' : 'Special services, church functions and announcements added by the administrator will appear here.'}</p></div><div className="event-grid">{events.map((e) => <button className="event-card" key={e.id} onClick={() => setSelectedEvent(e)}><span>{tamil ? (e.taDate || e.date) : e.date}</span><h3>{tamil ? e.taTitle : e.title}</h3><b>{tamil ? e.taTime : e.time}</b><p>{tamil ? e.taDescription : e.description}</p><em>{tamil ? 'விவரங்களைப் பார்க்க →' : 'View details →'}</em></button>)}</div></div></section>

      <section className="section worship"><div className="wrap worship-grid"><div><span className="kicker">{tamil ? 'ஒழுங்கான கூட்டங்கள்' : 'REGULAR GATHERINGS'}</span><h2>{tamil ? 'ஒவ்வொரு வாரமும் ஒன்றாக ஜெபிப்போம்.' : 'A rhythm of prayer throughout the week.'}</h2><p>{tamil ? 'இளைஞர்கள், பெண்கள் மற்றும் முழு சபை குடும்பத்திற்கான தனித்தனி ஜெப ஐக்கியங்களுடன், வாரத்தின் ஒவ்வொரு நாளும் தேவனைத் தேடும் வாய்ப்பு உள்ளது.' : 'Our weekly rhythm creates dedicated times for youth, women and the whole church family to pray, fellowship and seek God together.'}</p></div><div className="mini-schedule">{weeklyServices.slice(1, 6).map((s) => <div key={s.day}><b>{tamil ? s.taDay : s.day}</b><span>{tamil ? s.taTitle : s.title}</span><strong>{s.time}</strong></div>)}</div></div></section>

      <section className="pastor" id="pastor"><div className="wrap pastor-grid"><div className="pastor-photo"><div>Rev. D. Duraisingh</div><small>{tamil ? 'ஆயர் புகைப்படம் விரைவில் சேர்க்கப்படும்' : 'Pastor photo will be added soon'}</small></div><div><span className="kicker light">{tamil ? 'ஆயர்' : 'OUR PASTOR'}</span><h2>Rev. D. Duraisingh</h2><p>{tamil ? 'ஆயரின் வரவேற்புச் செய்தி, புகைப்படம் மற்றும் ஊழியத் தகவல்கள் பின்னர் இப்பகுதியில் சேர்க்கப்படும்.' : 'The pastor’s photograph, welcome message and ministry information can be added here when available.'}</p></div></div></section>

      <section className="section gallery-section" id="gallery"><div className="wrap"><div className="section-title"><div><span className="kicker">{tamil ? 'சபை நினைவுகள்' : 'CHURCH MEMORIES'}</span><h2>{tamil ? 'புகைப்படங்கள்' : 'Gallery'}</h2></div><p>{tamil ? 'ஆராதனை, சபை ஐக்கியம் மற்றும் கொண்டாட்டங்களின் தருணங்கள்.' : 'Moments from worship, fellowship and church celebrations.'}</p></div><div className="gallery-grid">{gallery.map(([src,en,ta],i) => <button className={`gallery-item g${i}`} key={src} onClick={() => setSelectedImage({ src, alt: tamil ? ta : en })}><img src={src} alt={tamil ? ta : en} /><span>{tamil ? ta : en}</span></button>)}</div></div></section>

      <section className="section sermons" id="sermons"><div className="wrap two-column"><div><span className="kicker">{tamil ? 'தேவனுடைய வார்த்தை' : "GOD'S WORD"}</span><h2>{tamil ? 'பிரசங்கங்கள் & செய்திகள்' : 'Sermons & Messages'}</h2><p>{tamil ? 'ஆயரின் பிரசங்கங்கள், வேதாகம தியானங்கள் மற்றும் சிறப்பு செய்திகள் இங்கே பகிரப்படும்.' : 'Pastor’s sermons, Bible reflections and special messages can be published here.'}</p></div><div className="message-card"><Icon name="book" size={30} /><strong>{tamil ? 'செய்திகள் விரைவில்' : 'Messages coming soon'}</strong><span>Rev. D. Duraisingh</span></div></div></section>

      <section className="prayer-section" id="prayer"><div className="wrap prayer-grid"><div><span className="kicker light">{tamil ? 'ஜெபக் கோரிக்கை' : 'PRAYER REQUEST'}</span><h2>{tamil ? 'உங்கள் ஜெபக் கோரிக்கையை பகிருங்கள்.' : 'Share your prayer request.'}</h2><p>{tamil ? 'உங்கள் கோரிக்கை ஆயரின் WhatsApp எண்ணிற்கு அனுப்பப்படும். நாங்கள் உங்களுக்காக ஜெபிக்கிறோம்.' : 'Your request will be prepared as a private WhatsApp message to the pastor. We will pray for you.'}</p></div><form className="prayer-form" onSubmit={sendPrayerRequest}><input value={prayer.name} onChange={(e) => setPrayer({ ...prayer, name: e.target.value })} placeholder={tamil ? 'உங்கள் பெயர் *' : 'Your name *'} /><input value={prayer.phone} onChange={(e) => setPrayer({ ...prayer, phone: e.target.value })} placeholder={tamil ? 'தொலைபேசி எண் (விருப்பம்)' : 'Phone number (optional)'} /><textarea value={prayer.request} onChange={(e) => setPrayer({ ...prayer, request: e.target.value })} rows="4" placeholder={tamil ? 'உங்கள் ஜெபக் கோரிக்கை *' : 'Your prayer request *'} /><button type="submit">{tamil ? 'WhatsApp மூலம் அனுப்புங்கள்' : 'Send via WhatsApp'} <Icon name="arrow" /></button></form></div></section>

      <section className="section contact" id="contact"><div className="wrap contact-grid"><div><span className="kicker">{tamil ? 'எங்களைச் சந்தியுங்கள்' : 'VISIT US'}</span><h2>{tamil ? 'ஆராதிக்க வாருங்கள்.' : 'Come worship with us.'}</h2><p><strong>{tamil ? 'சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம்' : "CSI Holy Redeemer's Church"}</strong><br />V.V.R Nagar, Sayalgudi<br />Tamil Nadu – 623120</p><div className="contact-actions"><a href={`tel:${CHURCH_PHONE}`}><Icon name="phone" /> {CHURCH_PHONE}</a><a href={`https://wa.me/${CHURCH_PHONE}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={MAPS} target="_blank" rel="noreferrer"><Icon name="map" /> {tamil ? 'வழியைப் பெறுக' : 'Get directions'}</a></div></div><div className="map-card"><div className="map-pin">✝</div><strong>{tamil ? 'சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம்' : "CSI Holy Redeemer's Church"}</strong><span>{tamil ? 'வி.வி.ஆர். நகர், சாயல்குடி' : 'V.V.R Nagar, Sayalgudi'}</span><a href={MAPS} target="_blank" rel="noreferrer">{tamil ? 'Google Maps-ல் திறக்கவும் →' : 'Open in Google Maps →'}</a></div></div></section>
    </main>

    <footer><div className="wrap footer-grid"><div className="footer-brand"><img src="/images/church-logo.png" alt="CSI logo" /><div><strong>{tamil ? 'சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம்' : "CSI Holy Redeemer's Church"}</strong><span>V.V.R Nagar, Sayalgudi, Tamil Nadu – 623120</span></div></div><div><b>{tamil ? 'விரைவு இணைப்புகள்' : 'Quick Links'}</b><button onClick={() => nav('schedule')}>{labels.schedule}</button><button onClick={() => nav('events')}>{labels.events}</button><button onClick={() => nav('prayer')}>{labels.prayer}</button><button onClick={() => nav('contact')}>{labels.contact}</button></div><div><b>{tamil ? 'தொடர்பு' : 'Contact'}</b><a href={`tel:${CHURCH_PHONE}`}>{CHURCH_PHONE}</a><a href={`https://wa.me/${CHURCH_PHONE}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={MAPS} target="_blank" rel="noreferrer">Google Maps</a></div></div><div className="wrap footer-bottom"><span>© 2026 {tamil ? 'சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : "CSI Holy Redeemer's Church. All rights reserved."}</span><button onClick={() => setAdminOpen(true)}><Icon name="lock" size={14} /> Admin</button><span>{tamil ? 'Zion Tech மூலம் உருவாக்கப்பட்டது' : 'Designed & developed by Zion Tech'}</span></div></footer>

    {selectedImage && <div className="modal dark" onClick={() => setSelectedImage(null)}><button className="modal-close" onClick={() => setSelectedImage(null)}><Icon name="close" /></button><img src={selectedImage.src} alt={selectedImage.alt} /><span>{selectedImage.alt}</span></div>}
    {selectedEvent && <div className="modal" onClick={() => setSelectedEvent(null)}><div className="event-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close light-close" onClick={() => setSelectedEvent(null)}><Icon name="close" /></button><span className="kicker">{tamil ? selectedEvent.taDate : selectedEvent.date}</span><h2>{tamil ? selectedEvent.taTitle : selectedEvent.title}</h2><strong>{tamil ? selectedEvent.taTime : selectedEvent.time}</strong><p>{tamil ? selectedEvent.taDescription : selectedEvent.description}</p><button className="primary" onClick={() => setSelectedEvent(null)}>{tamil ? 'மூடுக' : 'Close'}</button></div></div>}
    {adminOpen && <div className="modal" onClick={() => setAdminOpen(false)}><div className="admin-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close light-close" onClick={() => setAdminOpen(false)}><Icon name="close" /></button><span className="kicker">CHURCH ADMIN</span><h2>{tamil ? 'நிகழ்வுகள் நிர்வாகம்' : 'Events & Special Prayer Admin'}</h2>{!adminUnlocked ? <form onSubmit={unlockAdmin} className="admin-login"><p>{tamil ? 'நிகழ்வுகளை சேர்க்க நிர்வாகி கடவுச்சொல் தேவை.' : 'Enter the admin password to add church functions and special prayers.'}</p><input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Admin password" /><button className="primary" type="submit">Unlock</button><small>Demo password: <b>churchadmin</b>. Change this before production.</small></form> : <><form className="admin-form" onSubmit={addEvent}><input placeholder="Date / label" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} /><input placeholder="English title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} /><input placeholder="Tamil title" value={newEvent.taTitle} onChange={(e) => setNewEvent({ ...newEvent, taTitle: e.target.value })} /><input placeholder="English time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} /><input placeholder="Tamil time" value={newEvent.taTime} onChange={(e) => setNewEvent({ ...newEvent, taTime: e.target.value })} /><textarea placeholder="English details" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} /><textarea placeholder="Tamil details" value={newEvent.taDescription} onChange={(e) => setNewEvent({ ...newEvent, taDescription: e.target.value })} /><button className="primary" type="submit">Add Event / Prayer</button></form><div className="admin-list">{events.filter((e) => e.id?.startsWith('custom-')).map((e) => <div key={e.id}><span>{e.title}</span><button onClick={() => deleteEvent(e.id)}>Delete</button></div>)}{!events.some((e) => e.id?.startsWith('custom-')) && <small>No custom events added yet.</small>}</div></>}</div></div>}
    {toast && <div className="toast">{toast}</div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
