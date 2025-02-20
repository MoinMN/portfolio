import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Project from '@/components/Project';
import Skill from '@/components/Skill';
import Service from '@/components/Service';
// import Testimonial from '@/components/Testimonial';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { GetAboutMe } from '@/api/aboutme.api';
import { GetProject } from '@/api/project.api';
import { GetSkill } from '@/api/skill.api';
import { GetServices } from '@/api/service.api';
import { GetApprovedTestimonial } from '@/api/clienttestimonial.api';
import SEO from '@/components/SEO';

const MainPage = () => {
  // for tracking loading
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // for about 
  const [about, setAbout] = useState({});
  const fetchAbout = () => {
    GetAboutMe()
      .then((res) => {
        if (res) setAbout(res)
      })
      .catch((err) => console.log(err))
      .finally(() => fetchProject());
  }

  // for project
  const [projects, setProjects] = useState([]);
  const fetchProject = () => {
    GetProject()
      .then((res) => {
        if (res) setProjects(res)
      })
      .catch((err) => console.log(err))
      .finally(() => fetchSkill());
  }

  // for skill
  const [skills, setSkills] = useState([]);
  const fetchSkill = () => {
    GetSkill()
      .then((res) => {
        if (res) setSkills(res)
      })
      .catch((err) => console.log(err))
      .finally(() => fetchService())
  }

  // for Service
  const [services, setServices] = useState([]);
  const fetchService = () => {
    GetServices()
      .then((res) => {
        if (res) setServices(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setDataLoaded(true));      // finally all loaded
  }

  // for testinmonail
  const [testimonials, setTestimonials] = useState([]);
  const fetchTestimonial = () => {
    GetApprovedTestimonial()
      .then((res) => {
        if (res?.testimonials) setTestimonials(res.testimonials);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchAbout();
  }, []);


  // for navbar
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.6 } // Trigger when 60% of the section is visible
    );

    sections.forEach((section) => observer.observe(section));
    // clean up 
    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>

      <SEO
        title="Moin MN | Profolio | MERN Stack Developer"
        description="Discover my expertise in MERN Stack, Next.js, and full-stack web development. I specialize in building scalable, high-performance applications, delivering innovative solutions, and crafting seamless user experiences. Explore my projects, services, and technical skills."
        url="https://www.moinnaik.com/"
      />


      {isLoading ? (
        <Loading setIsLoading={setIsLoading} dataLoaded={dataLoaded} />
      ) : (
        <>
          <Navbar activeSection={activeSection} />
          <Hero iam={about?.tagLineSkills} />
          <About aboutMe={about?.aboutMeContent} />
          <Project projects={projects} />
          <Skill skills={skills} />
          <Service services={services} />
          {/* <Testimonial testimonials={testimonials} /> */}
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default MainPage
