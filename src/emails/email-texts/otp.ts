interface Inputs {
  sender: string;
  name: string;
  otpContent: string;
  contactEmail: string;
}

const generateText = ({ sender, contactEmail, name, otpContent }: Inputs) => {
  return `Dear ${name}, Here is your one time password for verification: ${otpContent} 
  Please follow the instructions on the website to continue. 
  All the best, ${sender}. 
  *This is an email supported by Email.Service.Studio. 
  If you have questions about this email or any other enquiry, 
  please do not reply but email us directly: ${contactEmail}.`;
};

export default generateText;
