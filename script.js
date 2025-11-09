// theme switcher for site-card
(function(){
  const KEY = 'site-card-theme';
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function applyTheme(name){
    html.classList.remove('theme-mint','theme-purple');
    if(name === 'mint') html.classList.add('theme-mint');
    else html.classList.add('theme-purple');
    if(btn){
      btn.textContent = name === 'mint' ? 'Mint' : 'Purple';
      btn.setAttribute('aria-pressed', String(name === 'mint'));
    }
  }

  // Helper: briefly enable transition class so changes animate smoothly
  function withThemeTransition(cb){
    html.classList.add('theme-transition');
    // ensure transition class is applied before mutation
    requestAnimationFrame(()=>{
      try{ cb(); }catch(e){}
      // remove the helper class after the medium duration
      setTimeout(()=> html.classList.remove('theme-transition'), 500);
    });
  }

  function saveTheme(name){
    try{ localStorage.setItem(KEY, name); }catch(e){}
  }

  // Initialize theme from storage or default to purple
  let theme = 'purple';
  try{ const s = localStorage.getItem(KEY); if(s) theme = s; }catch(e){}
  // Apply initial theme without transition on first paint
  applyTheme(theme);

  if(btn){
    btn.addEventListener('click', ()=>{
      theme = theme === 'mint' ? 'purple' : 'mint';
      withThemeTransition(()=> applyTheme(theme));
      saveTheme(theme);
    });
  }
})();
