// const { ApolloServer, gql } = require("apollo-server");

// // your same questions
// const codingQuestions = [
//   {
//     id: "1",
//     text: "What will be the output...",
//     code: `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }`,
//     answers: ["0,1,2", "3,3,3", "0,0,0", "1,2,3"],
//     correct: 1,
//   },
//   {
//         id: 2,
//         text: "Which of these is NOT a JavaScript data type?",
//         code: "",
//         answers: ["undefined", "boolean", "float", "symbol"],
//         correct: 2
//     },
//     {
//         id: 3,
//         text: "What does the following Python code output?",
//         code: `x = [1, 2, 3]
// y = x
// y.append(4)
// print(x)`,
//         answers: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 3, 2, 1]", "Error"],
//         correct: 1
//     },
//     {
//         id: 4,
//         text: "What is the time complexity of accessing an element in an array by index?",
//         code: "",
//         answers: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
//         correct: 0
//     },
//     {
//         id: 5,
//         text: "Which CSS selector has the highest specificity?",
//         code: "",
//         answers: ["#header .menu li:hover", "body #header .menu", "#header.nav", "div#header.menu"],
//         correct: 3
//     },
//     {
//         id: 6,
//         text: "What will this Java code output?",
//         code: `String s1 = "Hello";
// String s2 = "Hello";
// String s3 = new String("Hello");
// System.out.println(s1 == s2);
// System.out.println(s1 == s3);`,
//         answers: ["true, true", "false, false", "true, false", "false, true"],
//         correct: 2
//     },
//     {
//         id: 7,
//         text: "What is the purpose of the 'use strict' directive in JavaScript?",
//         code: "",
//         answers: [
//             "To enable faster execution of code",
//             "To enforce stricter parsing and error handling",
//             "To enable experimental features",
//             "To disable all warnings"
//         ],
//         correct: 1
//     },
//     {
//         id: 8,
//         text: "Which algorithm uses a divide and conquer approach?",
//         code: "",
//         answers: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
//         correct: 1
//     },
//     {
//         id: 9,
//         text: "What does the following SQL query do?",
//         code: `SELECT COUNT(*), country 
// FROM Users 
// GROUP BY country 
// HAVING COUNT(*) > 10;`,
//         answers: [
//             "Counts all users from countries with more than 10 users",
//             "Counts users from the first 10 countries",
//             "Selects 10 users from each country",
//             "Counts users where country ID is greater than 10"
//         ],
//         correct: 0
//     },
//     {
//         id: 10,
//         text: "What is the output of this C++ code?",
//         code: `#include <iostream>
// using namespace std;

// int main() {
//     int x = 5;
//     cout << x++ + ++x;
//     return 0;
// }`,
//         answers: ["10", "11", "12", "Undefined behavior"],
//         correct: 3
//     }
//   // ... add everything
// ];

// const typeDefs = gql`
//   type Question {
//     id: ID!
//     text: String!
//     code: String
//     answers: [String!]!
//     correct: Int!
//   }

//   type Query {
//     questions: [Question!]!
//   }
// `;

// const resolvers = {
//   Query: {
//     questions: () => codingQuestions,
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });

// server.listen({ port: 4000 }).then(({ url }) => {
//   console.log("GraphQL running at", url);
// });
const { ApolloServer, gql } = require("apollo-server");
const cors = require("cors");

// ===== SAMPLE DATA =====
const codingQuestions = [
  {
    id: "1",
    text: "What will be the output...",
    code: `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }`,
    answers: ["0,1,2", "3,3,3", "0,0,0", "1,2,3"],
    correct: 1,
  },
  {
    id: "2",
    text: "Which of these is NOT a JavaScript data type?",
    code: "",
    answers: ["undefined", "boolean", "float", "symbol"],
    correct: 2,
  },
  {
    id: "3",
    text: "What does the following Python code output?",
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
    answers: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 3, 2, 1]", "Error"],
    correct: 1,
  },
  {
    id: "4",
    text: "What is the time complexity of accessing an element in an array by index?",
    code: "",
    answers: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correct: 0,
  },
  {
    id: "5",
    text: "Which CSS selector has the highest specificity?",
    code: "",
    answers: ["#header .menu li:hover", "body #header .menu", "#header.nav", "div#header.menu"],
    correct: 3,
  },
  {
    id: "6",
    text: "What will this Java code output?",
    code: `String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");
System.out.println(s1 == s2);
System.out.println(s1 == s3);`,
    answers: ["true, true", "false, false", "true, false", "false, true"],
    correct: 2,
  },
  {
    id: "7",
    text: "What is the purpose of the 'use strict' directive in JavaScript?",
    code: "",
    answers: [
      "To enable faster execution of code",
      "To enforce stricter parsing and error handling",
      "To enable experimental features",
      "To disable all warnings"
    ],
    correct: 1
  },
  {
    id: "8",
    text: "Which algorithm uses a divide and conquer approach?",
    code: "",
    answers: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
    correct: 1
  },
  {
    id: "9",
    text: "What does the following SQL query do?",
    code: `SELECT COUNT(*), country 
FROM Users 
GROUP BY country 
HAVING COUNT(*) > 10;`,
    answers: [
      "Counts all users from countries with more than 10 users",
      "Counts users from the first 10 countries",
      "Selects 10 users from each country",
      "Counts users where country ID is greater than 10"
    ],
    correct: 0
  },
  {
    id: "10",
    text: "What is the output of this C++ code?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    cout << x++ + ++x;
    return 0;
}`,
    answers: ["10", "11", "12", "Undefined behavior"],
    correct: 3
  }
];

// ===== GRAPHQL SCHEMA =====
const typeDefs = gql`
  type Question {
    id: ID!
    text: String!
    code: String
    answers: [String!]!
    correct: Int!
  }

  type Query {
    questions: [Question!]!
  }
`;

// ===== RESOLVERS =====
const resolvers = {
  Query: {
    questions: () => codingQuestions,
  },
};

// ===== APOLLO SERVER =====
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: [
      "http://localhost:5173",
      "https://online-quiz-system-react-front.onrender.com"
    ],
    credentials: true,
  }
});

// ===== START SERVER =====
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log("🚀 GraphQL Server Ready:", url);
});
