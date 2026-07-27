import React, { useState } from 'react';
import { contactInfo } from '../portfolio';
import { SocialMedia } from './SocialMedia';
import { MapPin, Phone, Mail, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { soundFx } from '../utils/audio';

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      soundFx.playWarp();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section className="cohesion-section contact-section" id="contact">
      <div className="cohesion-cta-banner">
        <motion.div
          className="cta-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cohesion-tag">
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="cohesion-cta-title">
            Have a project in mind? <br />
            <span className="title-gradient">Let's build something extraordinary.</span>
          </h2>

          <p className="cohesion-cta-subtitle">{contactInfo.subtitle}</p>

          {contactInfo.isHireable && (
            <div className="opportunity-badge">
              <CheckCircle2 size={16} className="badge-icon" />
              <span>Available for Immediate Onboarding: Yes</span>
            </div>
          )}

          <div className="contact-margin-top">
            {contactInfo.location_address && (
              <div className="contact-info-row">
                <MapPin size={18} className="contact-icon" />
                <span>{contactInfo.location_address}</span>
              </div>
            )}
            {contactInfo.number && (
              <div className="contact-info-row">
                <Phone size={18} className="contact-icon" />
                <a
                  href={`tel:${contactInfo.number}`}
                  className="masked-phone-link"
                  onMouseEnter={() => setIsPhoneHovered(true)}
                  onMouseLeave={() => setIsPhoneHovered(false)}
                  title="Hover to reveal full phone number"
                >
                  {isPhoneHovered ? (
                    <span className="phone-unmasked">+91 8809955064 ✨</span>
                  ) : (
                    <span className="phone-masked">
                      <strong className="visible-digits">+91 8809</strong>
                      <span className="masked-dots">••••••</span>
                      <span className="reveal-hint">(hover to reveal)</span>
                    </span>
                  )}
                </a>
              </div>
            )}
            {contactInfo.email_address && (
              <div className="contact-info-row">
                <Mail size={18} className="contact-icon" />
                <a href={`mailto:${contactInfo.email_address}`}>{contactInfo.email_address}</a>
              </div>
            )}
          </div>

          <div className="contact-social">
            <SocialMedia />
          </div>
        </motion.div>

        <motion.form
          className="cohesion-contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Tejaswi Dubey"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Project Details</label>
            <textarea
              placeholder="Tell me about your vision, goals, and timeline..."
              rows="4"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="main-button cohesion-submit-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Send Direct Message</span>
            <Send size={16} />
          </motion.button>

          {submitted && (
            <motion.p
              className="form-success-msg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Message received! I'll respond within 24 hours. ✨
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};
