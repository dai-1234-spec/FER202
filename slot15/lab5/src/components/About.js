import React, { useState, useEffect } from 'react';
import { ChefHat, Heart, Users, Star, Mail, ArrowRight, Instagram, Facebook, Twitter, Award, Clock, MapPin } from 'lucide-react';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';

const About = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsVisible(true), 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    {
      name: "Chef Maria Santos",
      role: "Head Chef & Founder",
      icon: <ChefHat className="w-6 h-6" />,
      bio: "Master chef with 15+ years creating unforgettable celebration meals",
      color: "text-danger",
      skills: ["Traditional Recipes", "Innovation", "Quality Control"],
      image: "🧑‍🍳"
    },
    {
      name: "David Kim",
      role: "Culinary Director",
      icon: <Award className="w-6 h-6" />,
      bio: "Passionate about bringing families together through exceptional food",
      color: "text-success",
      skills: ["Menu Development", "Food Safety", "Training"],
      image: "👨‍🍳"
    },
    {
      name: "Sarah Johnson",
      role: "Community Manager",
      icon: <Heart className="w-6 h-6" />,
      bio: "Connecting food lovers and sharing the joy of great meals",
      color: "text-primary",
      skills: ["Customer Care", "Social Media", "Events"],
      image: "👩‍💼"
    },
    {
      name: "Roberto Martinez",
      role: "Quality Specialist",
      icon: <Star className="w-6 h-6" />,
      bio: "Ensuring every dish meets our highest standards of excellence",
      color: "text-info",
      skills: ["Quality Assurance", "Supply Chain", "Standards"],
      image: "👨‍🔬"
    }
  ];

  const stats = [
    { label: "Happy Families Fed", value: "50K+", icon: <Users className="w-8 h-8 text-danger" />, color: "text-danger" },
    { label: "Years of Excellence", value: "15+", icon: <Clock className="w-8 h-8 text-warning" />, color: "text-warning" },
    { label: "Celebration Meals", value: "200K+", icon: <Heart className="w-8 h-8 text-primary" />, color: "text-primary" },
    { label: "5-Star Reviews", value: "98%", icon: <Star className="w-8 h-8 text-warning" />, color: "text-warning" }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We source only the finest ingredients and follow traditional recipes passed down through generations.",
      icon: <Award className="w-12 h-12 text-danger" />,
      color: "bg-danger"
    },
    {
      title: "Family Tradition",
      description: "Every meal we create is designed to bring families together and create lasting memories.",
      icon: <Heart className="w-12 h-12 text-primary" />,
      color: "bg-primary"
    },
    {
      title: "Community Love",
      description: "We're not just a food company - we're part of your family's most precious moments.",
      icon: <Users className="w-12 h-12 text-success" />,
      color: "bg-success"
    }
  ];

  return (
    <div className="min-h-screen bg-light">
      <Container className="relative z-10 py-16">
        {/* Hero Section */}
        <div className={`text-center mb-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="display-1 mb-4">🍖</div>
          <h1 className="display-3 fw-bold mb-4 text-transparent bg-gradient bg-danger bg-opacity-75 px-5 py-3 rounded">
            Celebration Ham
          </h1>
          <p className="lead text-muted mb-4">
            <span className="fw-semibold fst-italic">"Masayadong Good!"</span> - We're passionate about creating extraordinary meals 
            that bring families together for life's most special moments. Every bite tells a story of tradition, 
            quality, and love shared around the dinner table.
          </p>
        </div>

        {/* Stats Section */}
        <Row className={`g-4 mb-5 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <Col key={index} xs={6} md={3} className="text-center">
              <Card className="bg-white border-0 shadow-sm hover-shadow-lg transition-all duration-300 h-100">
                <Card.Body className="p-4">
                  <div className={stat.color + " mb-3 d-flex justify-content-center"}>
                    {stat.icon}
                  </div>
                  <Card.Title className="h5 mb-2 bg-gradient bg-danger bg-opacity-75 px-3 py-1 rounded text-transparent">
                    {stat.value}
                  </Card.Title>
                  <Card.Text className="text-muted small">{stat.label}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Values Section */}
        <div className={`mb-5 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-center display-5 fw-bold mb-5 bg-gradient bg-danger bg-opacity-75 px-5 py-3 rounded text-transparent">
            What We Stand For
          </h2>
          <Row className="g-4">
            {values.map((value, index) => (
              <Col key={index} md={4} className="text-center">
                <Card className="bg-white border-0 shadow-sm hover-shadow-lg transition-all duration-300 h-100">
                  <Card.Body className="p-4">
                    <div className={value.color + " bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4" + " w-25 h-25"}>
                      {value.icon}
                    </div>
                    <Card.Title className="h5 mb-3">{value.title}</Card.Title>
                    <Card.Text className="text-muted">{value.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Team Section */}
        <div className={`mb-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-center display-5 fw-bold mb-4 bg-gradient bg-danger bg-opacity-75 px-5 py-3 rounded text-transparent">
            Meet Our Culinary Team
          </h2>
          <p className="text-center text-muted mb-4">The passionate food lovers behind every delicious meal</p>
          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col key={index} md={3} className="text-center">
                <Card className={`bg-white border-0 shadow-sm transition-all duration-300 ${activeCard === index ? 'shadow-lg border-danger' : ''}`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}>
                  <Card.Body className="p-4">
                    <div className="display-4 mb-3">{member.image}</div>
                    <Card.Title className="h5 mb-2">{member.name}</Card.Title>
                    <Card.Subtitle className={member.color + " mb-3"}>{member.role}</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">{member.bio}</Card.Text>
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="badge bg-danger-subtle text-danger border border-danger-subtle">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                      <div className="bg-danger-subtle rounded p-2 hover-bg-danger text-danger">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="bg-danger-subtle rounded p-2 hover-bg-danger text-danger">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <div className="bg-danger-subtle rounded p-2 hover-bg-danger text-danger">
                        <Twitter className="w-4 h-4" />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Contact Section */}
        <div className={`text-center mb-5 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="display-1 mb-4">🍽️</div>
            <h3 className="display-6 fw-bold mb-4 bg-gradient bg-danger bg-opacity-75 px-5 py-3 rounded text-transparent">
              Join Our Food Family
            </h3>
            <p className="text-muted mb-4">Ready to make your next celebration unforgettable? We'd love to help you create magical moments 
              with food that brings smiles to every face around your table.</p>
            <div className="d-flex justify-content-center mb-4">
              <MapPin className="w-5 h-5 text-danger me-2" />
              <span className="text-muted">Serving communities nationwide</span>
            </div>
            <Button variant="danger" className="px-5 py-3 rounded-pill hover-shadow-lg transition-all duration-300">
              <span>Let's Celebrate Together</span>
              <ArrowRight className="w-5 h-5 ms-2" />
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default About;