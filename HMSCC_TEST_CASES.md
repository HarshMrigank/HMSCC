// HMSCC Example Programs - Test Cases

// ==============================================================
// Test 1: Basic Hello World with HMSCC Keywords
// ==============================================================

/*
HMSCC Code:
arena () {
    speak 42;
}

Generated C:
#include <stdio.h>

int main() {
  printf("%d\n", 42);
  return 0;
}

Expected Output:
42
*/

// ==============================================================
// Test 2: Variable Declaration with HMSCC Types
// ==============================================================

/*
HMSCC Code:
arena () {
    power x = 10;
    flow y = 3.14;
    note c = 'A';
    text message = "Hello";
    
    speak x;
    speak y;
}

Generated C:
#include <stdio.h>

int main() {
  int x = 10;
  float y = 3.14;
  char c = 'A';
  char* message = "Hello";
  printf("%d\n", x);
  printf("%f\n", y);
  return 0;
}

Expected Output:
10
3.140000
*/

// ==============================================================
// Test 3: If Statement with 'think' and 'otherwise'
// ==============================================================

/*
HMSCC Code:
arena () {
    power age = 18;
    
    think (age >= 18) {
        speak 1;
    } otherwise {
        speak 0;
    }
}

Generated C:
#include <stdio.h>

int main() {
  int age = 18;
  if (age >= 18) {
      printf("%d\n", 1);
  } else {
      printf("%d\n", 0);
  }
  return 0;
}

Expected Output:
1
*/

// ==============================================================
// Test 4: While Loop with 'repeat'
// ==============================================================

/*
HMSCC Code:
arena () {
    power counter = 1;
    
    repeat (counter <= 5) {
        speak counter;
        counter = counter + 1;
    }
}

Generated C:
#include <stdio.h>

int main() {
  int counter = 1;
  while (counter <= 5) {
      printf("%d\n", counter);
      counter = (counter + 1);
  }
  return 0;
}

Expected Output:
1
2
3
4
5
*/

// ==============================================================
// Test 5: Mixed Standard and HMSCC Keywords
// ==============================================================

/*
HMSCC Code:
int main() {
    power x = 100;
    
    think (x == 100) {
        speak x;
    }
}

Generated C:
#include <stdio.h>

int main() {
  int x = 100;
  if (x == 100) {
      printf("%d\n", x);
  }
  return 0;
}

Expected Output:
100
*/

// ==============================================================
// Test 6: Nested Control Structures
// ==============================================================

/*
HMSCC Code:
arena () {
    power i = 1;
    
    repeat (i <= 3) {
        power j = 1;
        
        repeat (j <= 2) {
            speak j;
            j = j + 1;
        }
        
        i = i + 1;
    }
}

Generated C:
#include <stdio.h>

int main() {
  int i = 1;
  while (i <= 3) {
      int j = 1;
      while (j <= 2) {
          printf("%d\n", j);
          j = (j + 1);
      }
      i = (i + 1);
  }
  return 0;
}

Expected Output:
1
2
1
2
1
2
*/

// ==============================================================
// Test 7: Arithmetic Operations
// ==============================================================

/*
HMSCC Code:
arena () {
    power x = 10;
    power y = 3;
    
    speak x + y;
    speak x - y;
    speak x * y;
    speak x / y;
}

Generated C:
#include <stdio.h>

int main() {
  int x = 10;
  int y = 3;
  printf("%d\n", (x + y));
  printf("%d\n", (x - y));
  printf("%d\n", (x * y));
  printf("%d\n", (x / y));
  return 0;
}

Expected Output:
13
7
30
3
*/

// ==============================================================
// Test 8: Comparison Operators
// ==============================================================

/*
HMSCC Code:
arena () {
    power a = 5;
    power b = 3;
    
    think (a > b) {
        speak 1;
    }
    
    think (a == b) {
        speak 0;
    }
    
    think (a != b) {
        speak 1;
    }
}

Generated C:
#include <stdio.h>

int main() {
  int a = 5;
  int b = 3;
  if (a > b) {
      printf("%d\n", 1);
  }
  if (a == b) {
      printf("%d\n", 0);
  }
  if (a != b) {
      printf("%d\n", 1);
  }
  return 0;
}

Expected Output:
1
1
*/

// ==============================================================
// Test 9: Variable Assignment and Modification
// ==============================================================

/*
HMSCC Code:
arena () {
    power count = 0;
    
    count = 5;
    speak count;
    
    count = count + 10;
    speak count;
    
    count = count * 2;
    speak count;
}

Generated C:
#include <stdio.h>

int main() {
  int count = 0;
  count = 5;
  printf("%d\n", count);
  count = (count + 10);
  printf("%d\n", count);
  count = (count * 2);
  printf("%d\n", count);
  return 0;
}

Expected Output:
5
15
30
*/

// ==============================================================
// Test 10: Complex Logic Flow
// ==============================================================

/*
HMSCC Code:
arena () {
    power score = 75;
    
    think (score >= 90) {
        speak 1;
    } otherwise {
        think (score >= 80) {
            speak 2;
        } otherwise {
            think (score >= 70) {
                speak 3;
            } otherwise {
                speak 4;
            }
        }
    }
}

Generated C:
#include <stdio.h>

int main() {
  int score = 75;
  if (score >= 90) {
      printf("%d\n", 1);
  } else {
      if (score >= 80) {
          printf("%d\n", 2);
      } else {
          if (score >= 70) {
              printf("%d\n", 3);
          } else {
              printf("%d\n", 4);
          }
      }
  }
  return 0;
}

Expected Output:
3
*/

// ==============================================================
// Error Test 1: Undefined Variable
// ==============================================================

/*
HMSCC Code:
arena () {
    speak undefined_var;
}

Expected Error:
line:col: error Undefined variable 'undefined_var'
*/

// ==============================================================
// Error Test 2: Type Mismatch
// ==============================================================

/*
HMSCC Code:
arena () {
    power x = 10;
    power y = "string";
}

Expected Error:
line:col: error Type mismatch in declaration of 'y'
*/

// ==============================================================
// Error Test 3: Duplicate Declaration
// ==============================================================

/*
HMSCC Code:
arena () {
    power x = 5;
    power x = 10;
}

Expected Error:
line:col: error Variable 'x' already declared
*/

// ==============================================================
// Keyword Reference
// ==============================================================

/*
Data Types:
  power  → int
  flow   → float
  note   → char
  text   → string (char*)
  silent → void

Control Flow:
  think      → if
  otherwise  → else
  grind      → for
  repeat     → while
  execute    → do
  bail       → break
  skip       → continue
  sendback   → return

I/O:
  speak  → printf
  listen → scanf

Functions:
  arena → main

Modifiers:
  solid  → const
  locked → static

Literals:
  yes → true
  no  → false
*/
