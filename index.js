const https = require('https')
const express = require('express')
const {
    getHeapCodeStatistics
} = require('v8')
const app = express()


let products = ""
let cart = []
let url = 'https://www.hulabeck.se/html/temp/products.json'
let data = ""


function getData() {
    return (req, res, next) => {

        // Get data from url
        https.get(url, (res) => {

            // When data comes...
            res.on('data', (d) => {
                data += d
            })

            // When data is finished.
            res.on('end', () => {
                products = JSON.parse(data)
                next()
            })
        })
    }

}


function putInCart(productID, amount) {
    // Leta reda på index för rätt produkt.
    let index = products.findIndex((prod) => {
        return prod.id == productID
    });

    // Kolla hur många det finns, och ta antingen så många kunden vill ha eller så många som finns.
    amount = (amount <= products[index].amount) ? amount : products[index].amount

    /* Om jag refererar till ett objekt, så får jag bara en referens till det.

        exempel: cart.push(products[index])

        Vilket gör att både cart och products kommer att ha en referens till exakt samma objekt.

    Med Object.assign kan jag "kopiera" över egenskaperna, och skapa ett fristående objekt. */
    let length = cart.push(Object.assign({}, products[index]))

    // Justera antalet (amount) i såväl products som i cart.
    cart[length - 1].amount = amount
    products[index].amount -= amount
}

function emptyCart() {
    /* Att bara tömma varukorgen räcker inte. 
    Vi måste återbörda innehållet till products.
    */

    cart.forEach((product) => {
        let p = products.find((prod) => {
            return prod.id == product.id
        })
        p.amount += product.amount
    })

    // Nu kan vi tömma varukorgen
    cart = [];

}

app.get('/', getData(), (req, res, next) => {
    res.json(products.products)
})

app.listen(3000, () => {
    console.log("lyssnar nu på 3000")
})