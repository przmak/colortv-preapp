/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Router from './router';

module.exports = {
    init: function (app, config) {        
        let inst = new Router(app);
        
        app.listen(config.dev.port, function () {
            console.log('Example app listening on port !' + config.dev.port);
        });
    }
};
