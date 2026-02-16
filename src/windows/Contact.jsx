import React, { useState, useRef, useEffect } from 'react';
import useWindowStore from '#store/window';
import WindowControls from "#components/WindowControls";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const { windows, focusWindow, closeWindow } = useWindowStore();
  const { isOpen, zIndex } = windows.contact || {};
  const windowRef = useRef(null);
  const headerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: false,
    message: ''
  });

  // Center window on mount
  useEffect(() => {
    if (isOpen && position.x === 0 && position.y === 0) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const windowWidth = 550;
      const windowHeight = 450;
      
      setPosition({
        x: (screenWidth - windowWidth) / 2,
        y: (screenHeight - windowHeight) / 2 - 100
      });
    }
  }, [isOpen, position.x, position.y]);

  // Dragging functionality
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleMouseDown = (e) => {
      if (e.target.closest('button')) return; // Don't drag when clicking buttons
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      focusWindow('contact');
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    header.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      header.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, position, focusWindow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: false, message: '' });

    try {
      const result = await emailjs.send(
        "service_iia929e",
        "template_4m74g5m",
        {
          to_email: "atrish07sarthak@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        "rR2Ck550bVv6azWjb"
      );

      console.log('Email sent successfully:', result);

      // Immediately reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setStatus({
        sending: false,
        success: true,
        error: false,
        message: 'Message sent successfully!'
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus({ sending: false, success: false, error: false, message: '' });
      }, 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        sending: false,
        success: false,
        error: true,
        message: 'Failed to send message. Please try again.'
      });

      // Clear error after 5 seconds
      setTimeout(() => {
        setStatus({ sending: false, success: false, error: false, message: '' });
      }, 5000);
    }
  };

  const socialLinks = [
    { name: 'Instagram', icon: '/icons/instagram.svg', url: 'https://www.instagram.com/sarthak.atrish/' },
    { name: 'Twitter', icon: '/icons/twitter.svg', url: 'https://x.com/atrish_sarthak' },
    { name: 'LinkedIn', icon: '/icons/linkedin.svg', url: 'https://www.linkedin.com/in/sarthak-atrish-b038a01ab/' },
    { name: 'GitHub', icon: '/icons/github.svg', url: 'https://github.com/atrishSarthak' }
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="fixed w-[550px] h-[450px] rounded-xl overflow-hidden shadow-2xl"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex || 10,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={() => focusWindow('contact')}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        id="window-header"
        className="h-[33px] bg-[#f6f6f6] border-b border-gray-200 flex items-center px-3 rounded-t-xl"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <WindowControls target="contact" />
        <h2 className="w-full text-center font-semibold text-sm text-gray-700">Contact</h2>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-33px)] bg-white overflow-hidden">
        <div className="h-full p-5">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="mb-4 text-center">
              <h1 className="text-xl font-semibold text-gray-900 mb-1">Get In Touch</h1>
            </div>

            {/* Contact Form */}
            <form onSubmit={sendEmail} className="flex-1 flex flex-col space-y-3">
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status.sending}
                    className="w-full px-2.5 py-1.5 text-sm rounded-md text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status.sending}
                    className="w-full px-2.5 py-1.5 text-sm rounded-md text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Row 2: Email and Subject */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status.sending}
                    className="w-full px-2.5 py-1.5 text-sm rounded-md text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={status.sending}
                    className="w-full px-2.5 py-1.5 text-sm rounded-md text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                    placeholder="Project inquiry"
                  />
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex-1">
                <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status.sending}
                  className="w-full h-full px-2.5 py-1.5 text-sm rounded-md text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all resize-none disabled:opacity-50 disabled:bg-gray-50"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.sending || status.success}
                className="w-full py-2 px-4 rounded-md text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black hover:bg-gray-800"
              >
                {status.sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : status.success ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Sent</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status.success && (
                <div className="text-center py-1.5 px-3 rounded-md bg-green-50 border border-green-200">
                  <p className="text-green-700 text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle size={14} />
                    <span>{status.message}</span>
                  </p>
                </div>
              )}
              
              {status.error && (
                <div className="text-center py-1.5 px-3 rounded-md bg-red-50 border border-red-200">
                  <p className="text-red-700 text-xs flex items-center justify-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>{status.message}</span>
                  </p>
                </div>
              )}

              {/* Social Links */}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-gray-700 bg-black border border-black"
                      title={social.name}
                    >
                      <img src={social.icon} alt={social.name} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
