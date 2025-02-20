import React, { useEffect, useState, lazy, Suspense } from 'react';
import Loading from '@/components/admin/Loading';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
const About = lazy(() => import('@/components/About'));
const Project = lazy(() => import('@/components/Project'));
const Skill = lazy(() => import('@/components/Skill'));
const Service = lazy(() => import('@/components/Service'));
// const Testimonial = lazy(() => import('@/components/Testimonial'));
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { GetAboutMe } from '@/api/aboutme.api';
import { GetProject } from '@/api/project.api';
import { GetSkill } from '@/api/skill.api';
import { GetServices } from '@/api/service.api';
// import { GetApprovedTestimonial } from '@/api/clienttestimonial.api';

const MainPage = () => {
  // for tracking loading
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Store all data in a single state object
  const [data, setData] = useState({
    about: {},
    projects: [],
    skills: [],
    services: [],
    testimonials: []
  });

  useEffect(() => {
    // 🚀 Fetch all API data in parallel
    Promise.all([
      GetAboutMe(),
      GetProject(),
      GetSkill(),
      GetServices()
    ])
      .then(([about, projects, skills, services]) => {
        setData({ about, projects, skills, services });
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // // for about 
  // const [about, setAbout] = useState({});
  // const fetchAbout = () => {
  //   GetAboutMe()
  //     .then((res) => {
  //       if (res) setAbout(res)
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => fetchProject());
  // }

  // // for project
  // const [projects, setProjects] = useState([]);
  // const fetchProject = () => {
  //   GetProject()
  //     .then((res) => {
  //       if (res) setProjects(res)
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => fetchSkill());
  // }

  // // for skill
  // const [skills, setSkills] = useState([]);
  // const fetchSkill = () => {
  //   GetSkill()
  //     .then((res) => {
  //       if (res) setSkills(res)
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => fetchService())
  // }

  // // for Service
  // const [services, setServices] = useState([]);
  // const fetchService = () => {
  //   GetServices()
  //     .then((res) => {
  //       if (res) setServices(res)
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setDataLoaded(true));      // finally all loaded
  // }

  // // for testinmonail
  // const [testimonials, setTestimonials] = useState([]);
  // const fetchTestimonial = () => {
  //   GetApprovedTestimonial()
  //     .then((res) => {
  //       if (res?.testimonials) setTestimonials(res.testimonials);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false))
  // }

  // useEffect(() => {
  //   fetchAbout();
  // }, []);


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
      {isLoading ? (
        <Loading setIsLoading={setIsLoading} dataLoaded={dataLoaded} />
      ) : (
        <>
          <Navbar activeSection={activeSection} />
          <Hero iam={data.about?.tagLineSkills} />
          <Suspense fallback={<Loading />}>
            <About aboutMe={data.about?.aboutMeContent} />
            <Project projects={data.projects} />
            <Skill skills={data.skills} />
            <Service services={data.services} />
            {/* <Testimonial testimonials={data.testimonials} /> */}
          </Suspense>
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default MainPage
