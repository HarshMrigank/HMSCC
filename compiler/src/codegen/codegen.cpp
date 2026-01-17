#include "codegen/codegen.hpp"
#include <sstream>

// Constructor
CodeGenerator::CodeGenerator(
    const std::unordered_map<std::string, std::string>& symbols)
    : symbolTable(symbols) {}

// Entry point
std::string CodeGenerator::generate(BlockStmt* program) {
    std::stringstream out;

    out << "#include <stdio.h>\n\n";
    out << "int main() {\n";

    for (auto& stmt : program->statements) {
        out << "  " << genStmt(stmt.get());
    }

    out << "  return 0;\n";
    out << "}\n";

    return out.str();
}

// Statement codegen
std::string CodeGenerator::genStmt(Stmt* stmt) {

    // Variable declaration
    if (auto decl = dynamic_cast<VarDeclStmt*>(stmt)) {
        std::stringstream ss;
        if (decl->type == "string")
            ss << "char* ";
        else
            ss << "int ";
        ss << decl->name << " = " << genExpr(decl->init.get()) << ";\n";
        return ss.str();
    }

    // Assignment
    if (auto assign = dynamic_cast<AssignStmt*>(stmt)) {
        return assign->name + " = " + genExpr(assign->value.get()) + ";\n";
    }

    // Print
    if (auto print = dynamic_cast<PrintStmt*>(stmt)) {
        std::stringstream ss;
        std::string type = exprType(print->expr.get());

        if (type == "string")
            ss << "printf(\"%s\\n\", " << genExpr(print->expr.get()) << ");\n";
        else
            ss << "printf(\"%d\\n\", " << genExpr(print->expr.get()) << ");\n";

        return ss.str();
    }

    // IF STATEMENT  ✅ FIX
    if (auto ifs = dynamic_cast<IfStmt*>(stmt)) {
        std::stringstream ss;
        ss << "if (" << genExpr(ifs->condition.get()) << ") {\n";
        for (auto& s : ifs->thenBlock->statements)
            ss << "  " << genStmt(s.get());
        ss << "}";

        if (ifs->elseBlock) {
            ss << " else {\n";
            for (auto& s : ifs->elseBlock->statements)
                ss << "  " << genStmt(s.get());
            ss << "}";
        }

        ss << "\n";
        return ss.str();
    }

    // WHILE LOOP  ✅ FIX
    if (auto loop = dynamic_cast<WhileStmt*>(stmt)) {
        std::stringstream ss;
        ss << "while (" << genExpr(loop->condition.get()) << ") {\n";
        for (auto& s : loop->body->statements)
            ss << "  " << genStmt(s.get());
        ss << "}\n";
        return ss.str();
    }

    // RETURN STATEMENT
    if (auto ret = dynamic_cast<ReturnStmt*>(stmt)) {
        return "return " + genExpr(ret->value.get()) + ";\n";
    }

    return "";
}


// Expression codegen
std::string CodeGenerator::genExpr(Expr* expr) {

    if (auto num = dynamic_cast<NumberExpr*>(expr))
        return std::to_string(num->value);

    if (auto str = dynamic_cast<StringExpr*>(expr))
        return "\"" + str->value + "\"";

    if (auto var = dynamic_cast<VariableExpr*>(expr))
        return var->name;

    // Arithmetic expressions
    if (auto bin = dynamic_cast<BinaryExpr*>(expr)) {
        return "(" + genExpr(bin->left.get()) + " " +
               bin->op + " " +
               genExpr(bin->right.get()) + ")";
    }

    // ✅ RELATIONAL EXPRESSIONS (THIS WAS MISSING)
    if (auto rel = dynamic_cast<RelationalExpr*>(expr)) {
        return "(" + genExpr(rel->left.get()) + " " +
               rel->op + " " +
               genExpr(rel->right.get()) + ")";
    }

    return "";
}

// Expression type inference
std::string CodeGenerator::exprType(Expr* expr) {

    if (dynamic_cast<NumberExpr*>(expr)) return "int";
    if (dynamic_cast<StringExpr*>(expr)) return "string";

    if (auto var = dynamic_cast<VariableExpr*>(expr))
        return symbolTable.at(var->name);

    if (dynamic_cast<BinaryExpr*>(expr))
        return "int";

    return "int";
}
