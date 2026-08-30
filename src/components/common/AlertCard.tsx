import React from 'react';
import { AlertNotification } from '../../types';
import { AlertTriangle, AlertCircle, Info, MapPin, Check, Eye, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import { useToast } from '../../context/ToastContext';

interface AlertCardProps {
  alert: AlertNotification;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const navigate = useNavigate();
  const { resolveAlert, markAlertAsRead } = useAppState();
  const { addToast } = useToast();

  const handleResolve = () => {
    resolveAlert(alert.id);
    addToast('Incident Status Updated', `Marked alert "${alert.title}" as resolved.`, 'success');
  };

  const handleMarkRead = () => {
    markAlertAsRead(alert.id);
    addToast('Alert Read', 'Alert marked as acknowledged.', 'info');
  };

  const handleViewOnMap = () => {
    navigate('/map');
    addToast('Navigated to Live Map', `Focusing on ${alert.location}`, 'info');
  };

  const getSeverityTheme = () => {
    switch (alert.severity) {
      case 'critical':
        return {
          border: 'border-rose-200 bg-white hover:border-rose-300',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <AlertCircle className="w-5 h-5 text-rose-600" />,
          accent: 'border-l-4 border-l-rose-600',
        };
      case 'warning':
        return {
          border: 'border-amber-200 bg-white hover:border-amber-300',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          accent: 'border-l-4 border-l-amber-500',
        };
      case 'info':
      default:
        return {
          border: 'border-slate-200 bg-white hover:border-govblue-300',
          badge: 'bg-govblue-100 text-govblue-800 border-govblue-300',
          icon: <Info className="w-5 h-5 text-govblue-600" />,
          accent: 'border-l-4 border-l-govblue-600',
        };
    }
  };

  const theme = getSeverityTheme();

  return (
    <div
      className={`rounded-lg border p-4 shadow-card transition-all duration-200 ${theme.border} ${theme.accent} ${
        alert.isResolved ? 'opacity-65 bg-slate-50' : ''
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-slate-50 shrink-0 mt-0.5">
            {theme.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${theme.badge}`}>
                {alert.severity}
              </span>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {alert.state}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {alert.timestamp}
              </span>
              {alert.isResolved && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ Resolved
                </span>
              )}
            </div>

            <h4 className="text-sm font-bold text-navy-950">
              {alert.title}
            </h4>

            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
              {alert.message}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Location: {alert.location}</span>
              {alert.probability && (
                <span className="text-slate-400 font-mono ml-2">
                  (Disruption Risk: <strong className="text-navy-900">{alert.probability}%</strong>)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0">
          <button
            onClick={handleViewOnMap}
            className="px-2.5 py-1.5 rounded text-xs font-semibold text-navy-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1 border border-slate-200"
            title="View incident on live interactive map"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View on Map</span>
          </button>

          {!alert.isResolved ? (
            <button
              onClick={handleResolve}
              className="px-2.5 py-1.5 rounded text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-1 shadow-subtle"
              title="Resolve this alert"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Resolve</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 italic">No action needed</span>
          )}
        </div>
      </div>
    </div>
  );
};
