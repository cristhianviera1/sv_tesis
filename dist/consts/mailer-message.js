"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassworReceiverdHtml = exports.PasswordRecoverBody = exports.PasswordRecoverSubject = exports.PasswordHtml = exports.PasswordBody = exports.PasswordSubject = exports.FromMail = void 0;
exports.FromMail = 'kimerinaservice@gmail.com';
exports.PasswordSubject = 'Primer inicio de sesión Kimirina.';
exports.PasswordBody = (pass) => `Su contraseña es: ${pass} \n no olvide cambiarla en su primer inicio sesión.`;
exports.PasswordHtml = '<h1>Bienvenido, esperamos que nuestros productos, novedades, noticias y personal sea de gran ayuda!</h1>';
exports.PasswordRecoverSubject = 'Recuperar contraseña.';
exports.PasswordRecoverBody = (pass) => `Su nueva contraseña es: ${pass}.`;
exports.PassworReceiverdHtml = '<h1>A todos nos pasa. Recuerde cambiar la contraseña en su primer inicio de sesión.</h1>';
//# sourceMappingURL=mailer-message.js.map