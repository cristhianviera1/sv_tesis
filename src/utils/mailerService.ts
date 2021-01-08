import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { SES } from 'aws-sdk';

@Injectable()
export class MailerAwsService {

  sendMail(to: string, subject: string, message: string) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCES,
      region: process.env.AWS_REGION,
    });
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
    const params: SES.Types.SendEmailRequest = {
      Source: process.env.MAIL_USER,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    };
    ses.sendEmail(params, (err, data) => {
      if (err) {
        return console.warn(err, err.stack);
      }
      console.info('Email sent.', data);
    });
  }
}
