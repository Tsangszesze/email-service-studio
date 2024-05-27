# Email.Service.Studio

This is a customizable microservice template that can be directly deployed to create your own microservice. It can satisfy common email use cases for your websites.
[Homepage](https://tsangszesze.github.io/email-service-studio/)

- Sending auto-reply emails for contact form 📮
- Sending OTP emails 🧩
- Coming Soon ...

<br/>

↓↓ Wanna have a quick start? Clone it and go through the following ↓↓
<br/>

## Getting Started

### To start customizing the service and test it with the localhost server:

1. Install the dependencies : \
   `npm i`

2. Start your localhost server for development : \
   `npm run local-dev:server`

3. (Optional) Start to transpile tailwindcss for developing server homepage : \
   `npm run local-dev:client`

4. Ready for development

<br/>

## Configuration and Customization

### Prepare a gamil account for sending emails:

1. Enable 2-step verification for this account

2. Generate an app password in this account, and keep it for app setup later: https://myaccount.google.com/apppasswords

### Add your own information and environment variables:

1. Create a `.env` file

2. Set the NODE_ENV variable in this file :

   ```
   NODE_ENV=local
   ```

3. Alos, set the email variables :
   ```
   HOST_EMAIL_ADDRESS=who_will_send_the_emails@gmail.com
   HOST_EMAIL_PASSWORD=generated_app_password
   FORWARD_EMAIL_ADDRESS=default_customerService@example.com
   ```
4. Create a `.env.local` file\
   \*variables here are suggested to have a separated set for production

5. Set the auth variables :\
   \*CLIENT_LIST is optional for local development, by default is http://localhost:3000

   ```
   CLIENT_LIST=http://website_that_can_call_the_service.com
   API_KEY_LIST=key_for_that_website_to_call_the_service
   ```

6. Set the otp variables :
   ```
   OTP_SALT=random_long_string_to_shared_with_valid_client
   OTP_SALT_ROUND=an_integer
   ```

### Add your own information and environment variables:

1. Search `Email.Service.Studio` in the entire app, replace it with the name of the service/your brand

2. Search `email.service.studio@gmail.com` in the entire app, replace it with the contact email address for your service or remove the relevant content if you do not want email recipients to contact you

3. Inside src/emails, there are `email-templates` and `email-texts` folders that you can edit the HTML and text versions of email templates, respectively

4. (Optional) Explore and customize based on your needs

<br/>

## Getting Ready to Deploy

### Once finished customization, you can deploy it:

1. (Optional) test the final version of the app locally :\
   `npm run local-build && npm run local-start`

2. Build the app for deployment :\
   `npm run build`

3. (Optional) zip the app into `app.zip` if needed :\
   `npm run zip`

4. Deploy to your chosen platform

5. Set the environment variables in the platform for production :\
   \*same set of variables in `.env.local` but with values for production
   ```
   CLIENT_LIST=https://website1.com,https://website2.com
   API_KEY_LIST=key_for_website1,key_for_website2
   OTP_SALT=random_long_string_to_shared_with_valid_client
   OTP_SALT_ROUND=an_integer
   ```

<br/>

## Troubleshoot

If you are not using AWS Beanstalk to deply the service, replace the `build` script in the `scripts` field in `package.json` as following:

```
"scripts": {
   ...,
   "build": "rm -rf dist && rm -rf app.zip && npm run build:all && cd dist && npm install --omit=dev ",
   ...
},
```
