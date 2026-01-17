#ifndef AST_HPP
#define AST_HPP

#include <string>
#include <vector>
#include <memory>

struct ASTNode {
    virtual ~ASTNode() = default;
};

// ===== EXPRESSIONS =====
struct Expr : ASTNode {};

struct NumberExpr : Expr {
    int value;
    NumberExpr(int v) : value(v) {}
};

struct StringExpr : Expr {
    std::string value;
    StringExpr(const std::string& v) : value(v) {}
};

struct VariableExpr : Expr {
    std::string name;
    VariableExpr(const std::string& n) : name(n) {}
};

struct BinaryExpr : Expr {
    std::string op;
    std::unique_ptr<Expr> left, right;

    BinaryExpr(std::string o, std::unique_ptr<Expr> l, std::unique_ptr<Expr> r)
        : op(o), left(std::move(l)), right(std::move(r)) {}
};

struct RelationalExpr : Expr {
    std::string op;
    std::unique_ptr<Expr> left, right;

    RelationalExpr(std::string o, std::unique_ptr<Expr> l, std::unique_ptr<Expr> r)
        : op(o), left(std::move(l)), right(std::move(r)) {}
};

// ===== STATEMENTS =====
struct Stmt : ASTNode {};

struct PrintStmt : Stmt {
    std::unique_ptr<Expr> expr;
    PrintStmt(std::unique_ptr<Expr> e) : expr(std::move(e)) {}
};

struct VarDeclStmt : Stmt {
    std::string type, name;
    std::unique_ptr<Expr> init;

    VarDeclStmt(std::string t, std::string n, std::unique_ptr<Expr> i)
        : type(t), name(n), init(std::move(i)) {}
};

struct AssignStmt : Stmt {
    std::string name;
    std::unique_ptr<Expr> value;

    AssignStmt(std::string n, std::unique_ptr<Expr> v)
        : name(n), value(std::move(v)) {}
};

struct ReturnStmt : Stmt {
    std::unique_ptr<Expr> value;
    ReturnStmt(std::unique_ptr<Expr> v) : value(std::move(v)) {}
};

struct BlockStmt : Stmt {
    std::vector<std::unique_ptr<Stmt>> statements;
};

struct IfStmt : Stmt {
    std::unique_ptr<Expr> condition;
    std::unique_ptr<BlockStmt> thenBlock;
    std::unique_ptr<BlockStmt> elseBlock;

    IfStmt(std::unique_ptr<Expr> c,
           std::unique_ptr<BlockStmt> t,
           std::unique_ptr<BlockStmt> e = nullptr)
        : condition(std::move(c)), thenBlock(std::move(t)), elseBlock(std::move(e)) {}
};

struct WhileStmt : Stmt {
    std::unique_ptr<Expr> condition;
    std::unique_ptr<BlockStmt> body;

    WhileStmt(std::unique_ptr<Expr> c, std::unique_ptr<BlockStmt> b)
        : condition(std::move(c)), body(std::move(b)) {}
};

#endif
