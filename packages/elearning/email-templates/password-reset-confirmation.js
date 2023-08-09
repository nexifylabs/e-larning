// import baseUrl from "@/utils/baseUrl";
// import { transport } from "./config";

// const { MANDRILL_EMAIL_SENDER } = process.env

// export const passwordResetConfirmation = async (password, name, email) => {
//     // console.log(password)

//     const data = {
//         to: email,
//         from: `Escola Sorvete <${MANDRILL_EMAIL_SENDER}>`,
//         subject: "Password Reset Confirmation",
//         html: `
//         <!DOCTYPE html>
//             <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//             <head>
//                 <meta charset="utf-8"> <!-- utf-8 works for most cases -->
//                 <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
//                 <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
//                 <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
//                 <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

//                 <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">

//                 <!-- CSS Reset : BEGIN -->
//                 <style>

//                     /* What it does: Remove spaces around the email design added by some email clients. */
//                     /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
//                     html,
//             body {
//                 margin: 0 auto !important;
//                 padding: 0 !important;
//                 height: 100% !important;
//                 width: 100% !important;
//                 background: #f1f1f1;
//             }

//             /* What it does: Stops email clients resizing small text. */
//             * {
//                 -ms-text-size-adjust: 100%;
//                 -webkit-text-size-adjust: 100%;
//             }

//             /* What it does: Centers email on Android 4.4 */
//             div[style*="margin: 16px 0"] {
//                 margin: 0 !important;
//             }

//             /* What it does: Stops Outlook from adding extra spacing to tables. */
//             table,
//             td {
//                 mso-table-lspace: 0pt !important;
//                 mso-table-rspace: 0pt !important;
//             }

//             /* What it does: Fixes webkit padding issue. */
//             table {
//                 border-spacing: 0 !important;
//                 border-collapse: collapse !important;
//                 table-layout: fixed !important;
//                 margin: 0 auto !important;
//             }

//             /* What it does: Uses a better rendering method when resizing images in IE. */
//             img {
//                 -ms-interpolation-mode:bicubic;
//             }

//             /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
//             a {
//                 text-decoration: none;
//             }

//             /* What it does: A work-around for email clients meddling in triggered links. */
//             *[x-apple-data-detectors],  /* iOS */
//             .unstyle-auto-detected-links *,
//             .aBn {
//                 border-bottom: 0 !important;
//                 cursor: default !important;
//                 color: inherit !important;
//                 text-decoration: none !important;
//                 font-size: inherit !important;
//                 font-family: inherit !important;
//                 font-weight: inherit !important;
//                 line-height: inherit !important;
//             }

//             /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
//             .a6S {
//                 display: none !important;
//                 opacity: 0.01 !important;
//             }

//             /* What it does: Prevents Gmail from changing the text color in conversation threads. */
//             .im {
//                 color: inherit !important;
//             }

//             /* If the above doesn't work, add a .g-img class to any image in question. */
//             img.g-img + div {
//                 display: none !important;
//             }

//             /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
//             /* Create one of these media queries for each additional viewport size you'd like to fix */

//             /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
//             @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
//                 u ~ div .email-container {
//                     min-width: 320px !important;
//                 }
//             }
//             /* iPhone 6, 6S, 7, 8, and X */
//             @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
//                 u ~ div .email-container {
//                     min-width: 375px !important;
//                 }
//             }
//             /* iPhone 6+, 7+, and 8+ */
//             @media only screen and (min-device-width: 414px) {
//                 u ~ div .email-container {
//                     min-width: 414px !important;
//                 }
//             }
//                 </style>

//                 <!-- CSS Reset : END -->

//                 <!-- Progressive Enhancements : BEGIN -->
//                 <style>

//                     .primary{
//                 background: #17bebb;
//             }
//             .bg_white{
//                 background: #ffffff;
//             }
//             .bg_light{
//                 background: #f7fafa;
//             }
//             .bg_black{
//                 background: #000000;
//             }
//             .bg_dark{
//                 background: rgba(0,0,0,.8);
//             }
//             .email-section{
//                 padding:2.5em;
//             }

//             /*BUTTON*/
//             .btn{
//                 padding: 10px 15px;
//                 display: inline-block;
//             }
//             .btn.btn-primary{
//                 border-radius: 5px;
//                 background: #17bebb;
//                 color: #ffffff;
//             }
//             .btn.btn-white{
//                 border-radius: 5px;
//                 background: #ffffff;
//                 color: #000000;
//             }
//             .btn.btn-white-outline{
//                 border-radius: 5px;
//                 background: transparent;
//                 border: 1px solid #fff;
//                 color: #fff;
//             }
//             .btn.btn-black-outline{
//                 border-radius: 0px;
//                 background: transparent;
//                 border: 2px solid #000;
//                 color: #000;
//                 font-weight: 700;
//             }
//             .btn-custom{
//                 color: rgba(0,0,0,.3);
//                 text-decoration: underline;
//             }

//             h1,h2,h3,h4,h5,h6{
//                 font-family: 'Work Sans', sans-serif;
//                 color: #000000;
//                 margin-top: 0;
//                 font-weight: 400;
//             }

//             body{
//                 font-family: 'Work Sans', sans-serif;
//                 font-weight: 400;
//                 font-size: 15px;
//                 line-height: 1.8;
//                 color: rgba(0,0,0,.4);
//             }

//             a{
//                 color: #17bebb;
//             }

//             table{
//             }
//             /*LOGO*/

//             .logo h1{
//                 margin: 0;
//             }
//             .logo h1 a{
//                 color: #17bebb;
//                 font-size: 24px;
//                 font-weight: 700;
//                 font-family: 'Work Sans', sans-serif;
//             }

//             /*HERO*/
//             .hero{
//                 position: relative;
//                 z-index: 0;
//             }

//             .hero .text{
//                 color: rgba(0,0,0,.3);
//             }
//             .hero .text h2{
//                 color: #000;
//                 font-size: 34px;
//                 margin-bottom: 15px;
//                 font-weight: 300;
//                 line-height: 1.2;
//             }
//             .hero .text h3{
//                 font-size: 24px;
//                 font-weight: 200;
//             }
//             .hero .text h2 span{
//                 font-weight: 600;
//                 color: #000;
//             }

//             /*PRODUCT*/
//             .product-entry{
//                 display: block;
//                 position: relative;
//                 float: left;
//                 padding-top: 20px;
//             }
//             .product-entry .text{
//                 padding-left: 20px;
//             }
//             .product-entry .text h3{
//                 margin-bottom: 0;
//                 padding-bottom: 0;
//             }
//             .product-entry .text p{
//                 margin-top: 0;
//             }
//             .product-entry img, .product-entry .text{
//                 float: left;
//             }

//             ul.social{
//                 padding: 0;
//             }
//             ul.social li{
//                 display: inline-block;
//                 margin-right: 10px;
//             }

//             /*FOOTER*/

//             .footer{
//                 border-top: 1px solid rgba(0,0,0,.05);
//                 color: rgba(0,0,0,.5);
//             }
//             .footer .heading{
//                 color: #000;
//                 font-size: 20px;
//             }
//             .footer ul{
//                 margin: 0;
//                 padding: 0;
//             }
//             .footer ul li{
//                 list-style: none;
//                 margin-bottom: 10px;
//             }
//             .footer ul li a{
//                 color: rgba(0,0,0,1);
//             }

//             @media screen and (max-width: 500px) {

//             }

//                 </style>

//             </head>

//             <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">

//                 <div>Your password is ${password}</div>

//             </body>
//             </html>
//         `,
//     };

//     try {
//         await transport.sendMail(data);
//         console.log("Email send successfully");
//         // res.status(200).send("Email send successfully")
//     } catch (error) {
//         console.log("########", error);
//         // res.status(500).send("Error proccessing charge");
//     }
//     transport.close();
// };

import baseUrl from '@/utils/baseUrl';
import { transport } from './config';

const { MANDRILL_EMAIL_SENDER } = process.env;

export const passwordResetConfirmation = async (password, name, email) => {
    // console.log(password)

    const data = {
        to: email,
        from: `Escola Sorvete <${MANDRILL_EMAIL_SENDER}>`,
        subject: 'Password Reset Confirmation',
        html: `
        <!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
    /* Base ------------------------------ */
    
    @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      -webkit-text-size-adjust: none;
    }
    
    a {
      color: #3869D4;
    }
    
    a img {
      border: none;
    }
    
    td {
      word-break: break-word;
    }
    
    .preheader {
      display: none !important;
      visibility: hidden;
      mso-hide: all;
      font-size: 1px;
      line-height: 1px;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
    }
    /* Type ------------------------------ */
    
    body,
    td,
    th {
      font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    }
    
    h1 {
      margin-top: 0;
      color: #333333;
      font-size: 22px;
      font-weight: bold;
      text-align: left;
    }
    
    h2 {
      margin-top: 0;
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    
    h3 {
      margin-top: 0;
      color: #333333;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    
    td,
    th {
      font-size: 16px;
    }
    
    p,
    ul,
    ol,
    blockquote {
      margin: .4em 0 1.1875em;
      font-size: 16px;
      line-height: 1.625;
    }
    
    p.sub {
      font-size: 13px;
    }
    /* Utilities ------------------------------ */
    
    .align-right {
      text-align: right;
    }
    
    .align-left {
      text-align: left;
    }
    
    .align-center {
      text-align: center;
    }
    
    .u-margin-bottom-none {
      margin-bottom: 0;
    }
    /* Buttons ------------------------------ */
    
    .button {
      background-color: #042241;
      border-top: 10px solid #042241;
      border-right: 18px solid #042241;
      border-bottom: 10px solid #042241;
      border-left: 18px solid #042241;
      display: inline-block;
      color: #FFF;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
      box-sizing: border-box;
    }
    
    .button--green {
      background-color: #22BC66;
      border-top: 10px solid #22BC66;
      border-right: 18px solid #22BC66;
      border-bottom: 10px solid #22BC66;
      border-left: 18px solid #22BC66;
    }
    
    .button--red {
      background-color: #FF6136;
      border-top: 10px solid #FF6136;
      border-right: 18px solid #FF6136;
      border-bottom: 10px solid #FF6136;
      border-left: 18px solid #FF6136;
    }
    
    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
        text-align: center !important;
      }
    }
    /* Attribute list ------------------------------ */
    
    .attributes {
      margin: 0 0 21px;
    }
    
    .attributes_content {
      background-color: #F4F4F7;
      padding: 16px;
    }
    
    .attributes_item {
      padding: 0;
    }
    /* Related Items ------------------------------ */
    
    .related {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .related_item {
      padding: 10px 0;
      color: #CBCCCF;
      font-size: 15px;
      line-height: 18px;
    }
    
    .related_item-title {
      display: block;
      margin: .5em 0 0;
    }
    
    .related_item-thumb {
      display: block;
      padding-bottom: 10px;
    }
    
    .related_heading {
      border-top: 1px solid #CBCCCF;
      text-align: center;
      padding: 25px 0 10px;
    }
    /* Discount Code ------------------------------ */
    
    .discount {
      width: 100%;
      margin: 0;
      padding: 24px;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #F4F4F7;
      border: 2px dashed #CBCCCF;
    }
    
    .discount_heading {
      text-align: center;
    }
    
    .discount_body {
      text-align: center;
      font-size: 15px;
    }
    /* Social Icons ------------------------------ */
    
    .social {
      width: auto;
    }
    
    .social td {
      padding: 0;
      width: auto;
    }
    
    .social_icon {
      height: 20px;
      margin: 0 8px 10px 8px;
      padding: 0;
    }
    /* Data table ------------------------------ */
    
    .purchase {
      width: 100%;
      margin: 0;
      padding: 35px 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_content {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_item {
      padding: 10px 0;
      color: #51545E;
      font-size: 15px;
      line-height: 18px;
    }
    
    .purchase_heading {
      padding-bottom: 8px;
      border-bottom: 1px solid #EAEAEC;
    }
    
    .purchase_heading p {
      margin: 0;
      color: #85878E;
      font-size: 12px;
    }
    
    .purchase_footer {
      padding-top: 15px;
      border-top: 1px solid #EAEAEC;
    }
    
    .purchase_total {
      margin: 0;
      text-align: right;
      font-weight: bold;
      color: #333333;
    }
    
    .purchase_total--label {
      padding: 0 15px 0 0;
    }
    
    body {
      background-color: #F2F4F6;
      color: #51545E;
    }
    
    p {
      color: #51545E;
    }
    
    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #F2F4F6;
    }
    
    .email-content {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    /* Masthead ----------------------- */
    
    .email-masthead {
      padding: 25px 0;
      text-align: center;
    }
    
    .email-masthead_logo {
      width: 94px;
    }
    
    .email-masthead_name {
      font-size: 16px;
      font-weight: bold;
      color: #042241;
      text-decoration: none;
      text-shadow: 0 1px 0 white;
    }
    /* Body ------------------------------ */
    
    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .email-body_inner {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #FFFFFF;
    }
    
    .email-footer {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .email-footer p {
      color: #A8AAAF;
    }
    
    .body-action {
      width: 100%;
      margin: 30px auto;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .body-sub {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #EAEAEC;
    }
    
    .content-cell {
      padding: 45px;
    }
    /*Media Queries ------------------------------ */
    
    @media only screen and (max-width: 600px) {
      .email-body_inner,
      .email-footer {
        width: 100% !important;
      }
    }
    
    @media (prefers-color-scheme: dark) {
      body,
      .email-body,
      .email-body_inner,
      .email-content,
      .email-wrapper,
      .email-masthead,
      .email-footer {
        background-color: #333333 !important;
        color: #FFF !important;
      }
      p,
      ul,
      ol,
      blockquote,
      h1,
      h2,
      h3,
      span,
      .purchase_item {
        color: #FFF !important;
      }
      .attributes_content,
      .discount {
        background-color: #222 !important;
      }
      .email-masthead_name {
        text-shadow: none !important;
      }
    }
    
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .f-fallback  {
        font-family: Arial, sans-serif;
      }
    </style>
  <![endif]-->
  </head>
  <body>
    <span class="preheader">Aqui está sua senha temporária.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="email-masthead">
                <a href="https://www.escolasorvete.com.br/" target="_BLANK" class="f-fallback email-masthead_name">
                Escola Sorvete
              </a>
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <!-- Body content -->
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <h1>Oi <span>${name}</span>,</h1>
                        <p>Recentemente, você solicitou a redefinição da senha de sua conta da Escola Sorvete. <strong>Abaixo você encontrará sua nova senha.</strong></p>
                        <!-- Action -->
                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <div>Sua nova senha é <span color='#042241'>${password}</span></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>Obrigado,
                          <br>Escola Sorvete Team</p>
                        <!-- Sub copy -->
                        
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        Escola Sorvete
                        <br>Rua Barra Funda
                        <br>209 - Barra Funda
                        <br>São Paulo - SP. 01152-000
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
    };

    try {
        await transport.sendMail(data);
        console.log('Email send successfully');
        // res.status(200).send("Email send successfully")
    } catch (error) {
        console.log('########', error);
        // res.status(500).send("Error proccessing charge");
    }
    transport.close();
};
