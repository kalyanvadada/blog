"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var blog_1 = __importDefault(require("../models/blog"));
require("es6-promise/auto");
var MySQLRepository = /** @class */ (function () {
    function MySQLRepository() {
        var config = {
            host: 'localhost',
            user: 'root',
            password: 'new_password',
            database: 'ziffichess',
            port: 3306 // MySQL default port
        };
        this.connection = mysql_1.default.createConnection(config);
    }
    MySQLRepository.prototype.getAllBlogs = function (pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var offset, query, queryParams;
            var _this = this;
            return __generator(this, function (_a) {
                offset = (pageNumber - 1) * pageSize;
                query = "SELECT id, title,LEFT(content, 100) AS content, createdAt FROM blogs LIMIT ".concat(pageSize, " OFFSET ").concat(pageNumber, " ");
                queryParams = [pageSize, offset];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.connection.query(query, queryParams, function (error, results) {
                            if (error) {
                                reject(new Error('Error executing query: ' + error.message));
                            }
                            else {
                                var blogs = results.map(function (row) { return new blog_1.default(row.id, row.title, row.content, row.createdAt); });
                                resolve(blogs);
                            }
                        });
                    })];
            });
        });
    };
    MySQLRepository.prototype.getBlogById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.connection.query('SELECT * FROM blogs WHERE id = ?', [id], function (error, results) {
                            if (error) {
                                reject(new Error('Error executing query: ' + error.message));
                            }
                            else {
                                if (results.length === 0) {
                                    resolve(null);
                                }
                                else if (results.length > 1) {
                                    reject(new Error('Multiple blogs cannot exist with the same id'));
                                }
                                else {
                                    var blogRow = results[0];
                                    var blog = new blog_1.default(blogRow.id, blogRow.title, blogRow.content, blogRow.createdAt);
                                    resolve(blog);
                                }
                            }
                        });
                    })];
            });
        });
    };
    MySQLRepository.prototype.createBlog = function (title, content) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.connection.query('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content], function (error, results) {
                            if (error) {
                                reject(new Error('Error executing query: ' + error.message));
                            }
                            else {
                                var newBlogId = results.insertId;
                                var newBlog = new blog_1.default(newBlogId, title, content, results.createdAt);
                                resolve(newBlog);
                            }
                        });
                    })];
            });
        });
    };
    MySQLRepository.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.connection.end();
                return [2 /*return*/];
            });
        });
    };
    return MySQLRepository;
}());
exports.default = MySQLRepository;
