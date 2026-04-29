// seed/data.js

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Application",
    description:
      "A full-stack eCommerce platform with product management, cart system, secure authentication, and admin dashboard.",
    image: "/images/projects/ecommerce.jpg",
    technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Stripe"],
    link: "#",
    github: "#",
    featured: true,
  },

  {
    title: "Hospital Management System",
    category: "Web Application",
    description:
      "Role-based system with Admin, Doctor, and Patient dashboards including appointment scheduling and record management.",
    image: "/images/projects/hospital.jpg",
    technologies: ["Node.js", "MongoDB", "Express", "JWT", "Bootstrap"],
    link: "#",
    github: "#",
    featured: true,
  },

  {
    title: "React Weather App",
    category: "Frontend Project",
    description:
      "A responsive weather application built with React and Material UI using real-time API data.",
    image: "/images/projects/weather.jpg",
    technologies: ["React.js", "Material UI", "API", "JavaScript"],
    link: "#",
    github: "#",
    featured: true,
  },

  {
    title: "AI Chatbot System",
    category: "AI Application",
    description:
      "An intelligent chatbot powered by Gemini API capable of answering queries and interacting with users dynamically.",
    image: "/images/projects/chatbot.png",
    technologies: ["Python", "Gemini API", "AI", "Flask"],
    link: "#",
    github: "#",
    featured: true,
  },
];

module.exports = projects;