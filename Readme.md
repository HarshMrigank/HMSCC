 🧠 HMSCC — Harsh Mrigank’s Simple C Compiler

A **from-scratch educational compiler project** that demonstrates how a C-like language is designed, analyzed, executed, and exposed as a backend service — from **lexical analysis to executable output**, with a **web interface planned next**.

HMSCC is intentionally minimal, readable, and modular, making it ideal for **academic evaluation, viva explanations, and portfolio showcase**.

---

## 📌 Project Overview

**HMSCC (Harsh Mrigank’s Simple C Compiler)** is a custom-built compiler that supports a subset of the C language. The project focuses on *understanding compiler internals and real-world compiler integration* rather than relying on existing compiler frameworks.

The system now consists of:
- A **native C++ compiler**
- A **Node.js backend service** that executes the compiler
- A planned **web-based frontend**

> 🎯 The primary goal is to demonstrate **deep understanding of compiler design and system integration**, not to compete with GCC/Clang.

---

## ✨ Key Features (Current)

### Compiler (C++)
* ✅ Custom **Lexer (Tokenizer)**
* ✅ Recursive-Descent **Parser**
* ✅ **AST (Abstract Syntax Tree)** generation
* ✅ **Semantic Analysis** with symbol table & type checking
* ✅ **Code Generation** (HMSCC → C → Executable)
* ✅ Control flow support: `if / else`, `while`
* ✅ Data types: `int`, `string`
* ✅ Relational operators: `< > <= >= == !=`
* ✅ Proper error handling (syntax & semantic)

### Backend (Node.js)
* ✅ HMSCC compiled as a standalone binary
* ✅ Compiler executed via backend API
* ✅ Program output, errors, and generated C code returned as JSON
* ✅ Execution sandboxed to a temp directory
* ✅ Timeout-based safety for infinite loops

---

## 🗂️ Project Structure

HMSCC/
├── compiler/ # Core compiler (C++)
│ ├── main.cpp
│ ├── lexer/
│ ├── parser/
│ ├── ast/
│ ├── semantic/
│ └── codegen/
├── build/ # CMake build output (binary)
│ └── hmscc.exe
├── backend/ # Node.js backend (Phase 7)
│ ├── server.js
│ ├── routes/
│ ├── services/
│ └── temp/
├── CMakeLists.txt
└── README.md

yaml
Copy code

---

## 🛠️ Tech Stack Used

### Core Compiler
* **C++17**
* **CMake** — Build system
* **GCC / MinGW** — Backend compilation

### Backend
* **Node.js**
* **Express.js**
* **child_process** for compiler execution

### Planned
* **HTML / CSS / JavaScript / React** — Web UI
* **Docker** — Secure sandboxed execution

---

## 🔄 Program Flow

HMSCC Source Code (.hc)
↓
Lexer → Parser → AST
↓
Semantic Analysis
↓
C Code Generation
↓
GCC Compilation
↓
Executable Output
↓
Node.js Backend API
↓
(JSON response)

yaml
Copy code

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

---

## 🚧 Development Phases

### ✅ Phase 0–6 — Compiler Frontend & Backend
* Complete compiler pipeline implemented
* Lexer → Parser → AST → Semantic → Codegen
* Control flow, expressions, and strings stabilized

### ✅ Phase 7 — Backend Integration (COMPLETED)
* HMSCC compiled into a standalone binary
* Node.js backend executes the compiler
* Structured JSON response:
  - Program output
  - Compiler/runtime errors
  - Generated C code
* Execution sandboxed with timeouts

### 🔄 Phase 8 — Web-Based Interface (NEXT)
* Browser-based code editor
* Run HMSCC from UI
* Display output, errors, and generated C code

### 🔄 Phase 9 — Language Personalization (Planned)
* Custom keywords and operators
* Syntax mode switching
* Demonstrates compiler independence from surface syntax

---

## 🎓 Academic Value

This project demonstrates:
* Strong understanding of compiler architecture
* Real-world compiler execution via backend service
* Build system usage (CMake)
* Safe execution and error handling
* Scalable design suitable for web integration

> HMSCC is designed to be **viva-friendly, extensible, and portfolio-ready**.

---

## 👤 Author

**Harsh Mrigank**  
B.Tech — Computer Science / Engineering

---

## 📜 License

Educational and academic use only.