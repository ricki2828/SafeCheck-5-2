export const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  const headerHeight = 80; // Adjusted for header height
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};