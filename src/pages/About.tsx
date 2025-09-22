import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Award, Clock, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Founder {
  id: string;
  name: string;
  bio: string;
  image: string;
}

const About = () => {
  const [founder, setFounder] = useState<Founder | null>(null);

  useEffect(() => {
    const fetchFounder = async () => {
      const { data } = await supabase.from("founder").select("*").single();
      if (data) setFounder(data);
    };

    fetchFounder();
  }, []);

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "50+", label: "Happy Clients" },
    { icon: <Award className="w-6 h-6" />, value: "100+", label: "Projects Completed" },
    { icon: <Clock className="w-6 h-6" />, value: "2+", label: "Years Experience" },
    { icon: <Target className="w-6 h-6" />, value: "98%", label: "Success Rate" },
  ];

  const values = [
    {
      title: "Quality First",
      description: "We never compromise on quality. Every project is crafted with attention to detail and modern best practices.",
    },
    {
      title: "Innovation",
      description: "We stay ahead of the curve by adopting the latest technologies and innovative approaches to problem-solving.",
    },
    {
      title: "Client-Centric",
      description: "Your success is our success. We work closely with you to understand your needs and exceed expectations.",
    },
    {
      title: "Reliability",
      description: "Count on us to deliver on time, every time. We value your trust and work hard to maintain it.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-primary border-primary/20 bg-primary/10">
              ✨ About Sixty4bitFreelancing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Passionate About Creating
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a dedicated team of freelancers who believe in the power of great design 
              and development to transform businesses and create meaningful digital experiences.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="text-center hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      {founder && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <div className="aspect-square bg-gradient-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary/50">
                      {founder.name.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                </div>
                
                <div className="animate-slide-up">
                  <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
                  <h3 className="text-xl font-semibold text-primary mb-4">{founder.name}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {founder.bio}
                  </p>
                  <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <Link to="/contact">
                      Work With Us <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and help us deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's collaborate and bring your vision to life. We're excited to hear about your project 
              and show you what we can achieve together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Link to="/contact">
                  Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;