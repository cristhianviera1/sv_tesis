"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingSuccessHtml = exports.ShoppingSuccessSubject = exports.PasswordRecoverHtml = exports.PasswordRecoverSubject = exports.PasswordHtml = exports.PasswordSubject = exports.FromMail = void 0;
const recover_password_1 = require("./MailTemplates/recover_password");
const register_succesfully_1 = require("./MailTemplates/register_succesfully");
const shopping_registered_1 = require("./MailTemplates/shopping_registered");
exports.FromMail = 'kimerinaservice@gmail.com';
exports.PasswordSubject = 'Primer inicio de sesión Kimirina.';
exports.PasswordHtml = (pass, name) => register_succesfully_1.Register_Success(name, pass);
exports.PasswordRecoverSubject = 'Recuperar contraseña.';
exports.PasswordRecoverHtml = (pass) => recover_password_1.Recover_Password(pass);
exports.ShoppingSuccessSubject = 'Compra realizada en aplicación Kimirina.';
exports.ShoppingSuccessHtml = (name) => shopping_registered_1.Shopping_cart(name);
//# sourceMappingURL=mailer-message.js.map