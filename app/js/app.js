
window.$ = function init( selector ) {
        let sq = new SmallQuery(selector);
        return sq;
};

class SmallQuery {

    constructor(selector) {
        this.selector = selector;
        this.elemArr = [];
        if (selector){
            if (typeof selector != 'object'){
                this.elemArr = document.querySelectorAll(selector);
            }else{
                this.elemArr.push(selector);
            }
        }
        else{
            this.elemArr = document;
        }
    }

    debug() {
        console.log( this.elemArr );
        return this;
    }
    onclick(f) {
        this.on("click", f);
        return this;
    }
    on(eventName, f) {
        this.elemArr.forEach((item) => {
            item.addEventListener(eventName, function (e) {
                for (var target = e.target; target && target != this; target = target.parentNode) {
                    if (target.matches(this.selector)) {
                        handler.call(target, e);
                        break;
                    }
                }
                f.bind(this)();//привязали контекст f к объекту SmallQuery
                //console.log(this);
            }, false)
        });
        return this;
    }
    toggleClass(cls){
        this.elemArr.forEach((item) => { item.classList.toggle(cls)})
        return this;
    }
    addClass(cls){
        this.elemArr.forEach((item) => { item.classList.add(cls)});
        return this;
    }
    removeClass(cls){
        this.elemArr.forEach((item) => { item.classList.remove(cls)});
        return this;
    }
}

document.addEventListener("DOMContentLoaded", function() {

    $('.burger').onclick( function f(){
        $(this).toggleClass("-active");
        $('.slider-menu').toggleClass("-active");
        $('body').toggleClass("no-scroll");
     });

});
