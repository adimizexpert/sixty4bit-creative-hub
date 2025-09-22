import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  published_at: string;
  created_at: string;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      const { data: blogData } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (blogData) {
        setBlog(blogData);
        
        // Fetch related blogs (excluding current blog)
        const { data: relatedData } = await supabase
          .from("blogs")
          .select("*")
          .not("published_at", "is", null)
          .neq("id", blogData.id)
          .order("published_at", { ascending: false })
          .limit(3);
        
        if (relatedData) setRelatedBlogs(relatedData);
      }
      
      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="hover:bg-primary/10">
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-primary border-primary/20 bg-primary/10">
              Blog Article
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-muted-foreground mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.published_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{getReadingTime(blog.content)} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Cover */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-primary/10 rounded-2xl flex items-center justify-center animate-scale-in">
              <div className="text-8xl font-bold text-primary/50">
                {blog.title.split(' ').map(word => word[0]).join('').substring(0, 3)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none animate-fade-in">
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Article Footer */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Inspired by what you've read? Let's discuss your project and see how we can help 
                  bring your vision to life with our expertise and passion.
                </p>
                <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Link to="/contact">
                    Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-gradient-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Articles</h2>
              <p className="text-xl text-muted-foreground">
                Continue reading with these related blog posts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedBlogs.map((relatedBlog, index) => (
                <Card 
                  key={relatedBlog.id} 
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-gradient-primary/10 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/50">
                      {relatedBlog.title.split(' ').map(word => word[0]).join('').substring(0, 3)}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 leading-tight group-hover:text-primary transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {relatedBlog.content.substring(0, 120)}...
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(relatedBlog.published_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{getReadingTime(relatedBlog.content)} min</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:bg-primary/10 p-0 group-hover:translate-x-1 transition-transform duration-300"
                      asChild
                    >
                      <Link to={`/blog/${relatedBlog.slug}`}>
                        Read More <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;