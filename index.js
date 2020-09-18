const https = require('https')
const express = require('express')
let app = express()
let url = 'https://www.hulabeck.se/html/temp/products.json'

let cart = [];
let products = ''

function getProducts() {
    https.get(url, (res) => {
        res.on('data', (chunk) => {
            products += chunk
        })
        res.on('end', () => {
            products = JSON.parse(products)
            products = products.products
        })
        res.on('error', (err) => {
            console.error(err)
        })
    })
}

function addToCart(productID, amount) {
    // Leta reda på index för rätt produkt.
    let index = products.findIndex((prod) => {
        return prod.id == productID;
    });

    // Kolla hur många det finns, och ta antingen så många kunden vill ha eller så många som finns.
    amount = amount <= products[index].amount ? amount : products[index].amount;

    /* Om jag refererar till ett objekt, så får jag bara en referens till det.

        exempel: cart.push(products[index])

        Vilket gör att både cart och products kommer att ha en referens till exakt samma objekt.

    Med Object.assign kan jag "kopiera" över egenskaperna, och skapa ett fristående objekt. */
    let length = cart.push(Object.assign({}, products[index]));

    // Justera antalet (amount) i såväl products som i cart.
    cart[length - 1].amount = amount;
    products[index].amount -= amount;
}

function emptyCart() {
    /* Att bara tömma varukorgen räcker inte. 
    Vi måste återbörda innehållet till products.
    */

    cart.forEach((product) => {
        let p = products.find((prod) => {
            return prod.id == product.id;
        });
        p.amount += product.amount;
    });

    // Nu kan vi tömma varukorgen
    cart = [];
}

// express
app.get('/', (req, res) => {
    let slump = Math.floor(Math.random() * products.length)

    let output = '<h1>Iron hardware products AB</h1>'
    output += `<h3>Utvald produkt</h3>
    <p>${products[slump].name} ${products[slump].consumerPrice}
    <br />${products[slump].description}
    </p> `

    res.send(output)
})

app.get('/products', (req, res) => {
    let output = '<ul>'
    products.forEach((product) => {
        output += `<li>
            <a href="/products/${product.id}">${product.name}</a> 
            ${product.consumerPrice} SEK`
    })
    output += '</ul>'
    res.send(output)
})

// Dynamiska parametrar - : indikerar dynamisk parameter/egenskap
app.get('/products/:productID', (req, res) => {
    let productID = req.params.productID
    let product = products.find((prod) => {
        return prod.id == productID
    })
    res.json(product)
})


app.listen(3000, () => {
    getProducts()
    console.log('Servern är igång')
})