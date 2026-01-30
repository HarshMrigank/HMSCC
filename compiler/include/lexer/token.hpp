#ifndef TOKEN_HPP
#define TOKEN_HPP

#include <string>

enum class TokenType {
    // Data Types - HMSCC custom
    POWER,      // int
    FLOW,       // float
    NOTE,       // char
    TEXT,       // string
    SILENT,     // void

    // Control Flow - HMSCC custom
    THINK,      // if
    OTHERWISE,  // else
    GRIND,      // for
    REPEAT,     // while
    EXECUTE,    // do
    BAIL,       // break
    SKIP,       // continue
    SENDBACK,   // return

    // I/O - HMSCC custom
    SPEAK,      // printf
    LISTEN,     // scanf

    // Functions - HMSCC custom
    ARENA,      // main

    // Modifiers - HMSCC custom
    SOLID,      // const
    LOCKED,     // static

    // Literals - HMSCC custom
    YES,        // true
    NO,         // false

    // Standard keywords (kept for compatibility)
    INT,
    STRING,
    IF,
    ELSE,
    WHILE,
    RETURN,
    PRINT,
    FOR,

    // Identifiers & literals
    IDENTIFIER,
    NUMBER,
    STRING_LITERAL,

    // Operators
    PLUS,
    MINUS,
    STAR,
    SLASH,
    MOD,
    ASSIGN,
    EQ,
    NEQ,
    LT,
    GT,
    LTE,
    GTE,
    AND,
    OR,
    NOT,
    INCREMENT,
    DECREMENT,

    // Delimiters
    LPAREN,
    RPAREN,
    LBRACE,
    RBRACE,
    LBRACKET,
    RBRACKET,
    SEMICOLON,
    COMMA,
    DOT,

    END_OF_FILE,
    INVALID
};

struct Token {
    TokenType type;
    std::string value;
    int line;
    int column;
};

#endif
