// Define patterns for tokens
let patterns = [
    [/aroger52/, "aroger52"], // id for homework 2
    [/\/\/[^\n]*/, "comment"],  // Comment
    [/\s+/, "whitespace"],  // Whitespace
    [/print/, "print"],
    [/"([^"]|"")*"/, "string"],  // string literals
    [/if/, "if"],
    [/else/, "else"],
    [/while/, "while"],
    [/continue/, "continue"],
    [/break/, "break"],
    [/function/, "function"],
    [/return/, "return"],
    [/assert/, "assert"],
    [/and/, "&&"],
    [/or/, "||"],
    [/not/, "!"],
    [/\d*\.\d+|\d+\.\d*|\d+/, "number"],
    [/[a-zA-Z_][a-zA-Z0-9_]*/, "identifier"],  // identifiers
    [/\+/, "+"],
    [/\-/, "-"],
    [/\*/, "*"],
    [/\%/, "%"],
    [/\^/, "^"],
    [/\//, "/"],
    [/\(/, "("],
    [/\)/, ")"],
    [/==/, "=="],
    [/!=/, "!="],
    [/<=/, "<="],
    [/>=/, ">="],
    [/</, "<"],
    [/>/, ">"],
    [/=/, "="],
    [/;/, ";"],
    [/&&/, "&&"],
    [/\|\|/, "||"],
    [/!/, "!"],
    [/\{/, "{"],
    [/}/, "}"],
    [/\[/, "["],
    [/\]/, "]"],
    [/\./, "."],
    [/\,/, ","],
    [/\s+/, "whitespace"],
    [/\./, "error"]
];

let esc_chars = [
    // escape characters
    [/\0/, "NUL"], // null
    [/\n/, "LF"], // new line
    [/\b/, "BS"], // backspace
    [/\a/, "BEL"], // bell
    [/\t/, "HT"], // horizontal tab
    [/\v/, "VT"], // vertical tab
    [/\f/, "FF"], // form feed
    [/\r/, "CR"] // carriage return
];

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function tokenize(characters) {
    let tokens = [];
    let position = 0;
    while (position < characters.length) {
        let match = null;
        let tag = null;
        // Iterate over all token patterns
        for (let i = 0; i < patterns.length; i++) {
            let pattern = patterns[i][0];
            tag = patterns[i][1];
            // Create substring from current position
            let substring = characters.slice(position);
            match = pattern.exec(substring);
            if (match && match.index === 0) {
                break;
            } else {
                match = null;
            }
        }
        assert(match, "No match found at position " + position);
        // (process errors)
        if (tag === "error") {
            throw new Error("Syntax error");
        }
        let token = {
            tag: tag,
            position: position,
            value: match[0]
        };
        if (token.tag === "string") {
            token.value = token.value.substring(1, token.value.length - 1).replace(/""/g, '"');
        }
        if (token.tag === "number") {
            if (token.value.indexOf(".") !== -1) {
                token.value = parseFloat(token.value);
            } else {
                token.value = parseInt(token.value, 10);
            }
        }
        if (token.tag !== "whitespace") {
            tokens.push(token);
        }
        position += match[0].length;
    }
    // append end-of-stream marker
    tokens.push({
        tag: null,
        value: null,
        position: position
    });
    return tokens;
}

// parser code

// Grammar 

let grammar = `
    factor = <number> | <identifier> | <string> | "(" expression ")" | "!" expression | "-" expression | function_literal
    expnt_factor = factor { "^" factor }
    term = expnt_factor { "*"|"/"|"%" expnt_factor }
    arithmetic_expression = term { "+"|"-" term }
    relational_expression = arithmetic_expression { ("<" | ">" | "<=" | ">=" | "==" | "!=") arithmetic_expression }
    logical_factor = relational_expression
    logical_term = logical_factor { "&&" logical_factor }
    logical_expression = logical_term { "||" logical_term }
    expression = logical_expression
    expression_list = "(" [ expression { "," expression } ] ")"
    identifier_list = "(" [ identifier { "," identifier } ] ")"
    statement_block = "{" statement { ";" statement } "}"
    function_literal = "function" identifier_list statement_block 
    assignment_statement = expression [ "=" expression ]
    print_statement = "print" [ expression ]
    if_statement = "if" "(" expression ")" statement_block [ "else" statement_block ]
    while_statement = "while" "(" expression ")" statement_block
    statement = statement_block | if_statement | while_statement | print_statement | assignment_statement | id_statement
    function_statement = "function" identifier identifier_list statement_block
    program = [ statement { ";" statement } ]
    id_statement = "aroger52"
`;

// --- Parsing Functions and Their Tests ---

function parse_factor(tokens) {
    /*
    factor = <number> | <identifier> | <string> | "(" expression ")" | "!" expression | "-" expression | function_literal
    */
    let token = tokens[0];
    if (["identifier", "number", "string"].includes(token.tag)) {
        return [{ tag: token.tag, value: token.value }, tokens.slice(1)];
    }
    if (token.tag === "(") {
        let result = parse_expression(tokens.slice(1));
        let ast = result[0], remaining = result[1];
        assert(remaining[0].tag === ")", "Expected ')' but got " + JSON.stringify(remaining[0]));
        return [ast, remaining.slice(1)];
    }
    if (token.tag === "!") {
        let result = parse_expression(tokens.slice(1));
        let ast = result[0], remaining = result[1];
        return [{ tag: "!", value: ast }, remaining];
    }
    if (token.tag === "-") {
        let result = parse_expression(tokens.slice(1));
        let ast = result[0], remaining = result[1];
        return [{ tag: "negate", value: ast }, remaining];
    }
    if (token.tag === "function") {
        let result = parse_function_literal(tokens);
        return result;
    }
    throw new Error("Unexpected token '" + token.tag + "' at position " + token.position + ".");
}

function parse_expnt_factor(tokens) {
    /*
    expnt_factor = factor { "^" factor }
    */
    let result = parse_factor(tokens);
    let node = result[0], remaining = result[1];
    while (remaining[0].tag === "^") {
        let tag = remaining[0].tag;
        let rightResult = parse_factor(remaining.slice(1));
        let right_node = rightResult[0];
        remaining = rightResult[1];
        node = { tag: tag, left: node, right: right_node };
    }
    return [node, remaining];
}

function parse_term(tokens) {
    /*
    term = factor { "*"|"/"|"%" expnt_factor }
    */
    let result = parse_expnt_factor(tokens);
    let node = result[0], remaining = result[1];
    while (["*", "/", "%"].includes(remaining[0].tag)) {
        let tag = remaining[0].tag;
        let rightResult = parse_expnt_factor(remaining.slice(1));
        let right_node = rightResult[0];
        remaining = rightResult[1];
        node = { tag: tag, left: node, right: right_node };
    }
    return [node, remaining];
}

function parse_arithmetic_expression(tokens) {
    /*
    arithmetic_expression = term { "+"|"-" term }
    */
    let result = parse_term(tokens);
    let node = result[0], remaining = result[1];
    while (["+", "-"].includes(remaining[0].tag)) {
        let tag = remaining[0].tag;
        let rightResult = parse_term(remaining.slice(1));
        let right_node = rightResult[0];
        remaining = rightResult[1];
        node = { tag: tag, left: node, right: right_node };
    }
    return [node, remaining];
}

function parse_relational_expression(tokens) {
    /*
    relational_expression = arithmetic_expression { ("<" | ">" | "<=" | ">=" | "==" | "!=") arithmetic_expression }
    */
    let result = parse_arithmetic_expression(tokens);
    let node = result[0], remaining = result[1];
    while (["<", ">", "<=", ">=", "==", "!="].includes(remaining[0].tag)) {
        let tag = remaining[0].tag;
        let rightResult = parse_arithmetic_expression(remaining.slice(1));
        let right_node = rightResult[0];
        remaining = rightResult[1];
        node = { tag: tag, left: node, right: right_node };
    }
    return [node, remaining];
}

function parse_logical_factor(tokens) {
    /*
    logical_factor = relational_expression
    */
    return parse_relational_expression(tokens);
}

function parse_logical_term(tokens) {
    /*
    logical_term = logical_factor { "&&" logical_factor }
    */
    let result = parse_logical_factor(tokens);
    let node = result[0], remaining = result[1];
    while (remaining[0].tag === "&&") {
        let tag = remaining[0].tag;
        let nextResult = parse_logical_factor(remaining.slice(1));
        let next_node = nextResult[0];
        remaining = nextResult[1];
        node = { tag: tag, left: node, right: next_node };
    }
    return [node, remaining];
}

function parse_logical_expression(tokens) {
    /*
    logical_expression = logical_term { "||" logical_term }
    */
    let result = parse_logical_term(tokens);
    let node = result[0], remaining = result[1];
    while (remaining[0].tag === "||") {
        let tag = remaining[0].tag;
        let nextResult = parse_logical_term(remaining.slice(1));
        let next_node = nextResult[0];
        remaining = nextResult[1];
        node = { tag: tag, left: node, right: next_node };
    }
    return [node, remaining];
}

function parse_expression(tokens) {
    /*
    expression = logical_expression
    */
    return parse_logical_expression(tokens);
}

function parse_expression_list(tokens) {
    /*
    expression_list = "(" [ expression { "," expression } ] ")"
    */
    assert(tokens[0].tag === "(", "Expected '(' but got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    let expressions = [];
    if (tokens[0].tag !== ")") {
        let result = parse_expression(tokens);
        let expr = result[0], remaining = result[1];
        expressions.push(expr);
        tokens = remaining;
        while (tokens[0].tag === ",") {
            tokens = tokens.slice(1);
            let res = parse_expression(tokens);
            expr = res[0];
            tokens = res[1];
            expressions.push(expr);
        }
    }
    assert(tokens[0].tag === ")", "Expected ')' but got " + JSON.stringify(tokens[0]));
    return [{ tag: "expression_list", expressions: expressions }, tokens.slice(1)];
}

function parse_identifier_list(tokens) {
    /*
    identifier_list = "(" [ identifier { "," identifier } ] ")"
    */
    assert(tokens[0].tag === "(", "Expected '(' but got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    let identifiers = [];
    if (tokens[0].tag !== ")") {
        if (tokens[0].tag === "identifier") {
            identifiers.push({ tag: "identifier", value: tokens[0].value });
            tokens = tokens.slice(1);
        } else {
            throw new Error("Expected identifier but got " + JSON.stringify(tokens[0]));
        }
        while (tokens[0].tag === ",") {
            tokens = tokens.slice(1);
            if (tokens[0].tag === "identifier") {
                identifiers.push({ tag: "identifier", value: tokens[0].value });
                tokens = tokens.slice(1);
            } else {
                throw new Error("Expected identifier but got " + JSON.stringify(tokens[0]));
            }
        }
    }
    assert(tokens[0].tag === ")", "Expected ')' but got " + JSON.stringify(tokens[0]));
    return [{ tag: "identifier_list", identifiers: identifiers }, tokens.slice(1)];
}

function parse_statement_block(tokens) {
    /*
    statement_block = "{" statement { ";" statement } "}"
    */ 
    let ast = { tag: "block", statements: [] };
    assert(tokens[0].tag === "{", "Expected '{', got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    if (tokens[0].tag !== "}") {
        let result = parse_statement(tokens);
        let statement = result[0], remaining = result[1];
        ast.statements.push(statement);
        tokens = remaining;
    }
    while (tokens[0].tag === ";") {
        tokens = tokens.slice(1);
        let result = parse_statement(tokens);
        let statement = result[0], remaining = result[1];
        ast.statements.push(statement);
        tokens = remaining;
    }
    assert(tokens[0].tag === "}", "Expected '}', got " + JSON.stringify(tokens[0]));
    return [ast, tokens.slice(1)];
}

function parse_function_literal(tokens) {
    /*
    function_literal = "function" identifier_list statement_block 
    */
    assert(tokens[0].tag === "function", "Expected 'function', got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    let parametersResult = parse_identifier_list(tokens);
    let parameters = parametersResult[0], remaining = parametersResult[1];
    let statementsResult = parse_statement_block(remaining);
    let statements = statementsResult[0], tokensAfter = statementsResult[1];
    let ast = {
        tag: "function",
        parameters: parameters,
        statements: statements
    };
    return [ast, tokensAfter];
}

function parse_print_statement(tokens) {
    /*
    print_statement = "print" [ expression ]
    */
    assert(tokens[0].tag === "print", "Expected 'print', got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    if (tokens[0].tag === "}" || tokens[0].tag === ";" || tokens[0].tag === null) {
        return [{ tag: "print", value: null }, tokens];
    } else {
        let result = parse_expression(tokens);
        let value = result[0], remaining = result[1];
        return [{ tag: "print", value: value }, remaining];
    }
}

function parse_if_statement(tokens) {
    /*
    if_statement = "if" "(" expression ")" statement_block [ "else" statement_block ]
    */
    assert(tokens[0].tag === "if", "Expected 'if', got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    assert(tokens[0].tag === "(", "Expected '(' but got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    let conditionResult = parse_expression(tokens);
    let condition = conditionResult[0], remaining = conditionResult[1];
    assert(remaining[0].tag === ")", "Expected ')' but got " + JSON.stringify(remaining[0]));
    remaining = remaining.slice(1);
    let thenResult = parse_statement_block(remaining);
    let then_statement = thenResult[0], tokensAfterThen = thenResult[1];
    let else_statement = null;
    if (tokensAfterThen[0].tag === "else") {
        tokensAfterThen = tokensAfterThen.slice(1);
        let elseResult = parse_statement_block(tokensAfterThen);
        else_statement = elseResult[0];
        tokensAfterThen = elseResult[1];
    }
    let ast = {
        tag: "if",
        condition: condition,
        then: then_statement,
        else: else_statement
    };
    return [ast, tokensAfterThen];
}

function parse_while_statement(tokens) {
    /*
    while_statement = "while" "(" expression ")" statement_block
    */
    assert(tokens[0].tag === "while", "Expected 'while', got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    assert(tokens[0].tag === "(", "Expected '(' but got " + JSON.stringify(tokens[0]));
    tokens = tokens.slice(1);
    let conditionResult = parse_expression(tokens);
    let condition = conditionResult[0], remaining = conditionResult[1];
    assert(remaining[0].tag === ")", "Expected ')' but got " + JSON.stringify(remaining[0]));
    remaining = remaining.slice(1);
    let doResult = parse_statement_block(remaining);
    let do_statement = doResult[0], tokensAfter = doResult[1];
    let ast = {
        tag: "while",
        condition: condition,
        do: do_statement
    };
    return [ast, tokensAfter];
}

function parse_assignment_statement(tokens) {
    /*
    assignment_statement = expression [ "=" expression ]
    */
    let result = parse_expression(tokens);
    let target = result[0], remaining = result[1];
    if (remaining[0].tag === "=") {
        remaining = remaining.slice(1);
        let valueResult = parse_expression(remaining);
        let value = valueResult[0], tokensAfter = valueResult[1];
        return [{ tag: "assign", target: target, value: value }, tokensAfter];
    }
    return [target, remaining];
}

function parse_function_statement(tokens) {
    /*
    function_statement = "function" identifier identifier_list statement_block
    */
    let function_token = tokens[0];
    let identifier_token = tokens[1];
    let assignment_token = { tag: '=', position: identifier_token.position, value: '=' };
    tokens = [identifier_token, assignment_token, function_token].concat(tokens.slice(2));
    return parse_function_literal(tokens);
}

function parse_id_statement(tokens) {
    /*
    id_statement = "aroger52"
    */
    assert(tokens[0].tag === "aroger52", "Expected 'aroger52', got " + JSON.stringify(tokens[0]));
    let id_token = tokens[0];
    tokens = tokens.slice(1);
    return [id_token, tokens];
}

function parse_statement(tokens) {
    /*
    statement = statement_block | if_statement | while_statement | print_statement | assignment_statement | id_statement
    */
    let tag = tokens[0].tag;
    if (tag === "{") {
        return parse_statement_block(tokens);
    }
    if (tag === "if") {
        return parse_if_statement(tokens);
    }
    if (tag === "while") {
        return parse_while_statement(tokens);
    }
    if (tag === "print") {
        return parse_print_statement(tokens);
    }
    if (tag === "function") {
        return parse_function_statement(tokens);
    }
    // Added code for Homework 2
    if (tag === "aroger52") {
        return parse_id_statement(tokens);
    }
    return parse_assignment_statement(tokens);
}

function parse_program(tokens) {
    /*
    program = [ statement { ";" statement } ]
    */
    let statements = [];
    if (tokens[0].tag) {
        let result = parse_statement(tokens);
        let statement = result[0], remaining = result[1];
        statements.push(statement);
        tokens = remaining;
        while (tokens[0].tag === ";") {
            tokens = tokens.slice(1);
            let res = parse_statement(tokens);
            statement = res[0];
            tokens = res[1];
            statements.push(statement);
        }
    }
    assert(tokens[0].tag === null, "Expected end of input at position " + tokens[0].position + ", got [" + JSON.stringify(tokens[0]) + "]");
    return [{ tag: "program", statements: statements }, tokens.slice(1)];
}

function parse(tokens) {
    let result = parse_program(tokens);
    let ast = result[0], remaining = result[1];
    return ast;
}

let printed_string = null;

function evaluate(ast, environment = {}) {
    // global printed_string used through closure
    if (ast.tag === "program") {
        let last_value = null;
        for (let i = 0; i < ast.statements.length; i++) {
            let value = evaluate(ast.statements[i], environment);
            last_value = value;
        }
        return last_value;
    }
    if (ast.tag === "block") {
        for (let i = 0; i < ast.statements.length; i++) {
            evaluate(ast.statements[i], environment);
        }
    }
    if (ast.tag === "print") {
        if (ast.value) {
            let value = evaluate(ast.value, environment);
            console.log(String(value));
            return String(value) + "\n";
        } else {
            console.log();
            return "\n";
            // The following code is unreachable, preserving original structure:
            let value = evaluate(ast.value, environment);
            let s = String(value);
            console.log(s);
            printed_string = s;
            return null;
        }
    }
    if (ast.tag === "if") {
        let condition_value = evaluate(ast.condition, environment);
        if (condition_value) {
            evaluate(ast.then, environment);
        } else {
            if (ast.else) {
                evaluate(ast.else, environment);
            }
        }
        return null;
    }
    if (ast.tag === "while") {
        while (evaluate(ast.condition, environment)) {
            evaluate(ast.do, environment);
        }
        return null;
    }
    if (ast.tag === "assign") {
        let target = ast.target;
        assert(target.tag === "identifier", "Expected identifier");
        let identifier = target.value;
        assert(typeof identifier === "string", "Identifier is not a string");
        let value = evaluate(ast.value, environment);
        environment[identifier] = value;
        return;
    }
    if (ast.tag === "number") {
        return ast.value;
    }
    if (ast.tag === "identifier") {
        if (ast.value in environment) {
            return environment[ast.value];
        }
        let parent_environment = environment;
        while (parent_environment["$parent"] !== undefined) {
            parent_environment = parent_environment["$parent"];
            if (ast.value in parent_environment) {
                return parent_environment[ast.value];
            }
        }
        throw new Error("Value [" + ast.value + "] not found in environment " + JSON.stringify(environment) + ".");
    }
    if (ast.tag === "string") {
        assert(typeof ast.value === "string", "unexpected type " + typeof ast.value);
        return ast.value;
    }
    if (["+", "-", "*", "/", "%", "^"].includes(ast.tag)) {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        if (ast.tag === "+") {
            return left_value + right_value;
        }
        if (ast.tag === "-") {
            return left_value - right_value;
        }
        if (ast.tag === "*") {
            return left_value * right_value;
        }
        if (ast.tag === "/") {
            return left_value / right_value;
        }
        if (ast.tag === "%") {
            return left_value % right_value;
        }
        if (ast.tag === "^") {
            return left_value ** right_value;
        }
    }
    if (ast.tag === "negate") {
        let value = evaluate(ast.value, environment);
        return -value;
    }
    if (ast.tag === "&&") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value && right_value;
    }
    if (ast.tag === "||") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value || right_value;
    }
    if (ast.tag === "!") {
        let value = evaluate(ast.value, environment);
        return !value;
    }
    if (ast.tag === "<") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value < right_value;
    }
    if (ast.tag === ">") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value > right_value;
    }
    if (ast.tag === "<=") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value <= right_value;
    }
    if (ast.tag === ">=") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value >= right_value;
    }
    if (ast.tag === "==") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value === right_value;
    }
    if (ast.tag === "!=") {
        let left_value = evaluate(ast.left, environment);
        let right_value = evaluate(ast.right, environment);
        return left_value !== right_value;
    }
    // Homework 2 id statement code
    if (ast.tag === "aroger52") {
        environment['_ksuid_'] = ast.value + "@kent.edu";
        return;
    }
}

export function run(text) {
    let tokens = tokenize(text);
    let ast = parse(tokens);
    evaluate(ast);
}

// if (require.main === module) {
//     if (process.argv.length > 2) {
//         let source = fs.readFileSync(process.argv[2], "utf8");
//         run(source);
//     }
// }
