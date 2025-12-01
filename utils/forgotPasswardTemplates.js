const forgotPasswardTemplate = ({ name, otp }) => {
  return `
  <div>
    <p>Dear ${name},</p>
    <p>You requested a password reset. Please use the following OTP code to reset your password:</p>

    <div style="background:yellow; font-size:20px; padding:10px; font-weight:bold; display:inline-block; margin:10px 0;">
      ${otp}
    </div>

    <p>This OTP is valid for <b>1 hour</b>. Enter this code on the Blinkeyit website to continue resetting your password.</p>

    <br/><br/>
    <p>Thanks,</p>
    <p>Blinkeyit Team</p>
  </div>
  `;
};

export default forgotPasswardTemplate;
