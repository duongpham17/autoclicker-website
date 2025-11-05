"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("../@utils/cors");
const helper_1 = require("../@utils/helper");
const private_1 = __importDefault(require("../routes/private"));
const public_1 = __importDefault(require("../routes/public"));
const payments_1 = __importDefault(require("../stripe/payments"));
const routes = (app) => {
    app.use(cors_1.corsPublic);
    (0, public_1.default)(app);
    app.use(cors_1.corsPrivate);
    (0, private_1.default)(app);
    (0, payments_1.default)(app);
    app.use(helper_1.errorMessage);
};
exports.default = routes;
