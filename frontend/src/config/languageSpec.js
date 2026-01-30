// Custom HMSCC Language Specification
// This is the official contract between UI, documentation, compiler, and runtime

export const languageSpec = {
  name: 'HMSCC',
  version: '1.0',
  philosophy: `
    HMSCC is a playful, expressive C-like language designed for learners and creators.
    It maintains strict type checking and control flow like real C, but replaces keywords
    with personality-driven names that reflect confidence, creativity, and precision.
  `,

  // Keyword mappings: Standard C → Custom HMSCC
  keywords: {
    // Data types
    'int': { replacement: 'power', type: 'type', meaning: 'Integer (whole numbers)', example: 'power score = 10;' },
    'float': { replacement: 'flow', type: 'type', meaning: 'Decimal numbers', example: 'flow pi = 3.14;' },
    'char': { replacement: 'note', type: 'type', meaning: 'Single character', example: 'note letter = "A";' },
    'string': { replacement: 'text', type: 'type', meaning: 'Text/string data', example: 'text message = "Hello";' },
    
    // Control flow
    'if': { replacement: 'think', type: 'control', meaning: 'Conditional statement', example: 'think(score > 5) { ... }' },
    'else': { replacement: 'otherwise', type: 'control', meaning: 'Alternative branch', example: 'otherwise { ... }' },
    'for': { replacement: 'grind', type: 'loop', meaning: 'Counted loop (for iteration)', example: 'grind(power i = 0; i < 10; i++)' },
    'while': { replacement: 'repeat', type: 'loop', meaning: 'Conditional loop', example: 'repeat(condition) { ... }' },
    'do': { replacement: 'execute', type: 'loop', meaning: 'Do-while loop prefix', example: 'execute { ... } repeat(condition);' },
    'break': { replacement: 'bail', type: 'control', meaning: 'Exit loop early', example: 'bail;' },
    'continue': { replacement: 'skip', type: 'control', meaning: 'Skip to next iteration', example: 'skip;' },
    'return': { replacement: 'sendback', type: 'control', meaning: 'Return from function', example: 'sendback result;' },
    
    // Functions & scope
    'void': { replacement: 'silent', type: 'type', meaning: 'No return value', example: 'silent greet() { ... }' },
    'main': { replacement: 'arena', type: 'special', meaning: 'Program entry point', example: 'power arena() { ... }' },
    'static': { replacement: 'locked', type: 'modifier', meaning: 'Static/unchanging variable', example: 'locked power count = 0;' },
    'const': { replacement: 'solid', type: 'modifier', meaning: 'Immutable constant', example: 'solid power PI = 314;' },
    
    // I/O Operations
    'printf': { replacement: 'speak', type: 'io', meaning: 'Output to console', example: 'speak("Victory!");' },
    'scanf': { replacement: 'listen', type: 'io', meaning: 'Input from user', example: 'listen(score);' },
    'print': { replacement: 'speak', type: 'io', meaning: 'Output to console (simplified)', example: 'speak("Result: ", x);' },
    
    // Special keywords
    'true': { replacement: 'yes', type: 'literal', meaning: 'Boolean true', example: 'think(condition == yes)' },
    'false': { replacement: 'no', type: 'literal', meaning: 'Boolean false', example: 'think(condition == no)' },
  },

  // Operators (unchanged for clarity)
  operators: {
    arithmetic: ['+', '-', '*', '/', '%'],
    comparison: ['==', '!=', '<', '>', '<=', '>='],
    logical: ['&&', '||', '!'],
    assignment: ['=', '+=', '-=', '*=', '/='],
    increment: ['++', '--'],
  },

  // Data types available
  types: [
    { hmscc: 'power', c: 'int', description: 'Integer (32-bit)' },
    { hmscc: 'flow', c: 'float', description: 'Floating point (32-bit)' },
    { hmscc: 'note', c: 'char', description: 'Single character' },
    { hmscc: 'text', c: 'char*', description: 'String/text' },
    { hmscc: 'silent', c: 'void', description: 'No type (for functions)' },
  ],

  // Built-in functions
  builtins: [
    {
      hmscc: 'speak',
      c: 'printf',
      signature: 'speak(text message, ...)',
      description: 'Output text and values to console',
      examples: [
        'speak("Hello World");',
        'speak("Score: ", score);',
        'speak("Name: ", name, " Age: ", age);',
      ]
    },
    {
      hmscc: 'listen',
      c: 'scanf',
      signature: 'listen(& variable)',
      description: 'Read input from user',
      examples: [
        'power score; listen(& score);',
      ]
    },
  ],

  // Syntax rules
  syntax: {
    variables: 'Declared with type: power x = 10;',
    assignment: 'x = 20; // Change value',
    conditionals: 'think(condition) { ... } otherwise { ... }',
    loops: 'grind or repeat',
    functions: 'power add(power a, power b) { sendback a + b; }',
    comments: '// Single line comment',
  },

  // Error handling
  errors: {
    typeMismatch: 'Type mismatch: cannot assign {actual} to {expected}',
    undefinedVariable: 'Undefined variable: {name}',
    duplicateDefinition: 'Variable already defined: {name}',
    invalidSyntax: 'Syntax error: {detail}',
    divisionByZero: 'Division by zero',
  },

  // Example programs
  examples: [
    {
      title: 'Hello World',
      code: `power arena() {
  speak("Hello, World!");
  sendback 0;
}`,
      description: 'The simplest HMSCC program'
    },
    {
      title: 'Conditional Logic',
      code: `power arena() {
  power score = 75;
  
  think(score >= 90) {
    speak("Excellence!");
  } otherwise think(score >= 70) {
    speak("Good job!");
  } otherwise {
    speak("Keep learning.");
  }
  
  sendback 0;
}`,
      description: 'Using think/otherwise for conditions'
    },
    {
      title: 'Loop & Counter',
      code: `power arena() {
  grind(power i = 0; i < 5; i++) {
    speak("Count: ", i);
  }
  
  sendback 0;
}`,
      description: 'Using grind (for loop) to iterate'
    },
    {
      title: 'Repeat Until Condition',
      code: `power arena() {
  power x = 0;
  
  repeat(x < 10) {
    speak("x is: ", x);
    x = x + 1;
  }
  
  sendback 0;
}`,
      description: 'Using repeat (while loop) with condition'
    },
    {
      title: 'Functions',
      code: `power multiply(power a, power b) {
  sendback a * b;
}

power arena() {
  power result = multiply(6, 7);
  speak("6 * 7 = ", result);
  sendback 0;
}`,
      description: 'Define and use functions'
    },
  ],
};
