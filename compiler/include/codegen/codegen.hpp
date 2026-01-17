#ifndef CODEGEN_HPP
#define CODEGEN_HPP

#include <string>
#include <unordered_map>
#include "../ast/ast.hpp"

class CodeGenerator {
public:
    CodeGenerator(const std::unordered_map<std::string, std::string>& symbols);
    std::string generate(BlockStmt* program);

private:
    const std::unordered_map<std::string, std::string>& symbolTable;

    std::string genStmt(Stmt* stmt);
    std::string genExpr(Expr* expr);
    std::string exprType(Expr* expr);
};

#endif
