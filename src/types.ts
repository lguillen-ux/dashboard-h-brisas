import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';

export type Section = 'dashboard' | 'pacientes' | 'wallet' | 'citas' | 'reportes' | 'config';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  points: number;
  lastAppointment: string;
  lastService: string;
}

export interface Transaction {
  id: string;
  patientId: string;
  patientName: string;
  type: 'emision' | 'canje';
  points: number;
  reason: string;
  date: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  service: string;
  dateTime: string;
  status: 'confirmada' | 'pendiente' | 'completada';
  origin: string;
}

export const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'María López', phone: '+507 6000-0000', points: 3400, lastAppointment: '15/03', lastService: 'Consulta general' },
  { id: '2', name: 'Carlos Díaz', phone: '+507 6000-1111', points: 1800, lastAppointment: '20/03', lastService: 'Laboratorio' },
  { id: '3', name: 'Ana Torres', phone: '+507 6000-2222', points: 2100, lastAppointment: '22/03', lastService: 'Ginecología' },
  { id: '4', name: 'Roberto Ruiz', phone: '+507 6000-3333', points: 500, lastAppointment: '10/02', lastService: 'Consulta general' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', patientId: '1', patientName: 'María López', type: 'emision', points: 1500, reason: 'Consumo en laboratorio', date: '20/03' },
  { id: 't2', patientId: '1', patientName: 'María López', type: 'canje', points: 1200, reason: 'Consulta general', date: '10/03' },
  { id: 't3', patientId: '2', patientName: 'Carlos Díaz', type: 'canje', points: 1800, reason: 'Consulta ginecología', date: '18/03' },
  { id: 't4', patientId: '3', patientName: 'Ana Torres', type: 'emision', points: 900, reason: 'Campaña Marzo', date: '28/03' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', patientId: '1', patientName: 'María López', service: 'Consulta general', dateTime: '01/04 10:30', status: 'confirmada', origin: 'Canje de puntos' },
  { id: 'a2', patientId: '2', patientName: 'Carlos Díaz', service: 'Ginecología', dateTime: '02/04 15:00', status: 'pendiente', origin: 'Campaña' },
  { id: 'a3', patientId: '3', patientName: 'Ana Torres', service: 'Laboratorio', dateTime: '05/04 09:00', status: 'confirmada', origin: 'Canje de puntos' },
];

export const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pacientes', label: 'Pacientes', icon: Users },
  { id: 'wallet', label: 'Wallet de Puntos', icon: Wallet },
  { id: 'citas', label: 'Citas', icon: Calendar },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
  { id: 'config', label: 'Configuración', icon: Settings },
] as const;
