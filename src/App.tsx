/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  LogOut, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  Section, 
  Patient, 
  SECTIONS, 
  MOCK_PATIENTS, 
  MOCK_TRANSACTIONS, 
  MOCK_APPOINTMENTS 
} from './types';
import { Modal } from './components/Modal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Modals state
  const [isEmitModalOpen, setIsEmitModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    return MOCK_PATIENTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.phone.includes(searchQuery)
    );
  }, [searchQuery]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brisas-blue to-[#1d7fb5] p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-sm border border-white/20 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Hospital Brisas</h1>
            <p className="text-blue-100/80 text-sm">Panel de Partners – Acceso</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-blue-100 mb-1 uppercase tracking-wider">Email o Teléfono</label>
              <input 
                type="text" 
                className="w-full bg-white/90 border-0 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-white/50 outline-none transition-all"
                placeholder="partner@correo.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-100 mb-1 uppercase tracking-wider">Contraseña</label>
              <input 
                type="password" 
                className="w-full bg-white/90 border-0 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-white/50 outline-none transition-all"
                placeholder="********"
              />
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-white text-brisas-blue font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg mt-4"
            >
              Ingresar
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-blue-100/50 text-[10px] uppercase tracking-[0.2em]">Partner Innovation Hub</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-brisas-blue text-white flex flex-col shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Hospital Brisas</h1>
            <p className="text-[10px] text-blue-200/60 uppercase tracking-widest mt-1">Partner Innovation Hub</p>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    setActiveSection(section.id);
                    if (section.id !== 'pacientes') setSelectedPatient(null);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    activeSection === section.id 
                      ? 'bg-brisas-blue-hover text-white shadow-inner' 
                      : 'text-blue-100/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-white' : 'text-blue-300/50'}`} />
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-200/70 hover:bg-red-500/10 hover:text-red-200 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
          <div className="mt-4 text-[10px] text-blue-300/40 text-center uppercase tracking-widest">
            Powered by Hospital Brisas
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-brisas-bg relative">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-semibold text-slate-800">
              {SECTIONS.find(s => s.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Clínica Demo</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Partner ID: #8829</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-brisas-blue flex items-center justify-center text-white text-xs font-bold">
              CD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card">
                    <div className="label">Puntos emitidos (mes)</div>
                    <div className="text-3xl font-bold text-slate-800">12,450</div>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-600 font-medium">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>+22% vs mes anterior</span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="label">Puntos redimidos (mes)</div>
                    <div className="text-3xl font-bold text-slate-800">7,980</div>
                    <div className="text-[10px] text-slate-400 mt-2 font-medium">
                      Tasa de redención: <span className="text-brisas-blue">64%</span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="label">Citas generadas (mes)</div>
                    <div className="text-3xl font-bold text-slate-800">86</div>
                    <div className="text-[10px] text-slate-400 mt-2 font-medium">
                      Por túnel de conversión
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800">Últimos canjes</h3>
                      <button className="text-[10px] text-brisas-blue font-bold uppercase tracking-widest hover:underline">Ver todo</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="table-brisas">
                        <thead>
                          <tr>
                            <th>Paciente</th>
                            <th>Servicio</th>
                            <th>Puntos</th>
                            <th>Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_TRANSACTIONS.filter(t => t.type === 'canje').slice(0, 4).map(t => (
                            <tr key={t.id}>
                              <td className="font-medium text-slate-900">{t.patientName}</td>
                              <td>{t.reason}</td>
                              <td className="text-red-600 font-bold">-{t.points}</td>
                              <td>{t.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800">Próximas citas</h3>
                      <button className="text-[10px] text-brisas-blue font-bold uppercase tracking-widest hover:underline">Ver todo</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="table-brisas">
                        <thead>
                          <tr>
                            <th>Paciente</th>
                            <th>Servicio</th>
                            <th>Fecha/Hora</th>
                            <th>Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_APPOINTMENTS.slice(0, 4).map(a => (
                            <tr key={a.id}>
                              <td className="font-medium text-slate-900">{a.patientName}</td>
                              <td>{a.service}</td>
                              <td>{a.dateTime}</td>
                              <td>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  a.status === 'confirmada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {a.status === 'confirmada' ? <CheckCircle2 className="w-2 h-2" /> : <Clock className="w-2 h-2" />}
                                  {a.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'pacientes' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar por nombre o teléfono..."
                      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brisas-blue/20 outline-none transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary gap-2 w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    Nuevo Paciente
                  </button>
                </div>

                <div className="card overflow-hidden p-0">
                  <table className="table-brisas">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Puntos actuales</th>
                        <th>Última cita</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map(p => (
                        <tr 
                          key={p.id} 
                          onClick={() => setSelectedPatient(p)}
                          className="cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                          <td className="font-medium text-slate-900">{p.name}</td>
                          <td>{p.phone}</td>
                          <td className="font-bold text-brisas-blue">{p.points.toLocaleString()}</td>
                          <td>
                            <div className="text-xs">{p.lastService}</div>
                            <div className="text-[10px] text-slate-400">{p.lastAppointment}</div>
                          </td>
                          <td>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedPatient && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="card mt-8 border-brisas-blue/20 bg-brisas-blue/[0.02]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                      <h3 className="text-lg font-bold text-slate-800">Ficha de Paciente</h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setIsEmitModalOpen(true)}
                          className="btn btn-outline flex-1 sm:flex-none"
                        >
                          Emitir Puntos
                        </button>
                        <button 
                          onClick={() => setIsRedeemModalOpen(true)}
                          className="btn btn-primary flex-1 sm:flex-none"
                        >
                          Canjear Puntos
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <div>
                          <div className="label">Nombre Completo</div>
                          <div className="text-lg font-bold text-slate-800">{selectedPatient.name}</div>
                        </div>
                        <div>
                          <div className="label">Teléfono</div>
                          <div className="text-sm text-slate-600 font-medium">{selectedPatient.phone}</div>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-brisas-blue/10 shadow-sm">
                          <div className="label">Saldo de puntos</div>
                          <div className="text-4xl font-black text-brisas-blue">{selectedPatient.points.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex border-b border-slate-200 mb-4">
                          <button className="px-4 py-2 text-xs font-bold text-brisas-blue border-b-2 border-brisas-blue uppercase tracking-wider">Historial de Puntos</button>
                          <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">Historial de Citas</button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          <table className="table-brisas">
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Puntos</th>
                                <th>Motivo</th>
                              </tr>
                            </thead>
                            <tbody>
                              {MOCK_TRANSACTIONS.filter(t => t.patientId === selectedPatient.id).map(t => (
                                <tr key={t.id}>
                                  <td>{t.date}</td>
                                  <td>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                      t.type === 'emision' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                      {t.type === 'emision' ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownLeft className="w-2 h-2" />}
                                      {t.type}
                                    </span>
                                  </td>
                                  <td className={`font-bold ${t.type === 'emision' ? 'text-blue-600' : 'text-red-600'}`}>
                                    {t.type === 'emision' ? '+' : '-'}{t.points.toLocaleString()}
                                  </td>
                                  <td className="text-xs">{t.reason}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {activeSection === 'wallet' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800">Resumen de transacciones</h3>
                  <button onClick={() => setIsEmitModalOpen(true)} className="btn btn-primary gap-2">
                    <Plus className="w-4 h-4" />
                    Emitir Puntos
                  </button>
                </div>
                <div className="card overflow-hidden p-0">
                  <table className="table-brisas">
                    <thead>
                      <tr>
                        <th>Paciente</th>
                        <th>Tipo</th>
                        <th>Puntos</th>
                        <th>Motivo</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_TRANSACTIONS.map(t => (
                        <tr key={t.id}>
                          <td className="font-medium text-slate-900">{t.patientName}</td>
                          <td>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              t.type === 'emision' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {t.type === 'emision' ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownLeft className="w-2 h-2" />}
                              {t.type}
                            </span>
                          </td>
                          <td className={`font-bold ${t.type === 'emision' ? 'text-blue-600' : 'text-red-600'}`}>
                            {t.type === 'emision' ? '+' : '-'}{t.points.toLocaleString()}
                          </td>
                          <td>{t.reason}</td>
                          <td>{t.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === 'citas' && (
              <div className="space-y-6">
                <div className="card overflow-hidden p-0">
                  <table className="table-brisas">
                    <thead>
                      <tr>
                        <th>Paciente</th>
                        <th>Servicio</th>
                        <th>Fecha/Hora</th>
                        <th>Origen</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_APPOINTMENTS.map(a => (
                        <tr key={a.id}>
                          <td className="font-medium text-slate-900">{a.patientName}</td>
                          <td>{a.service}</td>
                          <td>{a.dateTime}</td>
                          <td className="text-xs text-slate-500 italic">{a.origin}</td>
                          <td>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              a.status === 'confirmada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {a.status === 'confirmada' ? <CheckCircle2 className="w-2 h-2" /> : <Clock className="w-2 h-2" />}
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === 'reportes' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input type="date" className="flex-1 sm:flex-none px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brisas-blue/20" />
                    <span className="text-slate-400 text-xs">hasta</span>
                    <input type="date" className="flex-1 sm:flex-none px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brisas-blue/20" />
                  </div>
                  <button className="btn btn-outline text-xs h-9 w-full sm:w-auto">Descargar PDF</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card">
                    <div className="label">Puntos emitidos (rango)</div>
                    <div className="text-3xl font-bold text-slate-800">23,400</div>
                  </div>
                  <div className="card">
                    <div className="label">Puntos redimidos (rango)</div>
                    <div className="text-3xl font-bold text-slate-800">15,320</div>
                  </div>
                  <div className="card">
                    <div className="label">Citas generadas (rango)</div>
                    <div className="text-3xl font-bold text-slate-800">162</div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">Top 10 pacientes por puntos redimidos</h3>
                  <div className="overflow-x-auto">
                    <table className="table-brisas">
                      <thead>
                        <tr>
                          <th>Paciente</th>
                          <th>Puntos redimidos</th>
                          <th className="w-48 hidden sm:table-cell">Progreso</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="font-medium">María López</td>
                          <td className="font-bold">5,400</td>
                          <td className="hidden sm:table-cell">
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-brisas-blue h-full w-[85%]"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium">Carlos Díaz</td>
                          <td className="font-bold">4,000</td>
                          <td className="hidden sm:table-cell">
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-brisas-blue h-full w-[65%]"></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'config' && (
              <div className="max-w-2xl">
                <div className="card space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre del Partner</label>
                      <input type="text" defaultValue="Clínica Demo" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brisas-blue/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Correo de contacto</label>
                      <input type="email" defaultValue="partner@clinica.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brisas-blue/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logo del Partner</label>
                    <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-brisas-blue/30 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brisas-blue transition-colors">
                        <Plus className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Subir nuevo logo</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">PNG, JPG hasta 2MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button className="btn btn-primary px-8">Guardar cambios</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Modals */}
      <Modal 
        isOpen={isEmitModalOpen} 
        onClose={() => setIsEmitModalOpen(false)} 
        title="Emitir Puntos"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Paciente</label>
            <input 
              type="text" 
              defaultValue={selectedPatient?.name || "María López"} 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brisas-blue/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Cantidad de puntos</label>
            <input 
              type="number" 
              defaultValue="1000" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brisas-blue/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Motivo</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brisas-blue/20">
              <option>Consumo</option>
              <option>Campaña</option>
              <option>Referido</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsEmitModalOpen(false)} className="btn btn-outline flex-1">Cancelar</button>
            <button onClick={() => setIsEmitModalOpen(false)} className="btn btn-primary flex-1">Guardar</button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isRedeemModalOpen} 
        onClose={() => setIsRedeemModalOpen(false)} 
        title="Canjear Puntos"
      >
        <div className="space-y-4">
          <div className="p-4 bg-brisas-blue/5 rounded-xl border border-brisas-blue/10 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saldo actual</span>
            <span className="text-xl font-black text-brisas-blue">{selectedPatient?.points.toLocaleString()} pts</span>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Servicio a canjear</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brisas-blue/20">
              <option>Consulta general (1,200 pts)</option>
              <option>Ginecología (2,000 pts)</option>
              <option>Laboratorio básico (900 pts)</option>
            </select>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Al confirmar, se descontarán los puntos del saldo del paciente y se generará una cita pendiente de confirmación.
            </p>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsRedeemModalOpen(false)} className="btn btn-outline flex-1">Cancelar</button>
            <button onClick={() => setIsRedeemModalOpen(false)} className="btn btn-primary flex-1">Confirmar Canje</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
