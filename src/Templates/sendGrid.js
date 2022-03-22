export  const ContactForm = (name) => {

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
     <head> 
      <meta charset="UTF-8"> 
      <meta content="width=device-width, initial-scale=1" name="viewport"> 
      <meta name="x-apple-disable-message-reformatting"> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
      <meta content="telephone=no" name="format-detection"> 
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;800&display=swap" rel="stylesheet">
      <title>Nuevo mensaje</title> 
      <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--> 
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
      <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
 
      <style type="text/css">

    *{
      font-family: 'Poppins', sans-serif;
    }

    #outlook a {
        padding:0;
    }
    .ExternalClass {
        width:100%;
    }

    button{
      font-family: 'Poppins', sans-serif;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height:100%;
    }
    .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family: 'Poppins', sans-serif;
        font-weight:inherit!important;
        line-height:inherit!important;
    }
    .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
    }
    [data-ogsb] .es-button {
        border-width:0!important;
        padding:15px 25px 15px 25px!important;
    }
    [data-ogsb] .es-button.es-button-1 {
        padding:10px 10px 15px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
    </style> 
     </head> 
     <body style="width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
      <div class="es-wrapper-color" style="background-color:#F4F4F4"> 
       <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f4f4f4"></v:fill>
                </v:background>
            <![endif]--> 
     <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collaps:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
    <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
         <td style="padding:0;Margin:0"> 
           <table cellspacing="0" cellpadding="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td cellpadding="0" cellspacing="0" border="0" style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img src="https://tagwfe.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt width="600" height="1"></td> 
             </tr> 
           </table></td> 
         </tr> 
         <tr style="border-collapse:collapse"> 
          <td class="esd-email-paddings" valign="top" style="padding:0;Margin:0"> 
           <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center" role="modules-container" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td class="esd-stripe" esd-custom-block-id="7962" align="center" style="padding:0;Margin:0"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="esd-structure" align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="modules-container" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#FFA73B;background-repeat:repeat;background-position:center top"> 
             <tr style="border-collapse:collapse"> 
              <td class="esd-stripe" esd-custom-block-id="6339" align="center" style="padding:0;Margin:0"> 
               <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="esd-structure" align="left" style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="esd-container-frame" valign="top" align="center" style="padding:0;Margin:0;width:580px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" class="module" data-type="code" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="esd-block-image" align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0px"><a href="https://www.alkemy.ml/" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px"><img src="https://tagwfe.stripocdn.email/content/guids/CABINET_b8b2ceb2a4471b8e1ad66f66fc4122e3/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="80"></a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="modules-container" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td class="esd-stripe" style="padding:0;Margin:0;background-color:#ffa73b" esd-custom-block-id="6340" bgcolor="#ffa73b" align="center"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="esd-structure" align="left" style="padding:0;Margin:0"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="esd-container-frame" valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                       <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation" class="module" data-type="code"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="esd-block-text" align="center" style="Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px"><h1 style="Margin:0;line-height:58px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#ffa73b">Hola👏 ${name}</h1></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td class="esd-block-spacer" bgcolor="#ffffff" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0"> 
                           <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td style="padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="modules-container" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td class="esd-stripe" align="center" style="padding:0;Margin:0"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="esd-structure" align="left" style="padding:0;Margin:0"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="esd-container-frame" valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                       <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:6px;background-color:#ffffff" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation" class="module" data-type="code"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="esd-block-text es-m-txt-l" bgcolor="#ffffff" align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#6aa84f;font-size:18px">Gracias por comunicarte con nosotros, nos pondremos en contacto contigo en la medida de lo posible.</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td class="esd-block-text es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#6aa84f;font-size:18px">La mejor manera de ayudar a los demás es uniendo fuerzas</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td class="esd-block-text es-m-txt-l" align="left" style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#ffa73b;font-size:18px">Attentively:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#ffa73b;font-size:18px">ONG ALKEMY</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="left" class="esd-block-button" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#FFA73B;background:#ffa73b;border-width:0px;display:block;border-radius:10px;width:auto"><a href="https://www.alkemy.ml/" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#FFA73B;border-width:10px 5px 15px;display:block;background:#FFA73B;border-radius:10px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">Visitanos</a></span></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="modules-container" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td class="esd-stripe" align="center" style="padding:0;Margin:0"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="esd-structure" align="left" style="padding:0;Margin:0"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="esd-container-frame" valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" class="module" data-type="code" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="esd-block-spacer" align="center" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0"> 
                           <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td style="padding:0;Margin:0;border-bottom:1px solid #f4f4f4;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
          `

}



export const FormRegister = ()=>{

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;800&display=swap" rel="stylesheet">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
  <![endif]-->
        <style type="text/css">

  *{
    font-family: 'Poppins', sans-serif;
  }

      body, p, div {
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #000000;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul  {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
       

  </style>
      </head>
      <body>
        <center class="wrapper" data-link-color="#000000" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
          <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
              <tr>
                <td valign="top" bgcolor="#FFFFFF" width="100%">
                  <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <!--[if mso]>
      <center>
      <table><tr><td width="600">
    <![endif]-->
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                        <tr>
                                          <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d651ef67-7f56-4ff0-bb05-fa04021373c1">
      <tbody>
        <tr>
          <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
          </td>
        </tr>
      </tbody>
    </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6bb27840-d5c1-4f5a-84e0-30eb8a115409">
      <tbody>
        <tr>
          <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
            <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="100" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/ccc1972ba75748b1/89643c0e-5e23-4ae9-8f6d-9f07bed619f3/512x512.png" height="100">
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d651ef67-7f56-4ff0-bb05-fa04021373c1.1">
      <tbody>
        <tr>
          <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7cd4c72c-c042-4c16-82f3-4aca5b1f0da3" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:50px 40px 40px 40px; line-height:28px; text-align:inherit; background-color:#f8f8f8;" height="100%" valign="top" bgcolor="#f8f8f8" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #000000; font-family: inherit; font-size: 48px">BIENVENIDO</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b5ec95f4-9902-4d4d-acdc-8952190a117f">
      <tbody>
        <tr>
          <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
            <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
              <tbody>
                <tr>
                  <td style="padding:0px 0px 10px 0px;" bgcolor="#fbde67"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b5166920-fe70-4cb5-abe8-85faa2aca93d">
      <tbody>
        <tr>
          <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
            <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="640" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/ccc1972ba75748b1/55424336-4b77-472b-bfa7-2a54531ff7d3/640x427.jpg" height="427">
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7cd4c72c-c042-4c16-82f3-4aca5b1f0da3.1" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:50px 40px 40px 40px; line-height:28px; text-align:inherit; background-color:#f8f8f8;" height="100%" valign="top" bgcolor="#f8f8f8" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-size: 24px; font-family: inherit">Gracias por registrarte en nuestra plataforma y ser parte de nuestra comunidad</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-size: 24px; font-family: inherit">Puedes ver las actividades de nuestra comunidad!</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="f4a77ac4-65c4-470a-a564-646acdd83093.1">
        <tbody>
          <tr>
            <td align="center" bgcolor="#f8f8f8" class="outer-td" style="padding:0px 0px 40px 0px; background-color:#f8f8f8;">
              <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                <tbody>
                  <tr>
                  <td align="center" bgcolor="#fbde67" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                    <a href="https://www.alkemy.ml/actividades" style="background-color:#fbde67; border:1px solid #fbde67; border-color:#fbde67; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:16px; font-weight:400; letter-spacing:0px; line-height:22px; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit; width:180px;" target="_blank">Ver nuestras actividades</a>
                  </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b0f2872b-0362-4d24-a2bf-a8f9b58f8839">
      <tbody>
        <tr>
          <td valign="top" style="padding:30px 0px 0px 0px; font-size:6px; line-height:10px; background-color:#ffffff;" align="center">
            <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
              <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
        <a role="social-icon-link" href="http://www.facebook.com" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:#000000; height:21px; width:21px;">
          <img role="social-icon" alt="Facebook" title="Facebook" src="https://mc.sendgrid.com/assets/social/white/facebook.png" style="height:21px; width:21px;" height="21" width="21">
        </a>
      </td><td style="padding: 0px 5px;" class="social-icon-column">
        <a role="social-icon-link" href="http://www.facebook.com" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#000000; height:21px; width:21px;">
          <img role="social-icon" alt="Twitter" title="Twitter" src="https://mc.sendgrid.com/assets/social/white/twitter.png" style="height:21px; width:21px;" height="21" width="21">
        </a>
      </td><td style="padding: 0px 5px;" class="social-icon-column">
        <a role="social-icon-link" href="http://www.facebook.com" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#000000; height:21px; width:21px;">
          <img role="social-icon" alt="Instagram" title="Instagram" src="https://mc.sendgrid.com/assets/social/white/instagram.png" style="height:21px; width:21px;" height="21" width="21">
        </a>
      </td><td style="padding: 0px 5px;" class="social-icon-column">
        <a role="social-icon-link" href="www.facebook.com" target="_blank" alt="LinkedIn" title="LinkedIn" style="display:inline-block; background-color:#000000; height:21px; width:21px;">
          <img role="social-icon" alt="LinkedIn" title="LinkedIn" src="https://mc.sendgrid.com/assets/social/white/linkedin.png" style="height:21px; width:21px;" height="21" width="21">
        </a>
      </td></tr></tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="0644ff51-38f7-4da6-bb03-37fee41f8046">
        <tbody>
          <tr>
            <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
              <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                <tbody>
                  <tr>
                  <td align="center" bgcolor="#f5f8fd" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="https://www.sendgrid.com/?utm_source=powered-by&utm_medium=email" style="background-color:#f5f8fd; border:1px solid #f5f8fd; border-color:#f5f8fd; border-radius:25px; border-width:1px; color:#a8b9d5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ POWERED BY TWILIO SENDGRID</a></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table></td>
                                        </tr>
                                      </table>
                                      <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>`

}