'use strict'

var Modal = (function () {
    var popUp = function (id) {
        this.modalId = id;
        this.overlayClass = 'b-modal__overlay';
        this.overlayId = 'm_ovrl';
        this.activeClass = 'active';
        this.closeClass = 'b-modal__close';
        this.modal = document.getElementById(this.modalId);
        this.button = this.modal.getElementsByClassName(this.closeClass)[0].addEventListener('click', this.close.bind(this));
    };


    popUp.prototype.addOverlay = function () {
        var overlay = document.createElement('div');
        overlay.className = this.overlayClass;
        overlay.setAttribute('id', this.overlayId);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', this.close.bind(this));
    };

    popUp.prototype.center = function () {
        var top, left,
            _window = window,
            style = getComputedStyle(this.modal);

        top = Math.max(_window.innerHeight - outerHeightEl(this.modal), 0) / 2;
        left = Math.max(_window.innerWidth - outerWidthEl(this.modal), 0) / 2;

        this.modal.style.top = top + _window.pageYOffset + 'px';
        this.modal.style.left = left + _window.pageXOffset + 'px';

        function outerHeightEl(el) {
            var height = el.offsetHeight;
            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        };

        function outerWidthEl(el) {
            var width = el.offsetWidth;
            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        };
    };

    popUp.prototype.open = function () {
        this.addOverlay();
        this.modal.style.visibility = 'hidden';
        this.modal.style.display = 'block';
        this.center();
        window.addEventListener('resize', this.center.bind(this));
        this.modal.style.visibility = 'visible';
    };

    popUp.prototype.close = function () {
        var overlay = document.getElementById(this.overlayId);
        overlay.removeEventListener('click', this.close);
        overlay.parentElement.removeChild(overlay);
        this.modal.style.display = 'none';
        window.removeEventListener('resize', this.center);
    };

    return popUp;
})();


(function () {
    var modal_btn = document.querySelectorAll('[data-modal]');
    if (modal_btn.length > 0) {
        var modal = {};
        Array.prototype.forEach.call(modal_btn, function (el, i) {
            var id = el.getAttribute('data-modal');
            modal[i] = new Modal(id);
            el.addEventListener('click', modal[i].open.bind(modal[i]));
        });
    }
})();