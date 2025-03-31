// netlify/functions/hello.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
};
exports.handler = handler;
//# sourceMappingURL=hello.js.map
