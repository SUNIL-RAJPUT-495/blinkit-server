const verifyEmailTemplate = ({ name, url }) => {
  return `
    <p>Dear ${name}</p>
    <p>Thank you for registering to Blinkeyit</p>
   <p>{} <p/>
  `;
};

export default verifyEmailTemplate;
