import {Recover_Password} from './MailTemplates/recover_password';
import {Register_Success} from './MailTemplates/register_succesfully';
import {Shopping_cart} from './MailTemplates/shopping_registered';

export const FromMail = 'kimerinaservice@gmail.com';

export const PasswordSubject = 'Primer inicio de sesión Kimirina.';
export const PasswordHtml = (pass: string, name: string) =>
    Register_Success(name, pass);

export const PasswordRecoverSubject = 'Recuperar contraseña.';
export const PasswordRecoverHtml = (pass: string) => Recover_Password(pass);

export const ShoppingSuccessSubject =
    'Compra realizada en aplicación Kimirina.';
export const ShoppingSuccessHtml = (name: string) => Shopping_cart(name);
