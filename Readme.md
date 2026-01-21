# 🧠 HMSCC — Harsh Mrigank’s Simple C Compiler

HMSCC is a **from-scratch compiler system** designed as a serious **final-year engineering project**, demonstrating both **compiler internals** and **real-world system integration**.

The project intentionally prioritizes **correctness, clarity, and architectural separation** over gimmicks or over-engineering.

---

## 📌 Project Overview

**HMSCC (Harsh Mrigank’s Simple C Compiler)** is a custom-built compiler for a C-like language. The system covers the *entire compilation pipeline* — from lexical analysis to executable output — and exposes the compiler safely through a **backend API** and **web-based interface**.

> 🎯 The goal is to demonstrate *deep understanding of compiler design and deployment*, not to compete with GCC/Clang.

---

## ✨ Key Features (Current)

### 🔹 Compiler (C++)

* ✅ Custom **Lexer** (Tokenizer)
* ✅ Recursive-descent **Parser**
* ✅ **AST (Abstract Syntax Tree)** construction
* ✅ **Semantic Analysis** (symbol table, scope, type checks)
* ✅ **Code Generation** (HMSCC → C)
* ✅ Control flow: `if / else`, `while`
* ✅ Data types: `int`, `string`
* ✅ Relational operators: `< > <= >= == !=`
* ✅ Robust syntax & semantic error reporting

### 🔹 Backend (Node.js)

* ✅ HMSCC compiled as a **standalone native binary**
* ✅ Compiler executed via **Node.js backend**
* ✅ `/compile` API returns:

  * Program output (stdout)
  * Compiler/runtime errors (stderr)
  * Generated C code
* ✅ Execution sandboxed using temporary directories
* ✅ Timeout-based protection against infinite loops
* ✅ Stateless, backend-first architecture

### 🔹 Frontend (Phase 8)

* ✅ Clean web-based interface
* ✅ Browser editor for HMSCC source code
* ✅ Compile & run via backend API
* ✅ Displays output, errors, and generated C code
* ✅ Strict separation from compiler logic

---

## 🗂️ Project Structure

```
HMSCC/
├── compiler/           # Core compiler (C++)
│   ├── lexer/
│   ├── parser/
│   ├── ast/
│   ├── semantic/
│   └── codegen/
├── build/              # CMake build output
│   └── hmscc.exe
├── backend/            # Node.js backend
│   ├── routes/
│   ├── services/
│   ├── temp/
│   └── server.js
├── frontend/           # Web interface (Phase 8)
│   └── src/
├── CMakeLists.txt
└── README.md
```

---

## 🔄 End-to-End Program Flow

```
HMSCC Source Code (Browser)
        ↓
Frontend UI
        ↓ HTTP (JSON)
Node.js Backend
        ↓ exec()
HMSCC Compiler Binary
        ↓
Lexer → Parser → AST → Semantic Analysis
        ↓
C Code Generation
        ↓
System Compiler (GCC / MinGW)
        ↓
Executable Execution
        ↓
Program Output
```

---

## 🧩 Supported Language Subset (HMSCC)

### Data Types

* `int`
* `string`

### Statements & Features

* Variable declaration & assignment
* `print()`
* `if / else`
* `while`
* `return`

---

## 🚧 Development Phases

### ✅ Phase 0–6 — Compiler Core (COMPLETED)

* Lexer, Parser, AST, Semantic Analysis
* Code generation to valid C
* Control flow and expression handling
* Stable compiler internals

---

### ✅ Phase 7 — Backend Integration (COMPLETED)

* HMSCC built using **CMake**
* Compiler executed as an external binary
* Node.js backend orchestrates compilation
* Secure execution using temp directories
* Structured JSON response

---

### ✅ Phase 8 — Web-Based Interface (COMPLETED)

* Browser-based editor
* Compile & run via backend API
* Output, errors, and generated C displayed
* Frontend treated as a **pure consumer**

---

### 🔄 Phase 9 — Web Deployment & Hosting (IN PROGRESS)

**Phase 9 is being executed in parts.**

#### ✅ Phase 9.1 — Backend Deployment (COMPLETED)
* Backend deployed to production environment
* HMSCC compiler binary integrated on server
* Environment-based configuration for paths and execution
* API tested via public endpoint
* Secure execution preserved (timeouts, temp directories)

#### ⏳ Phase 9.2 — Frontend Deployment (NEXT)
* Deploy frontend build
* Connect frontend to deployed backend API
* Production environment configuration
* Final end-to-end public access


---

### 🔄 Phase 10 — Editor Improvements

* Better writing experience
* Line numbers
* Improved layout & usability
* Error visibility enhancements

---

### 🔄 Phase 11 — Navigation, Help & Documentation

* Navigation bar
* About section
* Help section explaining language usage
* Documentation for **custom language semantics**

---

### 🔄 Phase 12 — Language Customization

* Replace standard C keywords
* Introduce personalized syntax
* Demonstrate compiler independence from surface syntax

---

### 🔄 Phase 13 — Visual Identity & Final Polish

* Custom theme & styling
* Personal design language
* UI/UX refinement
* Final production-ready release

---

## 🎓 Academic Value

HMSCC demonstrates:

* Complete compiler pipeline understanding
* Native compiler execution via backend services
* Secure system-level orchestration
* Web-based exposure of low-level tools
* Strong separation of concerns

---

## 👤 Author

**Harsh Mrigank**
B.Tech — Computer Science / Engineering

---

## 📜 License

Educational and academic use only.
