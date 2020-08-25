const products = [{
        "id": 3,
        "name": "Väte",
        "price": "12.45",
        "amount": 100
    },
    {
        "id": "abc",
        "name": "Helium",
        "price": "13.25",
        "amount": 3
    },
    {
        "id": 0,
        "name": "Syre",
        "price": 20,
        "amount": 81
    }
]

let cart = []

function putInCart(productID, amount) {
    // Leta reda på rätt produkt.
    let product = products.filter((product) => {
        return product.id = productID
    });
    // Kolla hur många det finns, och ta antingen så många kunden vill eller så många som finns.
    amount = (amount <= product.amount) ? amount : product.amount

    let length = cart.push(product)
    // Justera antalet (amount) i såväl products som i cart.
    cart[length - 1].amount = amount
    products[]
}