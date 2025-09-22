import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Portfolio {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase.from("portfolio").select("*");
      if (data) setPortfolio(data);
    };

    fetchPortfolio();
  }, []);

  const categories = ["All", "Web Development", "Design", "E-commerce", "Mobile"];
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-primary border-primary/20 bg-primary/10">
              ✨ Our Portfolio
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Showcasing Our
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Best Work
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our collection of successful projects and see how we've helped businesses 
              achieve their digital goals through innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-gradient-primary hover:shadow-glow"
                    : "border-primary/20 hover:bg-primary/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
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
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </a>
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Project Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      Web Development
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      React
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:bg-primary/10 p-0 group-hover:translate-x-1 transition-transform duration-300"
                    asChild
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Details <ArrowRight className="ml-1 w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Projects Completed" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
              { value: "2+", label: "Years of Experience" },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                content: "Sixty4bitFreelancing delivered an exceptional website that perfectly captures our brand. The attention to detail and professionalism was outstanding.",
              },
              {
                name: "Mike Chen", 
                role: "Founder, EcoShop",
                content: "The e-commerce platform they built for us increased our sales by 150%. Their expertise in both design and development is remarkable.",
              },
              {
                name: "Lisa Williams",
                role: "Marketing Director, GrowthCo",
                content: "Working with this team was a pleasure. They understood our vision and brought it to life beyond our expectations. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <Card 
                key={testimonial.name} 
                className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's work together to bring your vision to life. Contact us today to discuss your project 
            and see how we can help you achieve your goals.
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

export default Portfolio;