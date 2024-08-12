
import '../common/common';

import { getQueryParams } from '../lib/getQuery';
import { shopSdk } from '../graphql/shopClient';


async function checkQueryParams() {
  const params = getQueryParams<Record<'token', string>>();
  const contentEl = document.getElementById('pageContent');
  if (!contentEl) {
    console.warn("No page content element found, waiting and trying again");
    setTimeout(checkQueryParams, 250);
    return;
  }
  if (!params.token) {
    // No token, redirect to registration page
    window.location.href = '/account/register';
  } else {
    // Try to verify the token
    try {
      const result = await shopSdk.verifyCustomerAccount({
        token: params.token.trim(),
      });

      const data = result.verifyCustomerAccount;

      if (data.__typename === 'CurrentUser') {
        // It worked, so we are good!
        const nextUrl = sessionStorage.getItem('nextUrl') || '/shop';
        sessionStorage.removeItem('nextUrl');
        contentEl.innerText = "Success! Redirecting now...";
        
        setTimeout(function() {
            // navigate to nextUrl
            window.location.href = nextUrl;
          //your code to be executed after 1 second
        }, 2000);

        return;
      }

      let msgHtml = `
        <div class="alert alert-success w-100 w-md-50 text-center" role="alert">
          <h4 class="alert-heading">Already logged in</h4>
          <p>This token is invalid, has been used, or has expired -- but you are already logged in.</p>

          <a href="/shop" class="btn btn-ss-iris">Keep Shopping</a>
        </div>
      `;

      window._userMessage = {element: contentEl, html: msgHtml};
      if (window.current_user) {
        // We're already logged in
        contentEl.innerHTML = msgHtml;
        return;
      }
      let message = '';
      switch(data.__typename) {
        case 'VerificationTokenExpiredError':
          message = "This verification token has expired.";
          break;
        case 'VerificationTokenInvalidError':
          message = "This verification token has expired or is invalid.";
          break;
        default:
          message = "Could not verify token: " + data.__typename + " - " + data.message;
          break;
      }
      msgHtml = `
        <div class="alert alert-warning w-100 w-md-50 text-center" role="alert">
          <h4 class="alert-heading">Verification failed</h4>
          <p>${message}</p>

          <a href="/account/register" class="btn btn-ss-iris">Register</a>
        </div>
      `;
    } catch (err: any) {
      console.error("Error verifying token:", err);
      contentEl.innerText = "Error verifying token: " + err.message;
    }
  }
}

checkQueryParams().catch(err => console.error("Error checking query params:", err));

document.getElementById('pageContent')?.classList.add('justify-content-center');
