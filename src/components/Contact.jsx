import React, { useState } from 'react';
import { contactInfo } from '../portfolio';
import { SocialMedia } from './SocialMedia';
import { ContactIllustration } from '../assets/svg/ContactIllustration';
import { MapPin, Phone, Mail, CheckCircle2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section className="main contact-section" id="contact">
      <div className="contact-div-main">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="heading contact-title">{contactInfo.title}</h1>
          <p className="subTitle contact-subtitle">{contactInfo.subtitle}</p>

          {contactInfo.isHireable && (
            <motion.div
              className="opportunity-badge"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle2 size={18} className="badge-icon" />
              <span>Open for opportunities: Yes</span>
            </motion.div>
          )}

          <div className="contact-margin-top">
            {contactInfo.location_address && (
              <div className="contact-info-row">
                <MapPin size={20} className="contact-icon" />
                <span>{contactInfo.location_address}</span>
              </div>
            )}
            {contactInfo.number && (
              <div className="contact-info-row">
                <Phone size={20} className="contact-icon" />
                <a href={`tel:${contactInfo.number}`}>{contactInfo.number}</a>
              </div>
            )}
            {contactInfo.email_address && (
              <div className="contact-info-row">
                <Mail size={20} className="contact-icon" />
                <a href={`mailto:${contactInfo.email_address}`}>{contactInfo.email_address}</a>
              </div>
            )}
          </div>

          <div className="contact-social">
            <SocialMedia />
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message..."
                rows="4"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="main-button send-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} style={{ marginRight: '8px' }} />
              Send Message
            </motion.button>
            {submitted && (
              <motion.p
                className="form-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you! Your message has been sent successfully. ✨
              </motion.p>
            )}
          </form>
        </motion.div>

        <motion.div
          className="contact-image-div"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <ContactIllustration />
        </motion.div>
      </div>
    </section>
  );
};

