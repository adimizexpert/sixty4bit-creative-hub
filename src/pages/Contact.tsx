import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send, Mail, MapPin, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          project_type: formData.get("project_type") as string,
          message: formData.get("message") as string,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "hello@sixty4bitfreelancing.com",
      href: "mailto:hello@sixty4bitfreelancing.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Remote & Worldwide",
      href: null,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-primary border-primary/20 bg-primary/10">
              ✨ Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Discuss Your
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Next Project
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to bring your vision to life? We'd love to hear about your project and discuss 
              how we can help you achieve your goals. Get in touch with us today!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="hover:shadow-elegant transition-all duration-300 animate-fade-in">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          required
                          className="focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_type">Project Type *</Label>
                      <Select name="project_type" required>
                        <SelectTrigger className="focus:ring-primary focus:border-primary">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="landing-page">Landing Page</SelectItem>
                          <SelectItem value="bot-development">Bot Development</SelectItem>
                          <SelectItem value="graphics-design">Graphics Design</SelectItem>
                          <SelectItem value="social-media">Social Media Management</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                        rows={6}
                        required
                        className="focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Quick Actions */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="hover:shadow-elegant transition-all duration-300 animate-scale-in">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-start space-x-3">
                        <div className="text-primary mt-1">{info.icon}</div>
                        <div>
                          <div className="font-medium text-sm text-muted-foreground">{info.label}</div>
                          {info.href ? (
                            <a 
                              href={info.href} 
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-foreground">{info.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="hover:shadow-elegant transition-all duration-300 animate-scale-in [animation-delay:0.1s]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Need immediate assistance? Reach out to us directly through these channels.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      asChild 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <a 
                        href="https://wa.me/1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <MessageCircle className="mr-2 w-4 h-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      <a 
                        href="https://t.me/sixty4bit" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Send className="mr-2 w-4 h-4" />
                        Telegram
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="hover:shadow-elegant transition-all duration-300 animate-scale-in [animation-delay:0.2s]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Response within 24 hours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Free consultation call</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Detailed project proposal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Transparent pricing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary depending on complexity, but most projects are completed within 2-6 weeks. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you work with international clients?",
                answer: "Yes! We work with clients worldwide and are comfortable working across different time zones. Most of our communication happens online.",
              },
              {
                question: "What's included in your web development service?",
                answer: "Our web development includes design, development, responsive optimization, basic SEO, testing, and deployment. We also provide ongoing support if needed.",
              },
              {
                question: "Can you help with existing projects?",
                answer: "Absolutely! We can help improve, redesign, or add features to existing websites and applications. We'll assess your current setup and recommend the best approach.",
              },
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-primary">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;