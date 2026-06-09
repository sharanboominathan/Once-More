import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactButtons = [
  { label: 'Leave a message', href: '/#contact' },
  { label: 'Send a mail', href: 'mailto:oncemorephotography@gmail.com' },
  { label: 'Give us a call', href: 'tel:+919677006647' },
];

const otherPages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Wedding Films', href: '/#wedding-film' },
  { label: 'Live Streaming', href: '/#live-streaming' },
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
          If you are looking to work with us please refer one of the following methods to contact us.
        </p>
        <div className="footer-animate flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
          {contactButtons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className="w-full sm:w-auto min-w-[220px] text-center border border-warm-champagne/40 text-warm-cream px-10 py-4 text-cta uppercase font-body transition-all duration-300 hover:border-warm-champagne hover:text-warm-champagne"
            >
              {btn.label}
            </a>
          ))}
        </div>
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
