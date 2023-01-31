import { addItem } from "../src/pantry"


export default function ItemAdder (name, quantity, selectedCategory, unit, expiryDate) {
    const newItem = {name: name, expiry: expiryDate, category: selectedCategory, quantity: quantity, unit: unit}
    
    addItem(newItem)
}