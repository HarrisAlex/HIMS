export class Popup {
    id;
    popup;
    closeButton;
    closeArea;

    constructor(popup, closeButton, closeArea) {
        this.popup = popup;
        this.closeButton = closeButton;
        this.closeArea = closeArea;

        const instance = this;

        $(closeButton).click(function() { instance.close() });
        $(closeArea).click(function() { instance.close() });

        this.close();
    }

    open() {
        $(this.popup).addClass("visible");
        $(this.closeArea).show();

        $(this).trigger("openEvent");
    }

    close() {
        $(this.popup).removeClass("visible");
        $(this.closeArea).hide();
    }
}