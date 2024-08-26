// Path: src/03-array/07-different-data-types.js

const legacyOrderData = '12345,Cassian,2024-01-21,Laptop:1200|Mouse:50,1250,Shipped';
const customerOrderArray = legacyOrderData.split(','); 
console.log(customerOrderArray);
// [
//   '12345',
//   'Cassian',
//   '2024-01-21',
//   'Laptop:1200|Mouse:50',
//   '1250',
//   'Shipped'
// ]

const customerOrder = {
    id: Number(customerOrderArray[0]),
    name: customerOrderArray[1],
    date: new Date(customerOrderArray[2]),
    items: customerOrderArray[3].split('|').map(item => {
        const [name, price] = item.split(':');
        return {
            name,
            price: Number(price)
        };
    }),
    total: Number(customerOrderArray[4]),
    status: customerOrderArray[5]
};
console.log(customerOrder);
// {
//   id: 12345,
//   name: 'Cassian',
//   date: 2024-01-21T00:00:00.000Z,
//   items: [ { name: 'Laptop', price: 1200 }, { name: 'Mouse', price: 50 } ],
//   total: 1250,
//   status: 'Shipped'
// }

// to see the output of this file use the command: node src/03-array/07-different-data-types.js