import {Item} from "./item.js";
import {Popup} from "./popup.js";

$("#item-price").on("focusin", function(event) {
    if ($(this).val() === "0.00") {
        $(this).val("");
    }
});

$("#item-price").on("focusout", function(event) {
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }

    if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
        return;
    }

    var $this = $(this);
    $this.val(trimNumber($this.val()));
});

$("#item-amount").on("focusout", function(event) {
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }

    if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
        return;
    }

    var $this = $(this);
    $this.val(Number($this.val()));
});

$("#use-amount").on("focusout", function(event) {
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }

    if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
        return;
    }

    var $this = $(this);
    $this.val(Number($this.val()));
});

$("#item-submit").click(function() { addItem(); });

function addItem() {
    var itemName = $("#item-name").val();

    if (itemName == "") 
        return;

    var itemPrice = $("#item-price").val();

    if (itemPrice == "") 
        return;

    var itemAmount = $("#item-amount").val();

    if (itemAmount == "") 
        return;

    var itemUnit = $("#item-unit").val();

    if (itemUnit == "")
        return;

    var item = new Item(itemName, itemPrice, itemAmount, itemUnit, itemPrice / itemAmount);
    Item.addItem(item);
    createItemList();
}

var activeItem;

var PU_closeArea = $("#PU_close-area");

var PU_useItemElement = $("#PU_use-item");
var PU_useItem = new Popup(PU_useItemElement, PU_useItemElement.find(".PU_close-button"), PU_closeArea);

$(PU_useItem).on("openEvent", function() {
    var item = Item.getItem(activeItem);
    PU_useItemElement.find(".PU_heading").text(item.name);
});

function createItemList() {
    $("#item-list").empty();

    for (const[key, value] of Item.instances) {
        if (value != null) {
            let itemElement = $("<div class='item'></div>");
            $("#item-list").append(itemElement);
            let itemText = $("<div class='item-text'></div>");
            itemElement.append(itemText);
            let itemName = $("<p>" + value.name + "</p>");
            itemText.append(itemName);
            let itemAmount = $("<p>" + value.amount + " " + value.unit + "</p>");
            itemText.append(itemAmount);
            let unitPrice = $("<p>unit price of $" + trimNumber(value.unitPrice) + " per " + value.unit.replace('s', '') + "</p>");
            itemText.append(unitPrice);
            let itemButtons = $("<div class='item-buttons'></div>");
            itemElement.append(itemButtons);
            let deleteButton = $("<button>Delete</button>");
            itemButtons.append(deleteButton);
            let useButton = $("<button>Use</button>");
            itemButtons.append(useButton);
            $(deleteButton).click(function() { removeItem(key) });
            $(useButton).click(function() { activeItem = key; PU_useItem.open(); });
        }
    }
}

function removeItem(item) {
    Item.removeItem(item);
    createItemList();
}

function trimNumber(number) {
    return Number(number).toFixed(2);
}

$("#use-submit").click(function() { useItem() });

function useItem() {
    Item.getItem(activeItem).useItem($("#use-amount").val());
    createItemList();
}