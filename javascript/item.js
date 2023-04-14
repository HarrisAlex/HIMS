import {GUID} from "./guid.js";

export class Item {
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
        this.amount -= Number(amount);

        if (this.amount <= 0) {
            Item.removeItem(this.id);
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

    static getItem(id) {
        if (Item.instances.has(id)) {
            return Item.instances.get(id);
        }

        return null;
    }

    static removeItem(id) {
        Item.instances.delete(id);
    }
}

Item.instances = new Map();
