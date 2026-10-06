
function toggleMenu(){document.getElementById('navMenu').classList.toggle('open')}
document.addEventListener('click',function(e){if(!e.target.closest('.navbar')){const m=document.getElementById('navMenu');if(m)m.classList.remove('open')}})
document.getElementById('year') && (document.getElementById('year').textContent=new Date().getFullYear());

function submitForm(event, type){
  event.preventDefault();
  const msg=event.target.querySelector('.form-message');
  msg.textContent=document.documentElement.lang==='hi'
    ? 'आपका संदेश प्राप्त हुआ। वास्तविक उपयोग से पहले इस फ़ॉर्म को ईमेल या API से जोड़ें।'
    : type+' received successfully. Connect this form to your email/API before production.';
  event.target.reset();
}
function showNotice(){
  const el=document.getElementById('donateNotice');
  el.textContent=document.documentElement.lang==='hi'
    ? 'प्रकाशित करने से पहले नमूना बैंक और UPI विवरण की जगह फाउंडेशन की सत्यापित भुगतान जानकारी दें।'
    : 'Please replace the sample bank/UPI details with verified foundation payment information before publishing.';
}

const carousel=document.querySelector('.hero-carousel');
if(carousel){
  const slides=Array.from(carousel.querySelectorAll('.hero-slide'));
  const dots=Array.from(carousel.querySelectorAll('.carousel-dot'));
  let activeSlide=0;
  let autoplay;

  function showSlide(index){
    activeSlide=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{slide.hidden=i!==activeSlide});
    dots.forEach((dot,i)=>{
      const active=i===activeSlide;
      dot.classList.toggle('active',active);
      if(active)dot.setAttribute('aria-current','true');
      else dot.removeAttribute('aria-current');
    });
  }

  function startAutoplay(){
    clearInterval(autoplay);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      autoplay=setInterval(()=>showSlide(activeSlide+1),5000);
    }
  }

  carousel.querySelectorAll('[data-slide-step]').forEach(button=>{
    button.addEventListener('click',()=>{
      showSlide(activeSlide+Number(button.dataset.slideStep));
      startAutoplay();
    });
  });
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{
    showSlide(i);
    startAutoplay();
  }));
  carousel.addEventListener('mouseenter',()=>clearInterval(autoplay));
  carousel.addEventListener('mouseleave',startAutoplay);
  carousel.addEventListener('focusin',()=>clearInterval(autoplay));
  carousel.addEventListener('focusout',event=>{
    if(!carousel.contains(event.relatedTarget))startAutoplay();
  });
  startAutoplay();
}
