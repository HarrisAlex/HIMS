class Item {
    name;
    price;
    amount;
    unit;

    constructor(name, price, amount, unit, index) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.unit = unit;
    }

    unitPrice() {
        return this.price / this.amount;
    }

    useItem(amount) {
        this.amount -= amount;
        if (this.amount <= 0) {
            removeItem(this.index);
        }
    }

    getIndex() {
        return Item.getItemIndex(this.name);
    }

    static getItemIndex(name) {
        for (var i = 0; i < Item.instances.length; i++) {
            if (Item.instances[i].name == name) {
                return i;
            }
        }
        return -1;
    }

    static addItem(item) {
        for (var i = 0; i < Item.instances.length; i++) {
            if (Item.instances[i] == null) {
                Item.instances[i] = item;
                return;
            }
        }

        Item.instances.push(item);
    }

    static removeItem(name) {
        var item = Item.getItemIndex(name);

        if (item == -1)
            return;

        delete Item.instances[item];
    }
}

Item.instances = [];

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

    var item = new Item(itemName, itemPrice, itemAmount, itemUnit);
    Item.addItem(item);
    createItemList();
}

function createItemList() {
    $("#item-list").empty();

    for (var i = 0; i < Item.instances.length; i++) {
        if (Item.instances[i] != null) {
            $("#item-list").append("<div class='item'><a onclick='removeItem(" + i + ")'>X</a><li>(" + Item.instances[i].amount + " " + Item.instances[i].unit + ") " + Item.instances[i].name + " , unit price of $" + Item.instances[i].unitPrice() + "</li></div>");
        }
    }
}

function removeItem(index) {
    Item.removeItem(index);
    createItemList();
}

function useItem(name, amount) {

}