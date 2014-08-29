var makeChange = function(amount) {
    var change = [],
        total = 0;
    [25, 10, 5, 1].forEach(function(coin) {
        while (total + coin <= amount) {
            change.push(coin);
            total += coin;
        }
    });
    return change;
};