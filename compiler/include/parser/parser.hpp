#ifndef PARSER_HPP
#define PARSER_HPP

#include <vector>
#include "../lexer/token.hpp"
#include "../ast/ast.hpp"

class Parser {
public:
    Parser(const std::vector<Token>& tokens);
    std::unique_ptr<BlockStmt> parse();

private:
    const std::vector<Token>& tokens;
    size_t current = 0;

    const Token& peek() const;
    const Token& previous() const;
    bool match(TokenType type);
    bool check(TokenType type) const;
    const Token& advance();
    bool isAtEnd() const;

    std::unique_ptr<Stmt> statement();
    std::unique_ptr<Stmt> declaration();
    std::unique_ptr<Stmt> assignment();
    std::unique_ptr<Stmt> printStatement();
    std::unique_ptr<Stmt> ifStatement();
    std::unique_ptr<Stmt> whileStatement();
    std::unique_ptr<Stmt> returnStatement();
    std::unique_ptr<BlockStmt> block();

    std::unique_ptr<Expr> expression();
    std::unique_ptr<Expr> equality();
    std::unique_ptr<Expr> comparison();
    std::unique_ptr<Expr> term();
    std::unique_ptr<Expr> factor();
};

#endif
