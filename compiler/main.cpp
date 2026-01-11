#include <iostream>
#include <fstream>
#include <sstream>

#include "lexer/lexer.hpp"
#include "parser/parser.hpp"
#include "semantic/semantic.hpp"
#include "codegen/codegen.hpp"

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: hmscc <file.hc>\n";
        return 1;
    }

    std::ifstream file(argv[1]);
    std::stringstream buffer;
    buffer << file.rdbuf();

    Lexer lexer(buffer.str());
    auto tokens = lexer.tokenize();

    try {
        Parser parser(tokens);
        auto ast = parser.parse();

        SemanticAnalyzer sem;
        sem.analyze(ast.get());

        CodeGenerator gen(sem.getSymbolTable());
        std::string cCode = gen.generate(ast.get());

        std::ofstream out("output.c");
        out << cCode;
        out.close();

        system("gcc output.c -o output.exe");
        system("output.exe");

    } catch (const std::exception& e) {
        std::cerr << e.what() << "\n";
    }
}
