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
    // Leta reda på index för rätt produkt.
    let index = products.findIndex((prod) => {
        return prod.id == productID
    });

    // Kolla hur många det finns, och ta antingen så många kunden vill ha eller så många som finns.
    amount = (amount <= products[index].amount) ? amount : products[index].amount

    /* Om jag bara refererar till ett objekt, så får jag bara en referens till det.
    Med Object.assign kan jag "kopiera" över egenskaperna, och skapa ett fristående objekt. */
    let length = cart.push(Object.assign({}, products[index]))

    // Justera antalet (amount) i såväl products som i cart.
    cart[length - 1].amount = amount
    products[index].amount -= amount
}