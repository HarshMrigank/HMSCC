cmake_minimum_required(VERSION 3.16)

project(HMSCC LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(hmscc
    compiler/main.cpp
    compiler/lexer/lexer.cpp
    compiler/parser/parser.cpp
    compiler/semantic/semantic.cpp
    compiler/codegen/codegen.cpp
)

target_include_directories(hmscc PRIVATE
    compiler
    compiler/lexer
    compiler/parser
    compiler/semantic
    compiler/codegen
)

target_compile_options(hmscc PRIVATE -Wall)
