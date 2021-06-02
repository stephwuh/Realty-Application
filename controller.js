const houses = require('./db.json')

let houseId = 4;

module.exports = {
    getHouses: (req, res) => {
      res.send(houses) 
    },
    deleteHouse: (req, res) => {
        const index = houses.findIndex((house) => {
            return house.id === +req.params.id;
        })
        // console.log(index);
        houses.splice(index,1);
        res.send(houses);
    }, 
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body;
        const newHouse = {
            id: houseId,
            address: address,
            price: Number(price),
            imageURL: imageURL
        }
        houses.push(newHouse);
        houseId++ ;
        res.send(houses);
    },
    updateHouse: (req, res) => {
        let {type} = req.body;
        let {id} = req.params;
        let index = houses.findIndex((house) => {
            return house.id === +id;
        })
        let housePrice = houses[index].price;
        console.log(housePrice);

        if (type === 'minus' && housePrice === 0) {
            res.status(400).send('House cannot be of negative value.')
        } else if (type === 'minus') {
            houses[index].price -= 10000;
            res.send(houses);
        } else if (type === 'plus') {
            houses[index].price += 10000;
            res.send(houses);
        }  else {
            res.status(400).send();
        }
    }
}