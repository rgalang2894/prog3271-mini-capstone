"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// Create a connection pool.
// A pool keeps multiple connections open and reuses them.
// This is more efficient than opening a new connection for every query.
const pool = promise_1.default.createPool({
    host: "localhost", // where MySQL is running
    port: 3306, // the default MySQL port
    user: "root", // your MySQL username
    password: "", // your MySQL password
    database: "sproutly_app_db", // the database we created above
});
// Export the pool so other files can import it:
//   import pool from "./db";
exports.default = pool;
//# sourceMappingURL=db.js.map