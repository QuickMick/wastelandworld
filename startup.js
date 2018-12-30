require('./core/util/polyfill.js');
window.onload = () => {
  //window.showLoadingDialog();
  window.hideLoadingDialog();

  // You can also require other files to run in this process
  const MainRenderer = require('./core/game.js');
  const GamePlay = require('./core/scenes/gameplayscene');
  const main = new MainRenderer();
  main.setScene(new GamePlay());
  setTimeout(() => {

    try {
      main.start();
    } catch (e) {
      console.error(e);
    }
  }, 1000);
};