#ifndef TOKEN_HPP
#define TOKEN_HPP

#include <string>

enum class TokenType {
    // Keywords
    INT,
    STRING,
    IF,
    ELSE,
    WHILE,
    RETURN,
    PRINT,

    // Identifiers & literals
    IDENTIFIER,
    NUMBER,
    STRING_LITERAL,

    // Operators
    PLUS,
    MINUS,
    STAR,
    SLASH,
    ASSIGN,
    EQ,
    NEQ,
    LT,
    GT,
    LTE,
    GTE,

    // Delimiters
    LPAREN,
    RPAREN,
    LBRACE,
    RBRACE,
    SEMICOLON,

    END_OF_FILE,
    INVALID
};

struct Token {
    TokenType type;
    std::string value;
    int line;
};

#endif
