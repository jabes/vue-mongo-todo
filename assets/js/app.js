/* global Vue, marked */
'use strict';

(function () {

    // Cutting the Mustard
    if ( 'querySelector' in document && 'addEventListener' in window ) {
        document.addEventListener('DOMContentLoaded', ()=> {

            new Vue({
                el: '#editor',
                data: {
                    input: '# hello'
                },
                filters: {
                    marked: marked
                }
            });

        });
    }

})();
