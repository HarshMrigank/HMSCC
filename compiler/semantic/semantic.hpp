#ifndef SEMANTIC_HPP
#define SEMANTIC_HPP

#include <unordered_map>
#include <string>
#include "../ast/ast.hpp"

class SemanticAnalyzer {
public:
    void analyze(BlockStmt* program);
    const std::unordered_map<std::string, std::string>& getSymbolTable() const;
private:
    std::unordered_map<std::string, std::string> symbolTable;
    void analyzeStmt(Stmt* stmt);
    std::string analyzeExpr(Expr* expr);
};

#endif
