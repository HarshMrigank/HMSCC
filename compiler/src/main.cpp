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
    if (!file.is_open()) {
        std::cerr << "Failed to open file: " << argv[1] << "\n";
        return 1;
    }

    std::stringstream buffer;
    buffer << file.rdbuf();

    try {
        Lexer lexer(buffer.str());
        auto tokens = lexer.tokenize();

        Parser parser(tokens);
        auto ast = parser.parse();

        SemanticAnalyzer sem;
        sem.analyze(ast.get());

        CodeGenerator gen(sem.getSymbolTable());
        std::string cCode = gen.generate(ast.get());

        std::ofstream out("output.c");
        out << cCode;
        out.close();

#ifdef _WIN32
        system("gcc output.c -o output.exe");
        system("output.exe");
#else
        system("gcc output.c -o output");
        system("./output");
#endif

    } catch (const std::exception& e) {
        std::cerr << e.what() << "\n";
        return 1;
    }

    return 0;
}
