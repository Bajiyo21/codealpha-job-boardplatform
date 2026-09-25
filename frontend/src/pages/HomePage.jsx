import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrendingSkills from "../components/TrendingSkills";
import CompanyLogos from "../components/CompanyLogos";
import FeaturedCompanies from "../components/FeaturedCompanies";
import Categories from "../components/Categories";
import FeaturedJobs from "../components/FeaturedJobs";
import LatestJobs from "../components/LatestJobs";
import Stats from "../components/Stats";
import WhyCareerNest from "../components/WhyCareerNest";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingSkills />
      <CompanyLogos />
      <FeaturedCompanies />
      <Categories />
      <FeaturedJobs />
      <LatestJobs />
      <Stats />
      <WhyCareerNest />
      <Testimonials />
      <CTA />
      <Newsletter />
      <Footer />
    </>
  );
}