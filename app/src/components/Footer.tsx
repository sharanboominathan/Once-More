import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const otherPages = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact Us', href: '/#contact' },
];

const services = [
  'Wedding Photography',
  'Engagement Shoots',
  'Outdoor Shoots',
  'Model Shoots',
  'Maternity/ Baby shower Photography',
  'Birthday Celebrations',
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/oncemore.photography/' },
  { label: 'Facebook', href: 'https://www.facebook.com/Oncemorephotography/' },
  { label: 'Youtube', href: 'https://www.youtube.com/channel/UC9SQjaJOBO3kRaie75kWRmg' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = footerRef.current?.querySelectorAll('.footer-animate');
      if (elements) {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="bg-pure-black">
      {/* Contact CTA */}
      <div className="container-padding pt-section pb-0 max-content">
        <div className="footer-animate text-center">
          <span className="text-caption text-warm-champagne">CONNECT WITH US</span>
        </div>
        <h3 className="footer-animate text-display-m text-warm-cream text-center max-w-[700px] mx-auto mt-6">
          Let us capture the best moments in your life for you
        </h3>
        <p className="footer-animate text-body-l text-warm-white/60 text-center mt-4">
          Fill out the form below or reach out via email/phone, and we will get back to you shortly.
        </p>
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="footer-animate max-w-[600px] mx-auto mt-12 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="name" className="text-caption text-warm-champagne mb-2">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-pure-black border border-warm-champagne/20 text-warm-cream px-4 py-3 focus:outline-none focus:border-warm-champagne focus:ring-1 focus:ring-warm-champagne transition-all duration-300 rounded"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="email" className="text-caption text-warm-champagne mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="Your Email"
                className="w-full bg-pure-black border border-warm-champagne/20 text-warm-cream px-4 py-3 focus:outline-none focus:border-warm-champagne focus:ring-1 focus:ring-warm-champagne transition-all duration-300 rounded"
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="phone" className="text-caption text-warm-champagne mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              placeholder="Your Phone Number"
              className="w-full bg-pure-black border border-warm-champagne/20 text-warm-cream px-4 py-3 focus:outline-none focus:border-warm-champagne focus:ring-1 focus:ring-warm-champagne transition-all duration-300 rounded"
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="message" className="text-caption text-warm-champagne mb-2">Message</label>
            <textarea
              id="message"
              required
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="How can we help you?"
              className="w-full bg-pure-black border border-warm-champagne/20 text-warm-cream px-4 py-3 focus:outline-none focus:border-warm-champagne focus:ring-1 focus:ring-warm-champagne transition-all duration-300 rounded resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-center border border-warm-champagne text-warm-champagne px-10 py-4 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-pure-black disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitted && (
            <p className="text-center text-warm-champagne text-body-l mt-4 animate-fade-in">
              Thank you! Your message has been sent successfully. We'll be in touch!
            </p>
          )}
        </form>
      </div>

      {/* Footer Info Grid */}
      <div className="container-padding mt-24 pt-16 max-content border-t border-warm-champagne/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Address */}
          <div className="footer-animate">
            <h4 className="text-caption text-warm-champagne mb-6">OUR ADDRESS</h4>
            <div className="text-body text-warm-white/70 leading-[1.8]">
              <p className="font-medium text-warm-cream">Once More Photography</p>
              <p>No.2451, LIG - 2,</p>
              <p>3rd main road, Mathur, MMDA</p>
              <p>Chennai - 600068.</p>
              <p className="mt-4">
                <a href="mailto:oncemorephotography@gmail.com" className="hover:text-warm-champagne transition-colors">
                  oncemorephotography@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+919677006647" className="hover:text-warm-champagne transition-colors">
                  +91 96770 06647
                </a>
              </p>
            </div>
          </div>

          {/* Other Pages */}
          <div className="footer-animate">
            <h4 className="text-caption text-warm-champagne mb-6">OTHER PAGES</h4>
            <ul className="space-y-3">
              {otherPages.map((page) => (
                <li key={page.label}>
                  <Link
                    to={page.href}
                    className="text-body text-warm-white/70 hover:text-warm-champagne transition-colors duration-300"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-animate">
            <h4 className="text-caption text-warm-champagne mb-6">OUR SERVICES</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-body text-warm-white/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer-animate">
            <h4 className="text-caption text-warm-champagne mb-6">SOCIAL PROFILES</h4>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-warm-white/70 hover:text-warm-champagne transition-colors duration-300"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-padding mt-16 pt-6 pb-8 max-content border-t border-warm-champagne/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-caption text-muted-taupe/50">
            Copyrights &copy; 2024 Oncemore Photography. All Rights Reserved
          </span>
          <span className="text-caption text-muted-taupe/50">
            Developed with care
          </span>
        </div>
      </div>
    </footer>
  );
}
