import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigationScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToAbout = () => {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAboutClick = () => {
    if (location.pathname === '/category' || location.pathname !== '/home') {
      navigate('/home', { state: { scrollTo: 'about' } });
    } else {
      scrollToAbout();
    }
  };

  const handleContactClick = () => {
    scrollToFooter();
  };

  const handleScrollAfterNavigation = () => {
    if (location.state && location.state.scrollTo === 'about') {
      scrollToAbout();
      // Xóa state sau khi cuộn để tranh cuộn lại
      navigate(location.pathname, { replace: true, state: {} });
    } else if (location.state && location.state.scrollTo === 'footer') {
      scrollToFooter();
      // Xóa state sau khi cuộn để tranh cuộn lại
      navigate(location.pathname, { replace: true, state: {} });
    }
  };

  return {
    scrollToAbout,
    scrollToFooter,
    handleAboutClick,
    handleContactClick,
    handleScrollAfterNavigation,
  };
};