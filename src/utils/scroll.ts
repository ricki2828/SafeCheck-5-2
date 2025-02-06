export const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    const headerHeight = 64; // This should match your header height in pixels
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }; 