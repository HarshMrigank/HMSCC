# 🧠 HMSCC — Harsh Mrigank’s Simple C Compiler

A **from-scratch educational compiler project** that demonstrates how a C-like language is designed, analyzed, and executed — all the way from **lexical analysis to executable output**, with a planned **web-based interface**.

HMSCC is intentionally minimal, readable, and modular, making it ideal for **academic evaluation, viva explanations, and portfolio showcase**.

---

## 📌 Project Overview

**HMSCC (Harsh Mrigank’s Simple C Compiler)** is a custom-built compiler that supports a subset of the C language. The project focuses on *understanding compiler internals* rather than relying on existing compiler frameworks.

The compiler:

* Accepts source code written in a C-like syntax
* Performs lexical analysis, parsing, semantic checks
* Generates equivalent C code
* Uses `gcc` as a backend to produce and run executables

> 🎯 The primary goal is to demonstrate **deep understanding of compiler design**, not to compete with GCC/Clang.

---

## ✨ Key Features (Current)

* ✅ Custom **Lexer (Tokenizer)**
* ✅ Recursive-Descent **Parser**
* ✅ **AST (Abstract Syntax Tree)** generation
* ✅ **Semantic Analysis** with symbol table & type checking
* ✅ **Code Generation** (HMSCC → C → Executable)
* ✅ Control flow support: `if / else`, `while`
* ✅ Data types: `int`, `string`
* ✅ Proper error handling (syntax & semantic)

---

## 🗂️ Project Structure

```
compiler/
├── main.cpp                # Compiler entry point
├── lexer/                  # Lexical analysis
│   ├── token.hpp
│   ├── lexer.hpp
│   └── lexer.cpp
├── ast/                    # Abstract Syntax Tree definitions
│   └── ast.hpp
├── parser/                 # Recursive-descent parser
│   ├── parser.hpp
│   └── parser.cpp
├── semantic/               # Semantic analysis & symbol table
│   ├── semantic.hpp
│   └── semantic.cpp
├── codegen/                # Code generation (AST → C)
│   ├── codegen.hpp
│   └── codegen.cpp
└── output.c                # Generated C file (runtime)
```

---

## 🛠️ Tech Stack Used

### Core Compiler

* **C++ (Modern)** — Compiler implementation
* **GCC** — Backend compilation of generated C code

### Planned (Upcoming)

* **Node.js** — Backend API
* **HTML / CSS / JavaScript / React** — Web-based UI
* **Docker** — Secure sandboxed compilation (future)

---

## 🔄 Program Flow

```
HMSCC Source Code (.hc)
        ↓
Lexical Analysis (Lexer)
        ↓
Token Stream
        ↓
Parsing (Recursive Descent)
        ↓
Abstract Syntax Tree (AST)
        ↓
Semantic Analysis
(Symbol Table + Type Checks)
        ↓
Code Generation
(AST → Valid C Code)
        ↓
GCC Compilation
        ↓
Executable Output
```

---

## 🧩 Supported Language Subset (HMSCC)

### Data Types

* `int`
* `string`

### Statements

* Variable declaration & assignment
* `print()`
* `if / else`
* `while`
* `return`

### Example Program

```c
int main() {
  int x = 9;
  string s = "Hello HMSCC";
  print(s);

  if (x > 0) {
    print(x);
  }

  return 0;
}
```

---

## 🚧 Development Phases

### ✅ Phase 0 — Planning & Language Design

* Defined HMSCC grammar and syntax
* Decided supported features & limitations

### ✅ Phase 1 — Lexer (Tokenization)

* Implemented tokenizer for keywords, identifiers, literals, operators
* Fixed string literal edge cases

### ✅ Phase 2 — Parser & AST

* Recursive-descent parser
* Built AST nodes for expressions and statements

### ✅ Phase 3 — Semantic Analysis

* Symbol table implementation
* Type checking (`int` vs `string`)
* Undeclared / duplicate variable detection

### ✅ Phase 4 — Code Generation

* AST → C code translation
* Integrated GCC to generate executable

### ✅ Phase 5 — Control Flow & Expressions

* Added relational operators (`<, >, ==, !=`)
* Implemented `if / else` and `while`
* Fixed backend codegen edge cases

### ✅ Phase 6 — Compiler Stabilization & Polishing

* Fixed string literal handling
* Semantic-driven code generation
* Correct control-flow emission in backend
* End-to-end compiler pipeline validated

### 🔄 Phase 7 — Backend Integration (Planned)

* Wrap HMSCC as a backend service
* Execute compiler via Node.js API
* Return output and errors as structured responses

### 🔄 Phase 8 — Web-Based Interface (Planned)

* Browser-based code editor
* Run HMSCC from UI
* Display output, errors, and generated C code

### 🔄 Phase 9 — Language Personalization (Planned)

* Custom keywords (e.g., `agar`, `jabtak` instead of `if`, `while`)
* Custom operators and aliases
* Syntax mode toggle (C-like vs personalized)
* Demonstrates compiler independence from surface syntax

---

## 🔮 Future Scope & Enhancements

### 🌐 Web Application

* Web-based editor to write HMSCC code
* Run compiler from browser
* Show output, errors, and generated C code

### 🔐 Security & Scalability

* Docker-based sandbox execution
* Multi-user compilation support

### 🧠 Language Enhancements

* Custom keyword / operator modes
* Multiple functions support
* Arrays and basic data structures
* Boolean type

### 📊 Visualization (Advanced)

* Token viewer
* AST visualizer
* Step-by-step compilation stages

---

## 🎓 Academic Value

This project demonstrates:

* Strong understanding of compiler architecture
* Clean separation of compiler phases
* Practical debugging of real compiler bugs
* Ability to scale a low-level system into a web application

> HMSCC is designed to be **viva-friendly, extensible, and portfolio-ready**.

---

## 👤 Author

**Harsh Mrigank**
B.Tech — Computer Science / Engineering

---

## 📜 License

This project is for **educational and academic use**.

---

⭐ *If you find this project interesting, feel free to star the repository and explore compiler internals!*
