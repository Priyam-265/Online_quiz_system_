import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Send, Mail, User, MessageSquare, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setIsDark(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // 3D Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = Math.random() * 2 + 1;
      }

      update() {
        this.z -= this.vz;
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = scale * 3;

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(255, 255, 255, ${scale * 0.8})` 
          : `rgba(0, 0, 0, ${scale * 0.6})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;

    const animate = () => {
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(197, 192, 178, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const scale1 = 1000 / (1000 + p1.z);
          const scale2 = 1000 / (1000 + p2.z);
          const x1 = (p1.x - canvas.width / 2) * scale1 + canvas.width / 2;
          const y1 = (p1.y - canvas.height / 2) * scale1 + canvas.height / 2;
          const x2 = (p2.x - canvas.width / 2) * scale2 + canvas.width / 2;
          const y2 = (p2.y - canvas.height / 2) * scale2 + canvas.height / 2;
          const dist = Math.hypot(x2 - x1, y2 - y1);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${0.15 * (1 - dist / 120)})` 
              : `rgba(0, 0, 0, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         service_id: 'service_gmrh4nj',
  template_id: 'template_r3bmqme',
  user_id: '-eBSnMCPzG3wLWpP0',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Nexora Team',
          }
        })
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Message sent successfully! We\'ll get back to you soon.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const bgColor = isDark ? '#000000' : '#c5c0b2';
  const textColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const inputBorder = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
  const buttonBg = isDark ? '#ffffff' : '#000000';
  const buttonText = isDark ? '#000000' : '#ffffff';

  return (
    
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      backgroundColor: bgColor,
      color: textColor
    }}>
      <style>
{`
  @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
  .font-roslindale {
    font-family: 'Roslindale Display Condensed Medium', serif;
  }
`}
</style>

      {/* 3D Canvas Background */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Navbar */}
       <nav className="fixed w-full h-[100px] p-10 flex justify-between items-center z-50 bg-[#c5c0b2] dark:bg-black">
                <div className="site-logo font-roslindale text-3xl text-black dark:text-white uppercase">
                  <Link to="/first">Nexora</Link>
                </div>
                <div className="flex gap-7 font-roslindale text-3xl text-black dark:text-white uppercase">
                  <div className="menu-item"> <Link to="/second">Quiz</Link></div>
                  <div className="menu-item"><Link to="/Leaderboard">Leaderboard</Link></div>
                  <div className="menu-item"><Link to="/ContactPage">Contact</Link></div>
                  <div className="menu-item"><Link to="/AboutUs">About</Link></div>
                  <div className="menu-item">
                    {/* <button onClick={() => setIsDark(!isDark)}>
                      <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button> */}
                  </div>
                </div>
              </nav>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '8rem', paddingBottom: '4rem', padding: '8rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
              fontFamily: 'serif'
            }}>
              Get In Touch
            </h2>
            <div style={{
              width: '8rem',
              height: '0.25rem',
              backgroundColor: textColor,
              margin: '0 auto 1.5rem'
            }}></div>
            <p style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              opacity: 0.8,
              fontFamily: 'serif'
            }}>
              Let's create something amazing together
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '3rem'
          }}>
            {/* Contact Form */}
            <div style={{
              backgroundColor: cardBg,
              backdropFilter: 'blur(12px)',
              borderRadius: '1rem',
              padding: '2rem',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <h3 style={{
                fontSize: '1.875rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                fontFamily: 'serif'
              }}>Send Message</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Name Input */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'serif'
                  }}>Name</label>
                  <div style={{ position: 'relative' }}>
                    <User style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: textColor
                    }} size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '1rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        borderRadius: '0.5rem',
                        backgroundColor: inputBg,
                        border: `2px solid ${inputBorder}`,
                        color: textColor,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'serif'
                  }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: textColor
                    }} size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '1rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        borderRadius: '0.5rem',
                        backgroundColor: inputBg,
                        border: `2px solid ${inputBorder}`,
                        color: textColor,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'serif'
                  }}>Message</label>
                  <div style={{ position: 'relative' }}>
                    <MessageSquare style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '1rem',
                      color: textColor
                    }} size={20} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Your message..."
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '1rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        borderRadius: '0.5rem',
                        backgroundColor: inputBg,
                        border: `2px solid ${inputBorder}`,
                        color: textColor,
                        outline: 'none',
                        resize: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                </div>

                {/* Status Message */}
                {status.message && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: status.type === 'success' ? cardBg : cardBg,
                    border: `1px solid ${borderColor}`
                  }}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <p style={{ fontSize: '0.875rem', fontFamily: 'serif' }}>{status.message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    backgroundColor: buttonBg,
                    color: buttonText,
                    fontWeight: '500',
                    padding: '1rem 1.5rem',
                    borderRadius: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    border: 'none',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                    fontFamily: 'serif'
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Info & 3D Element */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Info Card */}
              <div style={{
                backgroundColor: cardBg,
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '2rem',
                border: `1px solid ${borderColor}`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}>
                <h3 style={{
                  fontSize: '1.875rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  fontFamily: 'serif'
                }}>Contact Info</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Mail color={textColor} size={24} />
                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      opacity: 0.7,
                      fontFamily: 'serif'
                    }}>Email</p>
                    <p style={{
                      fontSize: '1.125rem',
                      fontWeight: '500',
                      fontFamily: 'serif'
                    }}>contact@nexora.com</p>
                  </div>
                </div>
              </div>

              {/* 3D Coding Visual */}
              <div style={{
                backgroundColor: cardBg,
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '2rem',
                border: `1px solid ${borderColor}`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
                position: 'relative',
                height: '16rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '6rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: textColor,
                    fontFamily: 'serif'
                  }}>
                    &lt;/&gt;
                  </div>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'serif'
                  }}>Coding Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;