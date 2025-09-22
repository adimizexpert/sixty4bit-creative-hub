import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Palette, Bot, Globe, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Portfolio {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const Index = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [servicesRes, portfolioRes] = await Promise.all([
        supabase.from("services").select("*").limit(4),
        supabase.from("portfolio").select("*").limit(3),
      ]);
      
      if (servicesRes.data) setServices(servicesRes.data);
      if (portfolioRes.data) setPortfolio(portfolioRes.data);
    };

    fetchData();
  }, []);

  const iconMap: Record<string, JSX.Element> = {
    "🌐": <Globe className="w-8 h-8" />,
    "📄": <Code className="w-8 h-8" />,
    "🤖": <Bot className="w-8 h-8" />,
    "🎨": <Palette className="w-8 h-8" />,
    "📱": <Smartphone className="w-8 h-8" />,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
        
        <div className="container mx-auto px-4 text-center z-10 animate-fade-in">
          <Badge 
            variant="secondary" 
            className="mb-6 text-primary border-primary/20 bg-primary/10 animate-float"
          >
            ✨ Professional Freelancing Services
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
            Build Your Digital
            <br />
            <span className="text-foreground">Future Today</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up [animation-delay:0.2s]">
            We create stunning websites, powerful applications, and effective digital solutions 
            that help your business thrive in the modern world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:0.4s]">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
            >
              <Link to="/contact">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-primary/20 hover:bg-primary/10 text-lg px-8 py-6"
            >
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From web development to digital marketing, we offer comprehensive solutions 
              for your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    {iconMap[service.icon] || <Globe className="w-8 h-8" />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/10"
            >
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take a look at some of our recent projects and see how we've helped 
              businesses achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-primary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary/20 group-hover:bg-gradient-primary/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/50">
                      {project.name.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:bg-primary/10 p-0"
                    asChild
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project <ArrowRight className="ml-1 w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/10"
            >
              <Link to="/portfolio">
                View All Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your ideas and create something amazing together. 
            Get in touch with us today for a free consultation.
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

export default Index;
