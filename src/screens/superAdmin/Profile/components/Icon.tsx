import React from 'react';
import {
  AlertTriangle,
  Bell,
  Building2,
  Calendar,
  Camera,
  ChevronRight,
  Clock,
  Code2,
  Edit3,
  Eye,
  FileText,
  Globe2,
  HelpCircle,
  Info,
  Link2,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  Moon,
  Phone,
  RefreshCw,
  Shield,
  ShieldCheck,
  Smartphone,
  Ticket,
  User,
  Users,
  Wrench,
  BarChart3,
} from 'lucide-react-native';

const icons: Record<string, any> = {
  alert: AlertTriangle,
  bell: Bell,
  building: Building2,
  calendar: Calendar,
  camera: Camera,
  chevron: ChevronRight,
  clock: Clock,
  code: Code2,
  edit: Edit3,
  eye: Eye,
  file: FileText,
  globe: Globe2,
  help: HelpCircle,
  info: Info,
  link: Link2,
  lock: Lock,
  logout: LogOut,
  mail: Mail,
  megaphone: Megaphone,
  moon: Moon,
  phone: Phone,
  refresh: RefreshCw,
  shield: Shield,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
  ticket: Ticket,
  user: User,
  users: Users,
  wrench: Wrench,
  chart: BarChart3,
};

type Props = {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const Icon = ({name, size = 18, color = '#23263A', strokeWidth = 2}: Props) => {
  const Component = icons[name] || Info;
  return <Component size={size} color={color} strokeWidth={strokeWidth} />;
};
