const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const client = twilio(accountSid, authToken)
const { generateOTP } = require("otp-agent");
// const { default: V2 } = require("twilio/lib/rest/chat/V2");

const generateOtp = () => {
    return generateOTP({ length: 4, numbers: true });
}

// const sendOtp = async (phone) => {

//     try {
//         const otp = generateOtp();
//         const message = await client.messages.create({
//             body: `Your OTP is ${otp}`,
//             messagingServiceSid: process.env.TWILIO_VERIFICATION_SERVICE_ID,
//             to: phone,
//         });

//         console.log("Message Sent: ", message.sid);
//         return { message: "OTP sent successfully" }; 
//     } catch (err) {
//         console.error("Error Sending OTP: ", err);
//         throw err; 
//     }
// }   

const sendOtp =  async (phoneNumber) => {
    try {
        const verification = await client.verify
            .v2.services(process.env.TWILIO_VERIFICATION_SERVICE_ID)
            .verifications.create({
                to: phoneNumber,
                channel: 'sms', // 'sms' for text, 'call' for voice
                locale: 'en',   // Language of the message
            });

            console.log(verification)
        console.log(`OTP sent to ${phoneNumber}. Status: ${verification.status}`);
    } catch (error) {
        console.error(`Failed to send OTP: ${error.message}`);
    }
}

const verifyingOtp = async (phoneNumber, code) => {
    try {
        const verificationCheck = await client.verify
            .v2.services(process.env.TWILIO_VERIFICATION_SERVICE_ID)
            .verificationChecks.create({
                to: phoneNumber,
                code: code, 
            });

        if (verificationCheck.status === 'approved') {
            console.log('OTP verified successfully!');
            return { message: "OTP verified successfully", status: 200};
        } else {
            console.log(`Verification failed. Status: ${verificationCheck.status}`);
            return { message: "Verification failed",  status: 400 };
        }
    } catch (error) {
        console.error(`Failed to verify OTP: ${error.message}`);
    }
};

module.exports = { sendOtp , verifyingOtp};
