import { Link } from "react-router-dom";
import { MessageCircle, Send, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://t.me/sixty4bit",
      icon: <Send size={20} />,
      label: "Telegram",
    },
    {
      href: "https://wa.me/1234567890",
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
    },
    {
      href: "https://linkedin.com/company/sixty4bit",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/sixty4bit",
      icon: <Github size={20} />,
      label: "GitHub",
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              Sixty4bitFreelancing
            </h3>
            <p className="text-muted-foreground max-w-sm">
              Professional freelancing services in web development, design, and digital marketing. 
              Helping businesses establish their digital presence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-glow"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © {currentYear} Sixty4bitFreelancing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;