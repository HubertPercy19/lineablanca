import { Resend } from 'resend';

const resend = new Resend('re_jP3dtVuK_HJrFRnxH5KBF342uPX82FmoY');

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['developerhubert19@gmail.com'],
    subject: 'Prueba',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();