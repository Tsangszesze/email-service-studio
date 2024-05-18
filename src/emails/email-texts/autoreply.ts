interface Inputs {
  sender: string;
  csEmail: string;
  name: string;
}

const generateText = ({ sender, csEmail, name }: Inputs) => {
  return `Dear ${name}, Thank you for contacting us. 
  This email is to notify you that your message from the contact form is well received. 
  We will get back to you as soon as possible. All the best, ${sender}. 
  *This is an email supported by Email.Service.Studio. 
  If you have questions about this email or any other enquiry, please do not reply but email us directly: ${csEmail}.`;
};

export default generateText;
