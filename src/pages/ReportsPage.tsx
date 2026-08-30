import React, { useState } from 'react';
import { REPORTS_DATA } from '../data/reportsData';
import { ReportItem } from '../types';
import { AIBadge } from '../components/common/AIBadge';
import { Modal } from '../components/common/Modal';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileText, 
  Download, 
  Printer, 
  Sparkles, 
  FileSpreadsheet, 
  Eye
} from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';
import { useToast } from '../context/ToastContext';

export const ReportsPage: React.FC = () => {
  const [reports] = useState<ReportItem[]>(REPORTS_DATA);
  const [previewReport, setPreviewReport] = useState<ReportItem | null>(null);
  const { t } = useLanguage();
  const { addToast } = useToast();

  const handleGenerateReport = (rep: ReportItem) => {
    addToast('Generating SITREP', `Compiling telemetry datasets for ${rep.title}...`, 'info');
    setTimeout(() => {
      setPreviewReport(rep);
      addToast('Report Ready', `${rep.title} successfully compiled with latest sensor data.`, 'success');
    }, 600);
  };

  const handleExportPDF = (rep: ReportItem) => {
    addToast('PDF Export Initialized', `Preparing printable high-resolution SITREP for ${rep.title}`, 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleExportCSV = (rep: ReportItem) => {
    exportToCSV(rep.title.replace(/[^a-zA-Z0-9]/g, '_'), [
      {
        ReportID: rep.id,
        Title: rep.title,
        Category: rep.category,
        Frequency: rep.frequency,
        Scope: rep.scope,
        GeneratedAt: new Date().toISOString(),
        SecurityLevel: 'OFFICIAL USE ONLY',
      },
    ]);
    addToast('CSV Downloaded', `${rep.title} raw data downloaded.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('reports.title', 'Strategic Reports & SITREP Center')}
            </h1>
            <AIBadge label="Official SITREP Standard" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('reports.subtitle', 'Automated executive intelligence briefs, high-risk corridor audits, and disaster logistics sitreps.')}
          </p>
        </div>

        <button
          onClick={() => handleGenerateReport(reports[0])}
          className="px-4 py-2 rounded-lg bg-govblue-700 hover:bg-govblue-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-subtle cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span>{t('reports.instantSitrep', 'Generate Instant 24h SITREP')}</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-card hover:shadow-elevated hover:border-govblue-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-govblue-50 text-govblue-800 border border-govblue-200 font-mono">
                  {report.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {report.frequency}
                </span>
              </div>

              <h3 className="text-sm font-bold text-navy-950 mb-2 leading-snug">
                {report.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {report.description}
              </p>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4 text-[11px] text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Last Compiled:</span>
                  <strong className="text-navy-900 font-mono">{report.lastGenerated}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Scope:</span>
                  <span className="text-slate-700 font-medium">{report.scope}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payload Size:</span>
                  <span className="text-slate-500 font-mono">{report.fileSize}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setPreviewReport(report)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('reports.preview', 'Preview')}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleExportCSV(report)}
                  className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:text-navy-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Export CSV raw data"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  onClick={() => handleExportPDF(report)}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-navy-900 hover:bg-govblue-700 transition-colors flex items-center gap-1 shadow-subtle cursor-pointer"
                  title="Export Official PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('reports.pdf', 'PDF')}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview Modal */}
      {previewReport && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewReport(null)}
          title={`SITREP Preview: ${previewReport.title}`}
          subtitle={`North Eastern Council Logistics Intelligence • Classification: OFFICIAL USE ONLY`}
          maxWidth="3xl"
          footer={
            <>
              <button
                onClick={() => setPreviewReport(null)}
                className="px-4 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                {t('common.close', 'Close')}
              </button>
              <button
                onClick={() => handleExportCSV(previewReport)}
                className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-navy-900 bg-white border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('reports.csv', 'Export CSV')}</span>
              </button>
              <button
                onClick={() => handleExportPDF(previewReport)}
                className="px-4 py-1.5 rounded-md text-xs font-semibold text-white bg-govblue-700 hover:bg-govblue-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </>
          }
        >
          <div className="space-y-4 text-xs font-sans">
            {/* Government Letterhead Header */}
            <div className="text-center pb-4 border-b-2 border-navy-900">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Government of India / NEC</div>
              <div className="text-base font-black text-navy-950 font-serif uppercase tracking-wide mt-0.5">
                North Eastern Region Logistics & Disaster Accessibility Command
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                INTELLIGENCE SITREP #{previewReport.id.toUpperCase()} • DATE: {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h4 className="font-bold text-navy-950 uppercase tracking-wider text-xs mb-1">
                1. Executive Operational Summary
              </h4>
              <p className="text-slate-700 leading-relaxed">
                During the last 24-hour reporting period, severe precipitation events across the Eastern Himalayan basin have generated 17 active corridor disruptions, with 4 critical bottlenecks requiring heavy earthmoving clearance. The overall regional accessibility index stands at <strong>78.4%</strong>. Primary arterial throughput along NH-10 and NH-13 remains throttled to priority military and emergency relief freights.
              </p>
            </div>

            {/* Key Metrics Table in SITREP */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-navy-950 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Key Metric</th>
                    <th className="p-2">Current Value</th>
                    <th className="p-2">Benchmark</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="p-2">Regional Accessibility Index</td>
                    <td className="p-2 font-mono font-bold text-navy-900">78.4%</td>
                    <td className="p-2 font-mono text-slate-500">85.0% Target</td>
                    <td className="p-2 text-amber-700 font-semibold">Moderate Degraded</td>
                  </tr>
                  <tr>
                    <td className="p-2">Average Route Delay</td>
                    <td className="p-2 font-mono font-bold text-rose-600">+34 mins</td>
                    <td className="p-2 font-mono text-slate-500">&lt; 15 mins</td>
                    <td className="p-2 text-rose-700 font-semibold">Elevated Transit Risk</td>
                  </tr>
                  <tr>
                    <td className="p-2">Critical Infrastructure Uptime</td>
                    <td className="p-2 font-mono font-bold text-emerald-600">91.0%</td>
                    <td className="p-2 font-mono text-slate-500">90.0% Min</td>
                    <td className="p-2 text-emerald-700 font-semibold">Within Tolerance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Strategic Directives */}
            <div>
              <h4 className="font-bold text-navy-950 uppercase tracking-wider text-xs mb-1">
                2. Immediate Strategic Directives
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Pre-position 50 MT grain buffer at Rangpo before next cloudburst cycle.</li>
                <li>Operate continuous one-way convoy control at Bhalukpong Km 42 slip zone.</li>
                <li>Activate Kalaktang-Shergaon bypass for non-military commercial cargo.</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
