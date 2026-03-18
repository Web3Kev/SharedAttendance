import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  LogOut, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  School as SchoolIcon,
  Share2,
  MessageCircle,
  CheckCircle2,
  Copy,
  Trash,
  FileSpreadsheet,
  ShieldCheck,
  UserCheck,
  Zap,
  RefreshCw,
  Key,
  X,
  UserMinus,
  ShieldAlert,
  LogIn,
  Edit2,
  Save
} from 'lucide-react';

/** * CSS STYLESHEET - Enhanced for visibility and theme consistency */
const AppStyles = () => (
  <style>{`
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --secondary: #64748b;
      --success: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
      --bg-app: #f8fafc;
      --bg-card: #ffffff;
      --text-main: #0f172a;
      --text-muted: #475569;
      --border: #e2e8f0;
      --input-bg: #f1f5f9;
      --radius-lg: 1.5rem;
      --radius-xl: 2.5rem;
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg-app: #0f172a;
        --bg-card: #1e293b;
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --border: #334155;
        --input-bg: #0f172a;
        --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
      }
    }

    * { box-sizing: border-box; }
    body { 
      margin: 0; 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
      background-color: var(--bg-app);
      color: var(--text-main);
      -webkit-tap-highlight-color: transparent;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .container { max-width: 60rem; padding: 0 1rem; } 

    .app-header {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 1rem 0;
    }
    .header-content { display: flex; justify-content: space-between; align-items: center; }
    .brand { display: flex; align-items: center; gap: 1rem; }
    .icon-box { 
      background: var(--primary); 
      color: white; 
      padding: 0.6rem; 
      border-radius: 0.85rem; 
      display: flex;
    }
    .brand-text h1 { margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
    
    .badge { 
      font-size: 0.65rem; 
      text-transform: uppercase; 
      font-weight: 900; 
      padding: 0.15rem 0.5rem; 
      border-radius: 999px;
      letter-spacing: 0.05em;
    }
    .badge-director { background: #fef3c7; color: #92400e; }
    .badge-teacher { background: #e0f2fe; color: #0369a1; }
    .badge-viewer { background: #f1f5f9; color: #475569; }

    @media (prefers-color-scheme: dark) {
      .badge-director { background: #fbbf24; color: #451a03; }
      .badge-teacher { background: #38bdf8; color: #082f49; }
      .badge-viewer { background: #475569; color: #f1f5f9; }
    }

    .stats-grid { 
      display: grid; 
      grid-template-columns: repeat(3, 1fr); 
      gap: 0.75rem; 
      margin: 0 auto 2rem;
      max-width: 500px;
    }
    .stat-card {
      background: var(--bg-card);
      padding: 1rem;
      border-radius: 1.5rem;
      text-align: center;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      color: var(--text-main);
    }
    .stat-val { font-size: 1.5rem; font-weight: 900; display: block; }
    .stat-label { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); }

    .btn {
      border: none;
      border-radius: 1rem;
      padding: 0.75rem 1.25rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: transform 0.1s;
    }
    .btn:active { transform: scale(0.95); }
    .btn-primary { background: var(--primary); color: white; }
    .btn-success { background: var(--success); color: white; }
    .btn-danger { background: var(--danger); color: white; }
    .btn-ghost { background: transparent; color: var(--text-muted); padding: 0.5rem; border-radius: 50%; }
    .btn-ghost:hover { background: rgba(0,0,0,0.05); color: var(--text-main); }

    .btn-full { width: 100%; padding: 1.25rem; }

    .class-card {
      background: var(--bg-card);
      width: 100%;
      max-width: 400px;
      margin: 0 auto 1rem;
      text-align: left;
      border: 1px solid var(--border);
      border-radius: 1.5rem;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      color: var(--text-main);
    }

    .student-row { 
      display: flex; 
      align-items: center; 
      gap: 0.75rem; 
      margin: 0 auto 0.75rem; 
      width: 100%;
      max-width: 400px;
    }

    .swipe-row {
      position: relative;
      flex: 1; 
      height: 4.5rem;
      background: var(--border);
      border-radius: 1.5rem;
      overflow: hidden;
      cursor: pointer;
      user-select: none;
    }
    .swipe-bg {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      font-weight: 900;
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      color: white;
    }

    .swipe-handle {
      position: absolute;
      top: 0.25rem;
      bottom: 0.25rem;
      width: calc(50% - 0.25rem);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
      transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s;
      border-radius: 1.3rem;
    }
    
    .swipe-handle.is-present { 
      transform: translateX(calc(100% + 0.25rem)); 
      background-color: var(--success);
    }
    .swipe-handle.is-absent { 
      transform: translateX(0.25rem); 
      background-color: var(--danger);
    }
    
    .student-name { 
      font-weight: 800; 
      font-size: 1rem; 
      text-transform: uppercase; 
      font-style: italic; 
      color: white; 
      text-align: center;
      padding: 0 0.5rem;
    }

    .input-field {
      width: 100%;
      padding: 1rem;
      border-radius: 1rem;
      border: 2px solid var(--border);
      background: var(--input-bg);
      font-size: 1rem;
      font-weight: 700;
      outline: none;
      color: var(--text-main);
    }
    .input-field:focus { border-color: var(--primary); background: var(--bg-card); }

    .admin-section {
      background: var(--bg-card);
      padding: 1.5rem;
      border-radius: 2rem;
      border: 1px solid var(--border);
      margin: 0 auto 1.5rem;
      width: 100%;
      max-width: 500px;
      color: var(--text-main);
    }
    
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--input-bg);
      padding: 0.4rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-main);
      margin: 0.25rem;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      z-index: 100;
    }
    .modal-content {
      background: var(--bg-card);
      width: 100%;
      max-width: 400px;
      border-radius: 2.5rem 2.5rem 0 0;
      padding: 2rem;
      animation: slideUp 0.3s ease-out;
      color: var(--text-main);
    }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

    .manage-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--input-bg);
      border-radius: 1.25rem;
      margin-bottom: 0.75rem;
      color: var(--text-main);
      border: 1px solid var(--border);
    }

    @media (max-width: 480px) {
      .student-row, .class-card, .admin-section, .stats-grid { max-width: 100%; }
    }
  `}</style>
);

// --- State & Data Utilities ---
const compressData = (obj) => {
  try {
    const str = JSON.stringify(obj);
    return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) { return ""; }
};

const decompressData = (str) => {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
  } catch (e) { return null; }
};

const App = () => {
  const [db, setDb] = useState({ schools: {} });
  const [activeSchoolName, setActiveSchoolName] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [setupStep, setSetupStep] = useState(0);
  const [setupData, setSetupData] = useState({ schoolName: '', directorId: 'admin' });
  const [editingClassId, setEditingClassId] = useState(null);
  const [editNameValue, setEditNameValue] = useState("");

  const todayStr = new Date().toLocaleDateString('en-CA'); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSchool = params.get('school');
    const urlUser = params.get('user');
    const importData = params.get('data');

    let currentDb = { schools: {} };
    const saved = localStorage.getItem('attendance_db_v5');
    if (saved) {
      try { currentDb = JSON.parse(saved); } catch(e) {}
    }

    if (importData) {
      const incoming = decompressData(importData);
      if (incoming?.schools) {
        currentDb.schools = { ...currentDb.schools, ...incoming.schools };
      }
    }

    Object.keys(currentDb.schools).forEach(name => {
      const s = currentDb.schools[name];
      if (s.lastDate !== todayStr) {
        s.attendance = {};
        s.lastDate = todayStr;
      }
    });

    localStorage.setItem('attendance_db_v5', JSON.stringify(currentDb));
    setDb(currentDb);

    const finalSchool = urlSchool || (importData ? Object.keys(decompressData(importData).schools)[0] : null);
    const storedUser = localStorage.getItem('attendance_active_user') || null;
    const finalUser = urlUser || storedUser;

    if (finalSchool) setActiveSchoolName(finalSchool);
    if (finalUser) {
      setActiveUser(finalUser);
      localStorage.setItem('attendance_active_user', finalUser);
    }

    if (importData || urlUser) {
      try { window.history.replaceState({}, '', `?school=${encodeURIComponent(finalSchool || '')}`); } catch(e) {}
    }
  }, [todayStr]);

  const saveToStorage = (newDb) => {
    setDb(newDb);
    localStorage.setItem('attendance_db_v5', JSON.stringify(newDb));
  };

  const currentSchool = db.schools[activeSchoolName] || null;
  const classes = currentSchool?.classes || [];
  const attendance = currentSchool?.attendance || {};

  const allAuthorizedIds = useMemo(() => {
    if (!currentSchool) return [];
    const directors = currentSchool.directors || [];
    const teachers = classes.flatMap(c => c.teachers || []);
    return [...new Set([...directors, ...teachers])];
  }, [currentSchool, classes]);

  const authenticatedUser = useMemo(() => {
    if (activeUser && allAuthorizedIds.includes(activeUser)) return activeUser;
    return null;
  }, [activeUser, allAuthorizedIds]);

  const isDirector = authenticatedUser && (currentSchool?.directors || []).includes(authenticatedUser);

  const updateSchool = (updates) => {
    if (!activeSchoolName) return;
    const newDb = { ...db, schools: { ...db.schools, [activeSchoolName]: { ...currentSchool, ...updates } } };
    saveToStorage(newDb);
  };

  const deleteClass = (id) => {
    if (!isDirector) return;
    if (window.confirm("Are you sure you want to remove this class? All attendance data for this class will be lost.")) {
      const newClasses = classes.filter(c => c.id !== id);
      const newAttendance = { ...attendance };
      delete newAttendance[id];
      updateSchool({ classes: newClasses, attendance: newAttendance });
    }
  };

  const renameClass = (id, newName) => {
    if (!isDirector || !newName.trim()) return;
    const newClasses = classes.map(c => c.id === id ? { ...c, name: newName.trim() } : c);
    updateSchool({ classes: newClasses });
    setEditingClassId(null);
  };

  const finalizeSetup = () => {
    const newSchool = { name: setupData.schoolName, directors: [setupData.directorId], classes: [], attendance: {}, lastDate: todayStr };
    const newDb = { ...db, schools: { ...db.schools, [setupData.schoolName]: newSchool } };
    saveToStorage(newDb);
    setActiveSchoolName(setupData.schoolName);
    setActiveUser(setupData.directorId);
    localStorage.setItem('attendance_active_user', setupData.directorId);
  };

  const generateLink = (uid = null) => {
    const data = { schools: { [activeSchoolName]: { ...currentSchool, lastDate: todayStr } } };
    const search = new URLSearchParams({ school: activeSchoolName, data: compressData(data) });
    if (uid) search.set('user', uid);
    return `${window.location.origin}${window.location.pathname}?${search.toString()}`;
  };

  if (!activeSchoolName) {
    return (
      <div className="container">
        <AppStyles />
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding: '1rem'}}>
          <div className="admin-section" style={{textAlign:'center'}}>
            <div className="icon-box" style={{margin:'0 auto 1.5rem', width:'fit-content'}}><Zap size={32}/></div>
            <h1 style={{margin:'0 0 1.5rem', fontWeight:900, fontSize:'1.5rem'}}>NEW SCHOOL</h1>
            {setupStep === 0 ? (
              <>
                <input className="input-field" placeholder="School Name" onChange={e => setSetupData({...setupData, schoolName: e.target.value})} />
                <button className="btn btn-primary btn-full" style={{marginTop:'1rem'}} onClick={() => setSetupStep(1)} disabled={!setupData.schoolName}>Continue</button>
              </>
            ) : (
              <>
                <input className="input-field" defaultValue={setupData.directorId} onChange={e => setSetupData({...setupData, directorId: e.target.value})} />
                <button className="btn btn-success btn-full" style={{marginTop:'1rem'}} onClick={finalizeSetup}>Launch</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const schoolStats = classes.reduce((acc, c) => {
    const students = c.students || [];
    const p = students.filter(s => attendance[c.id]?.[s] === 'present').length;
    acc.total += students.length; acc.present += p; acc.absent += (students.length - p);
    return acc;
  }, { total: 0, present: 0, absent: 0 });

  return (
    <>
      <AppStyles />
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <div className="icon-box"><Users size={20}/></div>
            <div className="brand-text">
              <h1>{activeSchoolName}</h1>
              <span className={`badge ${isDirector ? 'badge-director' : authenticatedUser ? 'badge-teacher' : 'badge-viewer'}`}>
                {isDirector ? 'Director' : authenticatedUser ? `@${authenticatedUser}` : 'Viewer'}
              </span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => setView(view === 'admin' ? 'dashboard' : 'admin')}><Settings size={20}/></button>
        </div>
      </header>

      <main className="container" style={{paddingTop:'2rem', paddingBottom: '4rem'}}>
        {view === 'dashboard' && (
          <>
            <div className="stats-grid">
              <StatCard label="Total" val={schoolStats.total} color="primary" />
              <StatCard label="Present" val={schoolStats.present} color="success" />
              <StatCard label="Absent" val={schoolStats.absent} color="danger" />
            </div>
            
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem'}}>
              <h2 className="stat-label" style={{margin:0}}>Classes</h2>
              <button className="btn btn-success" style={{fontSize:'0.7rem', padding:'0.5rem 1rem'}} onClick={() => setShowShareModal(true)}>
                <Share2 size={14}/> Sync
              </button>
            </div>

            {classes.length === 0 && (
              <div style={{textAlign: 'center', padding: '3rem', opacity: 0.5}}>
                <SchoolIcon size={48} style={{margin: '0 auto 1rem'}} />
                <p style={{fontWeight: 700}}>No classes created yet.</p>
                {isDirector && <p style={{fontSize: '0.8rem'}}>Go to Settings to add one.</p>}
              </div>
            )}

            {classes.map(c => {
              const students = c.students || [];
              const p = students.filter(s => attendance[c.id]?.[s] === 'present').length;
              return (
                <button key={c.id} className="class-card" onClick={() => { setSelectedClassId(c.id); setView('class'); }}>
                  <div>
                    <h3 style={{margin:0, fontWeight:800, textTransform: 'uppercase'}}>{c.name}</h3>
                    <div style={{display:'flex', gap:'0.75rem', marginTop:'0.25rem'}}>
                       <span style={{fontSize:'0.65rem', fontWeight:900, color:'var(--success)'}}>{p} IN</span>
                       <span style={{fontSize:'0.65rem', fontWeight:900, color:'var(--danger)'}}>{students.length - p} OUT</span>
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--border)" />
                </button>
              );
            })}
          </>
        )}

        {view === 'class' && (
          <ClassDetail 
            c={classes.find(i => i.id === selectedClassId)} 
            attendance={attendance[selectedClassId] || {}}
            canEdit={isDirector || classes.find(c => c.id === selectedClassId)?.teachers?.includes(authenticatedUser)}
            onToggle={(name, status) => {
              const newAtt = { ...attendance };
              if (!newAtt[selectedClassId]) newAtt[selectedClassId] = {};
              newAtt[selectedClassId][name] = status;
              updateSchool({ attendance: newAtt });
            }}
            onAddPupil={name => {
              const c = classes.find(i => i.id === selectedClassId);
              if (c.students.includes(name)) return alert("Name already exists in this class.");
              const newClasses = classes.map(i => i.id === selectedClassId ? { ...i, students: [...(i.students || []), name] } : i);
              updateSchool({ classes: newClasses });
            }}
            onRemovePupil={name => {
              if (window.confirm(`Delete ${name}?`)) {
                const newClasses = classes.map(i => i.id === selectedClassId ? { ...i, students: (i.students || []).filter(s => s !== name) } : i);
                updateSchool({ classes: newClasses });
              }
            }}
            onAddTeacher={id => {
              const newClasses = classes.map(i => i.id === selectedClassId ? { ...i, teachers: [...new Set([...(i.teachers || []), id])] } : i);
              updateSchool({ classes: newClasses });
            }}
            onRemoveTeacher={id => {
              const newClasses = classes.map(i => i.id === selectedClassId ? { ...i, teachers: (i.teachers || []).filter(t => t !== id) } : i);
              updateSchool({ classes: newClasses });
            }}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'admin' && (
          <div className="animate-in">
            <button className="btn btn-ghost" onClick={() => setView('dashboard')} style={{marginBottom:'1rem'}}><ChevronLeft size={16}/> Back</button>
            
            <div className="admin-section">
              <h3 className="stat-label" style={{marginBottom:'1rem'}}>Identify Yourself</h3>
              {!authenticatedUser ? (
                <form onSubmit={e => {
                  e.preventDefault();
                  const id = e.target.userId.value.trim();
                  if (allAuthorizedIds.includes(id)) {
                    setActiveUser(id);
                    localStorage.setItem('attendance_active_user', id);
                  } else { alert("ID not found."); }
                  e.target.reset();
                }} style={{display:'flex', gap:'0.75rem'}}>
                  <input name="userId" className="input-field" placeholder="Secret ID" required />
                  <button className="btn btn-primary"><LogIn size={20}/></button>
                </form>
              ) : (
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                   <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                     <div className="icon-box" style={{background:'var(--success)'}}><CheckCircle2 size={16}/></div>
                     <div>
                       <p style={{margin:0, fontWeight:800, fontSize:'1rem'}}>{authenticatedUser}</p>
                       <p style={{margin:0, fontSize:'0.75rem', fontWeight: 600, color: 'var(--text-muted)'}}>{isDirector ? 'Administrator' : 'Teacher'}</p>
                     </div>
                   </div>
                   <button onClick={() => { 
                      localStorage.removeItem('attendance_active_user'); 
                      setActiveUser(null); 
                      setView('dashboard'); 
                   }} className="btn" style={{background:'rgba(239, 68, 68, 0.1)', color:'var(--danger)', fontSize:'0.8rem'}}>Sign Out</button>
                </div>
              )}
            </div>

            {isDirector && (
              <>
                <div className="admin-section">
                  <h3 className="stat-label" style={{marginBottom:'1rem'}}>Manage Existing Classes</h3>
                  {classes.length === 0 && <p style={{fontSize: '0.8rem', opacity: 0.5}}>No classes to manage.</p>}
                  {classes.map(c => (
                    <div key={c.id} className="manage-row">
                      {editingClassId === c.id ? (
                        <div style={{display: 'flex', gap: '0.5rem', flex: 1}}>
                          <input 
                            className="input-field" 
                            style={{padding: '0.4rem 0.75rem', fontSize: '0.9rem'}} 
                            value={editNameValue} 
                            onChange={e => setEditNameValue(e.target.value)} 
                          />
                          <button className="btn btn-success" style={{padding: '0.5rem'}} onClick={() => renameClass(c.id, editNameValue)}>
                            <Save size={16}/>
                          </button>
                          <button className="btn btn-ghost" style={{padding: '0.5rem'}} onClick={() => setEditingClassId(null)}>
                            <X size={16}/>
                          </button>
                        </div>
                      ) : (
                        <>
                          <div style={{flex: 1}}>
                            <span style={{fontWeight: 800, textTransform: 'uppercase'}}>{c.name}</span>
                            <div style={{fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)'}}>ID: {c.id}</div>
                          </div>
                          <div style={{display: 'flex', gap: '0.25rem'}}>
                            <button className="btn btn-ghost" onClick={() => { setEditingClassId(c.id); setEditNameValue(c.name); }}>
                              <Edit2 size={16}/>
                            </button>
                            <button className="btn btn-ghost" style={{color: 'var(--danger)'}} onClick={() => deleteClass(c.id)}>
                              <Trash2 size={16}/>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="admin-section">
                  <h3 className="stat-label" style={{marginBottom:'1rem'}}>New Class</h3>
                  <form onSubmit={e => {
                    e.preventDefault();
                    const name = e.target.cName.value;
                    const teacher = e.target.cTeacher.value;
                    const newClass = { id: Date.now().toString().slice(-6), name, teachers: [teacher], students: [] };
                    updateSchool({ classes: [...classes, newClass] });
                    e.target.reset();
                  }} style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                    <input name="cName" className="input-field" placeholder="Class Name" required />
                    <input name="cTeacher" className="input-field" placeholder="Lead Teacher ID" required />
                    <button className="btn btn-primary btn-full">Create Class</button>
                  </form>
                </div>

                <div className="admin-section">
                  <h3 className="stat-label" style={{marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.5rem'}}><ShieldAlert size={14}/> School Directors</h3>
                  <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '1rem'}}>
                    {(currentSchool?.directors || []).map(d => (
                      <div key={d} className="pill" style={{background: '#fef3c7', color: '#92400e'}}>
                        <span>{d}</span>
                        {currentSchool.directors.length > 1 && (
                          <button onClick={() => {
                            const newD = currentSchool.directors.filter(item => item !== d);
                            updateSchool({ directors: newD });
                          }} style={{background:'none', border:'none', color:'inherit'}}><X size={12}/></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={e => {
                    e.preventDefault();
                    const id = e.target.dId.value.trim();
                    updateSchool({ directors: [...new Set([...(currentSchool.directors || []), id])] });
                    e.target.reset();
                  }} style={{display:'flex', gap:'0.5rem'}}>
                    <input name="dId" className="input-field" placeholder="Add Director ID" style={{padding:'0.5rem 1rem', fontSize:'0.8rem'}} required />
                    <button className="btn btn-primary" style={{padding:'0.5rem'}}><UserPlus size={16}/></button>
                  </form>
                </div>
              </>
            )}

            {authenticatedUser && (
              <div className="admin-section">
                <h3 className="stat-label" style={{marginBottom:'1rem'}}>Data Tools</h3>
                <button onClick={() => {
                   let csv = "Class,Student,Status\n";
                   classes.forEach(c => c.students.forEach(s => csv += `"${c.name}","${s}","${attendance[c.id]?.[s] || 'absent'}"\n`));
                   const blob = new Blob([csv], { type: 'text/csv' });
                   const a = document.createElement("a");
                   a.href = URL.createObjectURL(blob);
                   a.download = `${activeSchoolName}_attendance.csv`;
                   a.click();
                }} className="btn btn-success btn-full">Export Today's Attendance (CSV)</button>
              </div>
            )}
          </div>
        )}
      </main>

      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
              <h3 style={{margin:0, fontWeight:900, fontStyle:'italic'}}>SYNC HUB</h3>
              <button className="btn btn-ghost" onClick={() => setShowShareModal(false)}>✕</button>
            </div>
            <ShareRow icon={<RefreshCw size={18}/>} color="var(--success)" label="Quick Sync" desc="Share daily data." link={generateLink()} />
            {isDirector && (
              <>
                <ShareRow icon={<ShieldCheck size={18}/>} color="var(--primary)" label="Director Invite" desc="Full admin access." link={generateLink('director_id')} />
                <ShareRow icon={<UserCheck size={18}/>} color="#0ea5e9" label="Teacher Invite" desc="Class access." link={generateLink('teacher_id')} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const ClassDetail = ({ c, attendance, canEdit, onToggle, onAddPupil, onRemovePupil, onAddTeacher, onRemoveTeacher, onBack }) => {
  if (!c) return null;
  return (
    <div className="animate-in">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem'}}>
        <button className="btn btn-ghost" onClick={onBack}><ChevronLeft size={16}/> Back</button>
        <h2 style={{margin:0, fontWeight:900, fontStyle:'italic', textTransform:'uppercase', fontSize: '1.2rem', color: 'var(--text-main)'}}>{c.name}</h2>
      </div>

      {canEdit && (
        <div className="admin-section" style={{padding: '1rem', marginBottom: '1.5rem'}}>
          <p className="stat-label" style={{fontSize: '0.55rem', marginBottom: '0.5rem'}}>Authorized Teachers</p>
          <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '0.5rem'}}>
            {(c.teachers || []).map(t => (
              <div key={t} className="pill">
                <span>{t}</span>
                <button onClick={() => onRemoveTeacher(t)} style={{background:'none', border:'none', color:'var(--danger)'}}><X size={12}/></button>
              </div>
            ))}
          </div>
          <form onSubmit={e => { e.preventDefault(); onAddTeacher(e.target.tId.value.trim()); e.target.reset(); }} style={{display:'flex', gap:'0.5rem'}}>
             <input name="tId" className="input-field" placeholder="Grant ID Access" style={{padding:'0.5rem', fontSize:'0.8rem'}} required />
             <button className="btn btn-primary" style={{padding:'0.5rem'}}><UserPlus size={16}/></button>
          </form>
        </div>
      )}

      {c.students.length === 0 && (
        <div style={{textAlign: 'center', padding: '2rem', opacity: 0.4}}>
          <Users size={32} style={{margin: '0 auto 0.5rem'}} />
          <p>No pupils in this class.</p>
        </div>
      )}

      {(c.students || []).map(s => {
        const isP = attendance[s] === 'present';
        return (
          <div key={s} className="student-row">
            <div className="swipe-row" onClick={() => canEdit && onToggle(s, isP ? 'absent' : 'present')}>
              <div className="swipe-bg">
                <span style={{ opacity: isP ? 0.2 : 1 }}>PRESENT</span>
                <span style={{ opacity: isP ? 1 : 0.2 }}>ABSENT</span>
              </div>
              <div className={`swipe-handle ${isP ? 'is-present' : 'is-absent'}`}>
                <span className="student-name">{s}</span>
              </div>
            </div>
            {canEdit && (
              <button className="btn btn-ghost" style={{ color: 'var(--danger)', flexShrink: 0 }} onClick={(e) => { e.stopPropagation(); onRemovePupil(s); }}>
                <Trash2 size={20} />
              </button>
            )}
          </div>
        );
      })}

      {canEdit && (
        <form onSubmit={e => { e.preventDefault(); onAddPupil(e.target.sName.value.trim()); e.target.reset(); }} style={{display:'flex', gap:'0.5rem', marginTop:'2rem', maxWidth: '400px', margin: '2rem auto 0'}}>
          <input name="sName" className="input-field" placeholder="Add pupil name..." required />
          <button className="btn btn-primary"><Plus/></button>
        </form>
      )}
    </div>
  );
};

const ShareRow = ({ icon, color, label, desc, link }) => {
  const wa = `https://wa.me/?text=${encodeURIComponent(`School Attendance Portal:\n${link}`)}`;
  return (
    <div className="share-btn-row" style={{display:'flex', alignItems:'center', gap:'1rem', padding:'1rem', borderRadius:'1.25rem', background:'var(--input-bg)', marginBottom:'0.5rem', border: '1px solid var(--border)'}}>
      <div style={{background: color, color:'white', padding:'0.75rem', borderRadius:'0.75rem', display:'flex'}}>{icon}</div>
      <div style={{flex:1}}>
        <h4 style={{margin:0, fontSize:'0.75rem', fontWeight:900, textTransform:'uppercase', color: 'var(--text-main)'}}>{label}</h4>
        <p style={{margin:0, fontSize:'0.65rem', color:'var(--text-muted)', fontWeight: 600}}>{desc}</p>
      </div>
      <a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{color:'var(--success)'}}><MessageCircle size={20}/></a>
    </div>
  );
};

const StatCard = ({ label, val, color }) => (
  <div className="stat-card">
    <span className="stat-val" style={{color: `var(--${color})`}}>{val}</span>
    <span className="stat-label">{label}</span>
  </div>
);

export default App;