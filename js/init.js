/***********************
Ultra V2 Initialisation
***********************/
window.addEventListener('load', function() {
  loading.style.display = 'none';
  const gamecontrol = new GameControl({
      element: gameContainer
  });
  gamecontrol.init();
});
