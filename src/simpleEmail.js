import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
    credentials: {
        accessKeyId: "", // Your access key id 
        secretAccessKey: "", // Your secret access key
    },
    region: "us-east-1",
});

export const sendMail = (emailTo, name, message) => {
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
        Source: "" // Verified email
    }
    const command = new SendEmailCommand(params);
    return ses.send(command);
}