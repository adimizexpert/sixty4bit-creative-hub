-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  cover_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio table
CREATE TABLE public.portfolio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create founder table
CREATE TABLE public.founder (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (blogs, services, portfolio, founder)
CREATE POLICY "Public can view published blogs" 
ON public.blogs 
FOR SELECT 
USING (published_at IS NOT NULL);

CREATE POLICY "Public can view services" 
ON public.services 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view portfolio" 
ON public.portfolio 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view founder info" 
ON public.founder 
FOR SELECT 
USING (true);

-- Contact messages can only be inserted by anyone, but not read publicly
CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on blogs
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.services (title, description, icon) VALUES
('Web Development', 'Full-stack web applications built with modern technologies like React, Next.js, and Node.js', '🌐'),
('Landing Pages', 'High-converting landing pages designed to capture leads and drive conversions', '📄'),
('Bots', 'Intelligent chatbots and automation solutions for business processes', '🤖'),
('Graphics', 'Professional graphic design for branding, social media, and marketing materials', '🎨'),
('Social Media', 'Social media management and advertising campaigns that drive engagement', '📱');

INSERT INTO public.founder (name, bio, image) VALUES
('Sixty4bit Team', 'We are a passionate team of freelancers specializing in web development, design, and digital marketing. With years of experience in delivering high-quality projects, we help businesses establish their digital presence and achieve their goals through innovative solutions.', '/founder.jpg');

INSERT INTO public.portfolio (name, description, image, link) VALUES
('E-commerce Platform', 'Modern e-commerce solution with payment integration', '/portfolio1.jpg', 'https://example.com'),
('Corporate Website', 'Professional corporate website with CMS', '/portfolio2.jpg', 'https://example.com'),
('Mobile App UI', 'Beautiful mobile app interface design', '/portfolio3.jpg', 'https://example.com'),
('Brand Identity', 'Complete brand identity design package', '/portfolio4.jpg', 'https://example.com');

INSERT INTO public.blogs (title, slug, content, cover_image, published_at) VALUES
('Getting Started with Next.js 14', 'getting-started-nextjs-14', 'Next.js 14 introduces exciting new features that make building modern web applications easier than ever. In this comprehensive guide, we will explore the new App Router, Server Components, and improved performance optimizations that make Next.js the go-to framework for React developers.', '/blog1.jpg', now()),
('The Future of Web Development', 'future-web-development', 'Web development is constantly evolving, and staying ahead of the curve is crucial for success. From AI-powered development tools to new frameworks and libraries, discover what trends will shape the industry in the coming years.', '/blog2.jpg', now()),
('Building Scalable React Applications', 'building-scalable-react-applications', 'Learn how to structure and build React applications that can grow with your business. We cover best practices for component architecture, state management, and performance optimization that will help your applications scale effectively.', '/blog3.jpg', now());