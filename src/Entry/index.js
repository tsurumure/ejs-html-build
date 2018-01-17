require('../Public/assets/style.scss');

if(module.hot){
  require('ejs-render-loader!../Public/header.ejs');
  require('ejs-render-loader!../Public/index.ejs');
  require('ejs-render-loader!../Public/footer.ejs');
}