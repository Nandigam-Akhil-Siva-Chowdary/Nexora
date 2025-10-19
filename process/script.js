class ProcessSlider {
  constructor() {
    this.currentStep = 0;
    this.totalSteps = document.querySelectorAll('.slide').length;
    this.autoPlayInterval = null;
    
    this.initializeSlider();
    this.bindEvents();
  }
  
  initializeSlider() {
    this.updateProgress();
    this.updateStepCounter();
    this.startAutoPlay();
  }
  
  bindEvents() {
    // Navigation buttons
    document.querySelector('.prev-btn').addEventListener('click', () => this.prevStep());
    document.querySelector('.next-btn').addEventListener('click', () => this.nextStep());
    
    // Step indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToStep(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevStep();
      if (e.key === 'ArrowRight') this.nextStep();
    });
    
    // Pause autoplay on hover
    document.querySelector('.slider-container').addEventListener('mouseenter', () => {
      this.stopAutoPlay();
    });
    
    document.querySelector('.slider-container').addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });
    
    // Touch swipe for mobile
    this.enableSwipe();
  }
  
  goToStep(step) {
    if (step < 0 || step >= this.totalSteps) return;
    
    // Update active states
    document.querySelectorAll('.slide').forEach((slide, index) => {
      slide.classList.toggle('active', index === step);
    });
    
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === step);
    });
    
    this.currentStep = step;
    this.updateProgress();
    this.updateStepCounter();
    this.restartAutoPlay();
  }
  
  nextStep() {
    const nextStep = (this.currentStep + 1) % this.totalSteps;
    this.goToStep(nextStep);
  }
  
  prevStep() {
    const prevStep = (this.currentStep - 1 + this.totalSteps) % this.totalSteps;
    this.goToStep(prevStep);
  }
  
  updateProgress() {
    const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
  }
  
  updateStepCounter() {
    document.querySelector('.current-step').textContent = this.currentStep + 1;
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextStep();
    }, 5000); // Change slide every 5 seconds
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
  
  enableSwipe() {
    const slider = document.querySelector('.slider-content');
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }
  
  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextStep(); // Swipe left
      } else {
        this.prevStep(); // Swipe right
      }
    }
  }
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProcessSlider();
});