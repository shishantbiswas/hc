import { Link } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

export const sendMagicLinkEmail = async (
  email: string,
  token: string,
  url: string
) => {
  await resend.emails.send({
    from: "Account <account@mail.bsws.in>",
    to: email,

    subject: "Sign In",
    html: `
      <a href="${token}">token</a>
      <a href="${url}">Click here to Sign In</a>
    `,
  });
};

export const sendLinkDownAlert = async (
  email: string,
  link: Link,
  time: Date
) => {
  await resend.emails.send({
    from: "Account <account@mail.bsws.in>",
    to: email,
    subject: "Site Alert",
    html: `
      <h3>You're site ${link.name} is unreachable</h3>
        <p>At ${time
          .toLocaleString()
          .replaceAll(",", "")}, After 3 failed attempts your site 
            <a href="${link.href}">
            ${link.href}
            </a> 
          was detected unreachable, you can go to your dashboard and refresh it when it's online or update the status if the issue is resolved
        </p>
      <a href="${siteUrl}/dashboard?update=${link.id}">Update Status</a>
      <a href="${siteUrl}">Go to Dashboard</a>
    `,
  });
};

export const sendRefreshAlert = async (
  email: string,
  link: Link,
  time: Date
) => {
  await resend.emails.send({
    from: "Account <account@mail.bsws.in>",
    to: email,
    subject: "Checkup Alert",
    html: `
      <h3>You're site ${link.name} is still unreachable</h3>
        <p>At ${time.toLocaleString().replaceAll(",", "")}, Your Site
            <a href="${link.href}">
              ${link.href}</a>  
            was detected to be in a inactves state for more than 12 hours, our routine check tried to refresh it's status,
            but it was still detected unreachable, you can go to your dashboard and refresh it when it's online or update the status if the issue is resolved
        </p>

        <p>if you don't want to be reminded of such routine checkup you can disable it
          <a href="${siteUrl}/settings" >here</a>
        </p>

      <a href="${siteUrl}/dashboard?update=${link.id}">Update Status</a>
      <a href="${siteUrl}">Go to Dashboard</a>
    `,
  });
};
