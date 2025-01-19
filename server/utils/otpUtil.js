const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const client = twilio(accountSid, authToken)

const sendOtp =  async (phoneNumber) => {
    try {

        if(!phoneNumber){
            return { message: "Phone number is required", status: 400};
        }

        const verification = await client.verify
            .v2.services(process.env.TWILIO_VERIFICATION_SERVICE_ID)
            .verifications.create({
                to: phoneNumber,
                channel: 'sms', 
                locale: 'en', 
            });

        if(verification.status === 'pending') {
            console.log(verification)
            console.log(`OTP sent to ${phoneNumber}. Status: ${verification.status}`);
            return { success:true ,message: "OTP sent successfully", status: verification.status};
        }
            
    } catch (error) {
        console.error(`Failed to send OTP: ${error.message}`);
        return { error:true, message: `Failed to send OTP: ${error}`, status: 400};
    }
}

const verifyingOtp = async (phoneNumber, code) => {
    try {

        if(!phoneNumber || !code){
            return { message: "Phone number is required", status: 400};
        }

        const verificationCheck = await client.verify
            .v2.services(process.env.TWILIO_VERIFICATION_SERVICE_ID)
            .verificationChecks.create({
                to: phoneNumber,
                code: code, 
            });

        console.log(verificationCheck)
        if (verificationCheck.status === 'approved') {
            console.log('OTP verified successfully!');
            return {success: true, message: "OTP verified successfully", status: 200 };
        } else {
            console.log(`Verification failed. Status: ${verificationCheck.status}`);
            return { success: false, message: "Verification failed",  status: 400 };
        }
    } catch (error) {
        console.error(`Failed to verify OTP: ${error.message}`);
        return { error: true, message: "Failed to verify OTP", status: 400};
    }
};

module.exports = { sendOtp , verifyingOtp};
