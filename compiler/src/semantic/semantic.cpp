#include "semantic/semantic.hpp"
#include <stdexcept>

// Entry point
void SemanticAnalyzer::analyze(BlockStmt* program) {
    for (auto& stmt : program->statements) {
        analyzeStmt(stmt.get());
    }
}

// Analyze a statement
void SemanticAnalyzer::analyzeStmt(Stmt* stmt) {

    // Variable declaration
    if (auto decl = dynamic_cast<VarDeclStmt*>(stmt)) {
        if (symbolTable.count(decl->name)) {
            throw std::runtime_error(
                "Semantic error: Variable '" + decl->name + "' already declared"
            );
        }

        std::string exprType = analyzeExpr(decl->init.get());
        if (exprType != decl->type) {
            throw std::runtime_error(
                "Semantic error: Type mismatch in declaration of '" + decl->name + "'"
            );
        }

        symbolTable[decl->name] = decl->type;
        return;
    }

    // Assignment
    if (auto assign = dynamic_cast<AssignStmt*>(stmt)) {
        if (!symbolTable.count(assign->name)) {
            throw std::runtime_error(
                "Semantic error: Variable '" + assign->name + "' not declared"
            );
        }

        std::string exprType = analyzeExpr(assign->value.get());
        if (exprType != symbolTable[assign->name]) {
            throw std::runtime_error(
                "Semantic error: Type mismatch in assignment to '" + assign->name + "'"
            );
        }
        return;
    }

    // Print
    if (auto print = dynamic_cast<PrintStmt*>(stmt)) {
        analyzeExpr(print->expr.get());
        return;
    }
}

// Analyze expressions
std::string SemanticAnalyzer::analyzeExpr(Expr* expr) {

    if (auto num = dynamic_cast<NumberExpr*>(expr)) {
        return "int";
    }

    if (auto str = dynamic_cast<StringExpr*>(expr)) {
        return "string";
    }

    if (auto var = dynamic_cast<VariableExpr*>(expr)) {
        if (!symbolTable.count(var->name)) {
            throw std::runtime_error(
                "Semantic error: Variable '" + var->name + "' not declared"
            );
        }
        return symbolTable[var->name];
    }

    if (auto bin = dynamic_cast<BinaryExpr*>(expr)) {
        std::string leftType = analyzeExpr(bin->left.get());
        std::string rightType = analyzeExpr(bin->right.get());

        if (leftType != "int" || rightType != "int") {
            throw std::runtime_error(
                "Semantic error: Binary operator '" + bin->op + "' requires integers"
            );
        }
        return "int";
    }

    throw std::runtime_error("Semantic error: Unknown expression");
}

const std::unordered_map<std::string, std::string>&
SemanticAnalyzer::getSymbolTable() const {
    return symbolTable;
}

