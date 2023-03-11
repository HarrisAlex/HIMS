class GUID {
    static generate() {
        GUID.lastGUID++;
        return GUID.lastGUID;
    }
}

GUID.lastGUID = 0;

class Item {
    id;
    name;
    price;
    amount;
    unit;
    unitPrice;

    constructor(name, price, amount, unit, unitPrice) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.unit = unit;
        this.unitPrice = unitPrice
    }

    useItem(amount) {
        this.amount -= amount;

        if (this.amount <= 0) {
            removeItem(this.index);
        }
    }

    static addItem(item) {
        for (const value of Item.instances.values()) {
            if (value.name == item.name && value.unitPrice == item.unitPrice) {
                value.amount = Number(value.amount) + Number(item.amount);
                return;
            }
        }

        item.id = GUID.generate();
        Item.instances.set(item.id, item);
    }

    static removeItem(id) {
        Item.instances.delete(id);
    }
}
t
Item.instances = new Map();

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

function createItemList() {
    $("#item-list").empty();

    for (const[key, value] of Item.instances) {
        if (value != null) {
            var item = $("#item-list").append("<div class='item'><li>(" + value.amount + " " + value.unit + ") " + value.name + " , unit price of $" + trimNumber(value.unitPrice) + ", id [" + key + "]</li></div>");
            var deleteButton = item.append("<button>Delete</button>");
            $(deleteButton).click(function() { removeItem(key); });
        }
    }
}

function removeItem(index) {
    Item.removeItem(index);
    createItemList();
}


function trimNumber(number) {
    return Number(number).toFixed(2);
}