interface Inputs {
  sender: string;
  name: string;
  contactEmail: string;
  formContent: string;
}

const generateText = ({ sender, contactEmail, name, formContent }: Inputs) => {
  return `Dear ${name}, 

Thank you for contacting us. This email is to notify you that your message from the contact form is well received. 

Here's the message we got from you:
${formContent}

We will get back to you as soon as possible. 

If you have questions about this email or any other enquiry, please email us directly: ${contactEmail}.

All the best, 
${sender}. 



*This is an email supported by Email.Service.Studio. Please do not reply.
@ 2024 Email.Service.Studio | email.service.studio@gmail.com
`;
};

export default generateText;
