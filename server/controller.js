const houses = require('./db.json')

let globalID = 4

module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req,res) => {
        const {id} = req.params
        let index= houses.findIndex((elem) => +elem.id === +id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req,res) => {
        const {address, price, imageURL}=req.body
        const newHouse = {
            id:globalID,
            address,
            price: +price,
            imageURL
        }
        houses.push(newHouse)
        globalID++
        res.status(200).send(houses)
    },
    updateHouse: (req,res) => {
        const {id} = req.params
        const {type} = req.body
        let index = houses.findIndex((elem) => +elem.id === +id)
        if(houses[index].price <= 0 && type === 'minus'){
            res.status(400).send("We won't pay  you to buy a house!")
        }else if (houses[index].price<10000){
            houses[index].price=0
            res.status(200).send(houses)
        }else if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.status(400).send("Uh oh, something went wrong!")
        }
    }
}