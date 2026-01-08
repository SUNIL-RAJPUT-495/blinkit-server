const verifyEmailTemplate = ({ name, code }) => {
  return `
    <p>Dear ${name}</p>
    <p>Thank you for registering to Blinkeyit</p>
   <p>${code} <p/>
  `;
};

export default verifyEmailTemplate;
