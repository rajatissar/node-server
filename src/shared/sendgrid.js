import { get, isEmpty } from 'lodash';
import sgMail from '@sendgrid/mail';

import { Logger } from './winston';
import { SENDGRID } from '../helpers/constants';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const validateEmailData = (signUpData) => {
  const errorMessages = [];
  const from = get(signUpData, 'from', null);
  const to = get(signUpData, 'to', null);
  const templateId = get(signUpData, 'templateId', null);
  const subject = get(signUpData, 'subject', null);
  const content = get(signUpData, 'content', {});
  if (!from) {
    errorMessages.push({ field: 'from', message: 'from field is required' });
  }
  if (!to) {
    errorMessages.push({ field: 'to', message: 'to field is required' });
  }
  if (!templateId && !subject) {
    errorMessages.push({
      field: 'subject',
      message: 'If no templateId is provided, subject field is required'
    });
  }
  if (!templateId && isEmpty(content)) {
    errorMessages.push({
      field: 'content',
      message: 'If no templateId is provided, content field is required'
    });
  }
  if (errorMessages.length) {
    return false;
  }
  return true;
};

const sendMail = emailData => new Promise((resolve) => {
  emailData.from = emailData.from ? emailData.from : SENDGRID.FROM;
  const isValid = validateEmailData(emailData);
  if (isValid) {
    sgMail
      .send(emailData)
      .then((successRes) => {
        Logger.info('Mail send', JSON.stringify(successRes, null, 2));
        resolve({ mailSend: true, successRes });
      })
      .catch((error) => {
        Logger.error('Mail not send', JSON.stringify(error, null, 2));
        resolve({ mailSend: false, error });
      });
  } else {
    Logger.error('Mail not send', 'Invalid data');
    resolve({ mailSend: false, error: 'Invalid Data' });
  }
});

export { sendMail };
