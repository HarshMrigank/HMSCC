#include "parser/parser.hpp"
#include <stdexcept>

Parser::Parser(const std::vector<Token>& t) : tokens(t) {}

const Token& Parser::peek() const { return tokens[current]; }
const Token& Parser::previous() const { return tokens[current - 1]; }
bool Parser::isAtEnd() const { return peek().type == TokenType::END_OF_FILE; }

const Token& Parser::advance() {
    if (!isAtEnd()) current++;
    return previous();
}

bool Parser::check(TokenType type) const {
    return !isAtEnd() && peek().type == type;
}

bool Parser::match(TokenType type) {
    if (check(type)) {
        advance();
        return true;
    }
    return false;
}

std::unique_ptr<BlockStmt> Parser::parse() {
    // Phase 6.2: parse `int main() { ... }`
    match(TokenType::INT);
    advance(); // main
    match(TokenType::LPAREN);
    match(TokenType::RPAREN);
    return block();
}

std::unique_ptr<BlockStmt> Parser::block() {
    match(TokenType::LBRACE);
    auto block = std::make_unique<BlockStmt>();
    while (!check(TokenType::RBRACE)) {
        block->statements.push_back(statement());
    }
    match(TokenType::RBRACE);
    return block;
}

std::unique_ptr<Stmt> Parser::statement() {
    if (match(TokenType::PRINT)) return printStatement();
    if (match(TokenType::IF)) return ifStatement();
    if (match(TokenType::WHILE)) return whileStatement();
    if (match(TokenType::RETURN)) return returnStatement();
    if (match(TokenType::INT) || match(TokenType::STRING)) return declaration();
    if (check(TokenType::IDENTIFIER)) return assignment();
    throw std::runtime_error("Invalid statement");
}

std::unique_ptr<Stmt> Parser::printStatement() {
    match(TokenType::LPAREN);
    auto expr = expression();
    match(TokenType::RPAREN);
    match(TokenType::SEMICOLON);
    return std::make_unique<PrintStmt>(std::move(expr));
}

std::unique_ptr<Stmt> Parser::declaration() {
    std::string type = previous().value;
    std::string name = advance().value;
    match(TokenType::ASSIGN);
    auto init = expression();
    match(TokenType::SEMICOLON);
    return std::make_unique<VarDeclStmt>(type, name, std::move(init));
}

std::unique_ptr<Stmt> Parser::assignment() {
    std::string name = advance().value;
    match(TokenType::ASSIGN);
    auto val = expression();
    match(TokenType::SEMICOLON);
    return std::make_unique<AssignStmt>(name, std::move(val));
}

std::unique_ptr<Stmt> Parser::returnStatement() {
    auto val = expression();
    match(TokenType::SEMICOLON);
    return std::make_unique<ReturnStmt>(std::move(val));
}

std::unique_ptr<Stmt> Parser::whileStatement() {
    match(TokenType::LPAREN);
    auto cond = expression();
    match(TokenType::RPAREN);
    auto body = block();
    return std::make_unique<WhileStmt>(std::move(cond), std::move(body));
}

std::unique_ptr<Stmt> Parser::ifStatement() {
    match(TokenType::LPAREN);
    auto cond = expression();
    match(TokenType::RPAREN);
    auto thenBlock = block();
    std::unique_ptr<BlockStmt> elseBlock = nullptr;
    if (match(TokenType::ELSE)) {
        elseBlock = block();
    }
    return std::make_unique<IfStmt>(std::move(cond), std::move(thenBlock), std::move(elseBlock));
}

std::unique_ptr<Expr> Parser::expression() { return equality(); }

std::unique_ptr<Expr> Parser::equality() {
    auto expr = comparison();
    while (match(TokenType::EQ) || match(TokenType::NEQ)) {
        std::string op = previous().value;
        auto right = comparison();
        expr = std::make_unique<RelationalExpr>(op, std::move(expr), std::move(right));
    }
    return expr;
}

std::unique_ptr<Expr> Parser::comparison() {
    auto expr = term();
    while (match(TokenType::LT) || match(TokenType::GT) ||
           match(TokenType::LTE) || match(TokenType::GTE)) {
        std::string op = previous().value;
        auto right = term();
        expr = std::make_unique<RelationalExpr>(op, std::move(expr), std::move(right));
    }
    return expr;
}

std::unique_ptr<Expr> Parser::term() {
    auto expr = factor();
    while (match(TokenType::PLUS) || match(TokenType::MINUS)) {
        std::string op = previous().value;
        auto right = factor();
        expr = std::make_unique<BinaryExpr>(op, std::move(expr), std::move(right));
    }
    return expr;
}

std::unique_ptr<Expr> Parser::factor() {
    if (match(TokenType::NUMBER))
        return std::make_unique<NumberExpr>(std::stoi(previous().value));
    if (match(TokenType::STRING_LITERAL))
        return std::make_unique<StringExpr>(previous().value);
    if (match(TokenType::IDENTIFIER))
        return std::make_unique<VariableExpr>(previous().value);
    if (match(TokenType::LPAREN)) {
        auto expr = expression();
        match(TokenType::RPAREN);
        return expr;
    }
    throw std::runtime_error("Invalid expression");
}
