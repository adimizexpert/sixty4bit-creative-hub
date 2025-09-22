import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Bot, Globe, Smartphone, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*");
      if (data) setServices(data);
    };

    fetchServices();
  }, []);

  const iconMap: Record<string, JSX.Element> = {
    "🌐": <Globe className="w-8 h-8" />,
    "📄": <Code className="w-8 h-8" />,
    "🤖": <Bot className="w-8 h-8" />,
    "🎨": <Palette className="w-8 h-8" />,
    "📱": <Smartphone className="w-8 h-8" />,
  };

  const serviceDetails = {
    "Web Development": {
      features: [
        "Custom Web Applications",
        "E-commerce Solutions",
        "Content Management Systems",
        "API Development & Integration",
        "Database Design & Optimization",
        "Performance Optimization",
      ],
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "AWS"],
    },
    "Landing Pages": {
      features: [
        "High-Converting Designs",
        "Mobile-First Approach",
        "SEO Optimization",
        "A/B Testing Setup",
        "Analytics Integration",
        "Lead Capture Forms",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Framer Motion"],
    },
    "Bots": {
      features: [
        "Chatbot Development",
        "Telegram Bot Creation",
        "Discord Bot Development", 
        "WhatsApp Business Integration",
        "AI-Powered Responses",
        "Custom Automation Scripts",
      ],
      technologies: ["Python", "Node.js", "Telegram API", "Discord.js", "OpenAI API", "Webhooks"],
    },
    "Graphics": {
      features: [
        "Brand Identity Design",
        "Logo Creation",
        "Social Media Graphics",
        "Marketing Materials",
        "UI/UX Design",
        "Print Design",
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Canva Pro", "Sketch", "InVision", "Principle"],
    },
    "Social Media": {
      features: [
        "Social Media Strategy",
        "Content Creation",
        "Paid Advertising Campaigns",
        "Community Management",
        "Analytics & Reporting",
        "Influencer Outreach",
      ],
      technologies: ["Facebook Ads", "Google Ads", "Instagram", "LinkedIn", "Twitter", "TikTok"],
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-primary border-primary/20 bg-primary/10">
              ✨ Our Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Digital Solutions
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                For Your Business
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From web development to digital marketing, we provide end-to-end solutions 
              that help your business thrive in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    {iconMap[service.icon] || <Globe className="w-8 h-8" />}
                  </div>
                  <h3 className="font-semibold text-xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Details</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore what's included in each service and the technologies we use to deliver exceptional results.
            </p>
          </div>

          <Tabs defaultValue="Web Development" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              {services.map((service) => (
                <TabsTrigger key={service.id} value={service.title} className="text-sm">
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => {
              const details = serviceDetails[service.title as keyof typeof serviceDetails];
              return (
                <TabsContent key={service.id} value={service.title} className="animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-xl mb-4 text-primary">What's Included</h3>
                        <ul className="space-y-3">
                          {details?.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-xl mb-4 text-primary">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {details?.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-6">
                          <p className="text-muted-foreground mb-4">
                            We use cutting-edge technologies and industry best practices to ensure your project is built to last and perform at its best.
                          </p>
                          <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                            <Link to="/contact">
                              Get Started <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We follow a proven process to ensure your project is delivered on time, within budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "We start by understanding your goals, requirements, and target audience." },
              { step: "02", title: "Planning", description: "We create a detailed project plan with timelines, milestones, and deliverables." },
              { step: "03", title: "Development", description: "Our team brings your vision to life using the latest technologies and best practices." },
              { step: "04", title: "Launch", description: "We deploy your project and provide ongoing support to ensure everything runs smoothly." },
            ].map((phase, index) => (
              <Card 
                key={phase.step} 
                className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-4">{phase.step}</div>
                  <h3 className="font-semibold text-lg mb-3">{phase.title}</h3>
                  <p className="text-muted-foreground text-sm">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your project and find the perfect solution for your business needs. 
            Contact us today for a free consultation.
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-6 hover:shadow-lg transition-all duration-300"
          >
            <Link to="/contact">
              Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;