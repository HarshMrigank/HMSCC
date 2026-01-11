#ifndef LEXER_HPP
#define LEXER_HPP

#include <string>
#include <vector>
#include "token.hpp"

class Lexer {
public:
    Lexer(const std::string& source);
    std::vector<Token> tokenize();

private:
    char peek() const;
    char advance();
    bool isAtEnd() const;

    void skipWhitespace();
    Token identifier();
    Token number();
    Token stringLiteral();

    std::string source;
    size_t current;
    int line;
};

#endif
