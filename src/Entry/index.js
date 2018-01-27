require('../Public/assets/style.scss');

require('../Public/assets/images/test_pic.jpg');

if(module.hot){
  require('ejs-render-loader!../Public/header.ejs');
  require('ejs-render-loader!../Public/index.ejs');
  require('ejs-render-loader!../Public/footer.ejs');
}

// require("expose-loader?$!../Public/assets/lib/jquery.min.js");
// $(document).ready(function(){
//   alert('a')
// });