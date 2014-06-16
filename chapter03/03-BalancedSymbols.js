function matches(open, close){
    var opens = "([{",
        closers = ")]}";
    return opens.indexOf(open) == closers.indexOf(close);
}

function parenthesesChecker(symbols){

    var stack = new Stack(),
        balanced = true,
        index = 0,
        symbol, top;

    while (index < symbols.length && balanced){
        symbol = symbols.charAt(index);
        if (symbol == '('|| symbol == '[' || symbol == '{'){
            stack.push(symbol);
        } else {
            if (stack.isEmpty()){
                balanced = false;
            } else {
                top = stack.pop();
                if (!matches(top, symbol)){
                    balanced = false;
                }
            }
        }
        index++;
    }
    if (balanced && stack.isEmpty()){
        return true;
    }
    return false;
}

console.log(parenthesesChecker('{{([][])}()}'));
console.log(parenthesesChecker('[{()]'));