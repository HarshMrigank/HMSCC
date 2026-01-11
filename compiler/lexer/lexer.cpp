#include "lexer.hpp"
#include <cctype>
#include <unordered_map>

static std::unordered_map<std::string, TokenType> keywords = {
    {"int", TokenType::INT},
    {"string", TokenType::STRING},
    {"if", TokenType::IF},
    {"else", TokenType::ELSE},
    {"while", TokenType::WHILE},
    {"return", TokenType::RETURN},
    {"print", TokenType::PRINT}
};

Lexer::Lexer(const std::string& src)
    : source(src), current(0), line(1) {}

char Lexer::peek() const {
    if (isAtEnd()) return '\0';
    return source[current];
}

char Lexer::advance() {
    return source[current++];
}

bool Lexer::isAtEnd() const {
    return current >= source.length();
}

void Lexer::skipWhitespace() {
    while (!isAtEnd()) {
        char c = peek();
        if (c == ' ' || c == '\t' || c == '\r') {
            advance();
        } else if (c == '\n') {
            line++;
            advance();
        } else {
            break;
        }
    }
}

Token Lexer::identifier() {
    size_t start = current;
    while (isalnum(peek()) || peek() == '_') advance();

    std::string text = source.substr(start, current - start);
    auto it = keywords.find(text);

    if (it != keywords.end()) {
        return {it->second, text, line};
    }

    return {TokenType::IDENTIFIER, text, line};
}

Token Lexer::number() {
    size_t start = current;
    while (isdigit(peek())) advance();

    return {TokenType::NUMBER, source.substr(start, current - start), line};
}

Token Lexer::stringLiteral() {
    size_t start = current;

    while (!isAtEnd() && peek() != '"') {
        if (peek() == '\n') line++;
        advance();
    }

    std::string value = source.substr(start, current - start);
    advance(); // consume closing "

    return {TokenType::STRING_LITERAL, value, line};
}

std::vector<Token> Lexer::tokenize() {
    std::vector<Token> tokens;

    while (!isAtEnd()) {
        skipWhitespace();
        if (isAtEnd()) break;

        char c = advance();

        switch (c) {
            case '+': tokens.push_back({TokenType::PLUS, "+", line}); break;
            case '-': tokens.push_back({TokenType::MINUS, "-", line}); break;
            case '*': tokens.push_back({TokenType::STAR, "*", line}); break;
            case '/': tokens.push_back({TokenType::SLASH, "/", line}); break;

            case '=':
                if (peek() == '=') {
                    advance();
                    tokens.push_back({TokenType::EQ, "==", line});
                } else {
                    tokens.push_back({TokenType::ASSIGN, "=", line});
                }
                break;

            case '!':
                if (peek() == '=') {
                    advance();
                    tokens.push_back({TokenType::NEQ, "!=", line});
                } else {
                    tokens.push_back({TokenType::INVALID, "!", line});
                }
                break;

            case '<':
                if (peek() == '=') {
                    advance();
                    tokens.push_back({TokenType::LTE, "<=", line});
                } else {
                    tokens.push_back({TokenType::LT, "<", line});
                }
                break;

            case '>':
                if (peek() == '=') {
                    advance();
                    tokens.push_back({TokenType::GTE, ">=", line});
                } else {
                    tokens.push_back({TokenType::GT, ">", line});
                }
                break;

            case '(':
                tokens.push_back({TokenType::LPAREN, "(", line}); break;
            case ')':
                tokens.push_back({TokenType::RPAREN, ")", line}); break;
            case '{':
                tokens.push_back({TokenType::LBRACE, "{", line}); break;
            case '}':
                tokens.push_back({TokenType::RBRACE, "}", line}); break;
            case ';':
                tokens.push_back({TokenType::SEMICOLON, ";", line}); break;
            case '"':
                tokens.push_back(stringLiteral()); break;

            default:
                if (isalpha(c) || c == '_') {
                    current--;
                    tokens.push_back(identifier());
                } else if (isdigit(c)) {
                    current--;
                    tokens.push_back(number());
                } else {
                    tokens.push_back({TokenType::INVALID, std::string(1, c), line});
                }
        }

    }

    tokens.push_back({TokenType::END_OF_FILE, "", line});
    return tokens;
}
