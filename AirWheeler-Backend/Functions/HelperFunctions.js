
const { cloudinary } = require("../Cloudinary/cloudinary");
const { extractPublicId } = require("cloudinary-build-url");
const { Banners } = require("../Model/Banners");
const nodemailer = require('nodemailer');
const delImg = async (imageUrl) => {

    let publicKey = []
    imageUrl.forEach(url => {
        const publicId = extractPublicId(url)
        publicKey.push(publicId)
    });

    await cloudinary.api.delete_resources(publicKey, (error, result) => {
        if (error) {
            return false
        }

    }
    )
    return true



}
function getFrontendHost(req) {
    // Prefer Origin (CORS), fallback to Referer (full page URL)
    const hdr = req.headers.origin || req.headers.referer || '';
    try {
        const { host } = new URL(hdr);
        return host; // e.g., 'uk.libertyairwheel.com'
    } catch {
        return null;
    }
}




const RegionalBanner = async (url) => {
    // Remove leading 'www.' if present



    let cleaned = url.replace(/^www\./, '');
    // Remove the domain part if present
    cleaned = cleaned.replace(/\.?libertyairwheel\.com$/, '');
    // If anything remains, it's the region
    // Remove trailing dot (if present)
    cleaned = cleaned.replace(/\.$/, '');
    let key = (cleaned === '' || cleaned === 'libertyairwheel') ? -1 : cleaned;
    let result = ''
    if (key != -1) {
        result = await Banners.find({ region: key })
        if (result.length == 0) {
            result = await Banners.find({ region: 'int' })

        }

        return result
    }
    result = await Banners.find({ region: 'int' })
    return result



}


const sendEmail=async (data)=>{
    try {
            const {name,email,phone,subject,description}=data

            
            
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || "smtp.hostinger.com",
                port: Number(process.env.SMTP_PORT || 465), // 465=SSL, 587=STARTTLS
                secure: process.env.SMTP_PORT === "465",    // true for 465, false for 587
                auth: {
                user: process.env.SMTP_USER, // full mailbox, e.g. info@yourdomain.com
                pass: process.env.SMTP_PASS, // that mailbox's password
                },
                // optional diagnostics
                // logger: true,
                // debug: true,
            });

        
            // console.log(process.env.TO_EMAIL.split(","),'Type of ',typeof(process.env.TO_EMAIL.split(",")))
            // return
           const ToTheAuthority = {
    from: process.env.SMTP_USER,
    to: process.env.TO_EMAIL.split(","),
    subject: `🚀 New Lead: ${name} via Liberty Air Wheel`,
    text: `
        New Lead Notification
        -----------------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${description}
    `,
    html: `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="padding: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0;">
                        <tr>
                            <td style="background-color: #ff842b; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                                <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Inquiry Received</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px;">
                                <p style="margin-top: 0; color: #666;">You have a new message from the website contact form:</p>
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 100px; font-weight: bold; color: #333;">Name:</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${name}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Email:</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">
                                            <a href="mailto:${email}" style="color: #ff842b; text-decoration: none;">${email}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Phone:</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">
                                            <a href="tel:${phone}" style="color: #ff842b; text-decoration: none;">${phone}</a>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Subject:</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">
                                            <a href="tel:${subject}" style="color: #ff842b; text-decoration: none;">${subject}</a>
                                        </td>
                                    </tr>
                                </table>

                                <div style="margin-top: 25px;">
                                    <p style="font-weight: bold; color: #333; margin-bottom: 10px;">Message Description:</p>
                                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ff842b; color: #555; line-height: 1.6; font-style: italic;">
                                        ${description}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 15px; background-color: #f4f4f7; text-align: center; font-size: 11px; color: #999; border-radius: 0 0 8px 8px;">
                                This is an automated notification from the <strong>Liberty Air Wheel Website</strong> Server.
                                <br>Received on: ${new Date().toLocaleString()}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
    envelope: {
        from: process.env.SMTP_USER,
        to: process.env.TO_EMAIL.split(","),
    },
};
const ToCustomer = {
    from: process.env.SMTP_USER,
    to: email, 
    subject: 'Thank you for contacting Liberty Air Wheel',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Mobile Responsiveness */
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; padding: 10px !important; }
                .content-padding { padding: 20px !important; }
                .logo-text { font-size: 24px !important; }
            }
            /* General Resets */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f4f7; }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="padding: 40px 10px;" class="content-padding">
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                        
                        <tr>
                            <td align="center" style="padding: 40px 0 20px 0;">
                                <div class="logo-text" style="font-size: 28px; letter-spacing: -0.5px; color: #333333; font-weight: 300;">
                                    <span style="font-weight: 800; color: #ff842b;">Liberty AirWheel</span>
                                </div>
                                <div style="width: 40px; height: 3px; background-color: #ff842b; margin-top: 10px; border-radius: 2px;"></div>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 20px 40px 40px 40px; color: #444444; line-height: 1.8;" class="content-padding">
                                <h1 style="margin: 0 0 15px 0; font-size: 22px; font-weight: 700; color: #1a1a1a; text-align: center;">
                                    Hello! We've received your inquiry.
                                </h1>
                                
                                <p style="margin: 0 0 20px 0; font-size: 16px; text-align: center; color: #555555;">
                                    Thank you for reaching out to us. Our team is currently reviewing your message and we will get back to you within one business day.
                                </p>
                                
                                <p style="margin: 0 0 30px 0; font-size: 15px; text-align: center; color: #777777;">
                                    Discover how we drive digital innovation and build custom software solutions tailored to your business needs.
                                </p>

                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td align="center">
                                      <a href="https://www.libertyairwheel.com" target="_blank" style="background-color: #ff842b; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold; display: inline-block;">
                                          Explore Our Services
                                      </a>
                                    </td>
                                  </tr>
                                </table>

                                <p style="margin: 40px 0 0 0; font-size: 15px; text-align: center; border-top: 1px solid #eeeeee; padding-top: 30px;">
                                    Best regards,<br>
                                    <span style="font-weight: 700; color: #ff842b;">The Liberty Air Wheel Team</span>
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 25px 40px; background-color: #fafafa; font-size: 12px; color: #999999; text-align: center;">
                                <p style="margin: 0;">© ${new Date().getFullYear()} Liberty Air Wheel. All rights reserved.</p>
                                <p style="margin: 8px 0 0 0;">
                                    <a href="https://www.libertyairwheel.com" style="color: #ff842b; text-decoration: none;">www.libertyairwheel.com</a>
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
    envelope: {
        from: process.env.SMTP_USER,
        to: email,
    },
};
            const mailToUs = await transporter.sendMail(ToTheAuthority);

            const mailToClient = await transporter.sendMail(ToCustomer);
            return [mailToUs,mailToClient]
        
     
            
        } catch (error) {
            console.log("Error From fuction",error.message);
            
            return error.message
            
        }
}




module.exports = {
    delImg, RegionalBanner,getFrontendHost,sendEmail
}