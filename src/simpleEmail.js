import { SESClient, SendEmailCommand, CreateTemplateCommand, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
    credentials: {
      accessKeyId: "POKLSAM4JA3ERP7VD7VS", 
      secretAccessKey: "pZwBLD7vJQaUite/BTTZ/P3VwxkWt7p0Bk2BsSVd",
    },
    region: "us-east-1",
  });

export const createTemplate = async () => {
    const templateData = {
          Template: {
              TemplateName: "First",
              HtmlPart: ` 
            <html>
        <head>
          <title>HTML Template</title>
        </head>
        <body>
        <div style="max-width: 700px;">
            <h1>HTML Email</h1>
            <div><span style="font-weight: 600;">Name: </span> {{name}}</div>
            <div><span style="font-weight: 600;">From Contact: </span> {{email}}</div>
            <div><span style="font-weight: 600;">message: </span> {{message}}</div>
        </div>
        </body>
      </html>
          `,
              SubjectPart: "Greetings, {{name}}!",
          },
      };
      
      const templateCreate = new CreateTemplateCommand(templateData);

      await ses.send(templateCreate);

      return true
};

export const sendHtmlMail = async (emailTo, name, message) => {
    const data = {
        email: emailTo,
        name,
        message
    }

    const params = {
        Destination: {
            ToAddresses: [emailTo]
        },
        Source: "ivan.krizaj@bb.agency", // The email you just verified using SES dashboard
        Template: "First",
        TemplateData: JSON.stringify(data),
    }

    const command = new SendTemplatedEmailCommand(params);

    return ses.send(command);
}

export const sendTextMail = (emailTo, name, message) => {
    const params = {
        Destination: {
            ToAddresses: [emailTo]
        },
        Message: {
            Body: {
                Text: {
                    Data: "From Contact: " + name + "\n" + "Message: " + message
                }
            },
            Subject: {
                Data: "Name: " + name
            }
        },
        Source: "ivan.krizaj@bb.agency" // The email you just verified using SES dashboard
    }
    
    const command = new SendEmailCommand(params);
    return ses.send(command);
}