import React, { useState } from 'react';
import { X, FileText, Download, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { greeting, contactInfo } from '../portfolio';
import { soundFx } from '../utils/audio';

export const ResumeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(contactInfo.email_address || 'tejaswi.demo@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <div className="modal-title-wrap">
            <FileText size={22} className="modal-icon" />
            <h3>Tejaswi Dubey — Resume &amp; Profile</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="resume-modal-body">
          <div className="resume-summary-box">
            <h4>Full Stack &amp; 3D Web Developer</h4>
            <p>Pondicherry University • Puducherry, India</p>
            <p className="resume-desc-text">{greeting.subTitle}</p>
          </div>

          <div className="resume-quick-actions">
            <a
              href={greeting.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-action-btn primary"
              onClick={() => soundFx.playWarp()}
            >
              <Download size={18} />
              <span>Download Full CV (PDF)</span>
              <ExternalLink size={14} />
            </a>

            <button className="resume-action-btn secondary" onClick={handleCopyEmail}>
              {copied ? <Check size={18} color="#22c55e" /> : <Copy size={18} />}
              <span>{copied ? 'Email Copied!' : 'Copy Contact Email'}</span>
            </button>
          </div>

          <div className="resume-contact-card">
            <Mail size={18} />
            <span>Direct Email: <strong>{contactInfo.email_address}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
