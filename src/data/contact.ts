/** Studio contact details and social links, shared by the header, contact form and footer. */

export const STUDIO_EMAIL = 'nststudio.in@gmail.com';

export const STUDIO_PHONE = '9373171981';
export const STUDIO_PHONE_DISPLAY = `+91 ${STUDIO_PHONE}`;
/** WhatsApp click-to-chat number: country code + number, digits only. */
export const WHATSAPP_NUMBER = `91${STUDIO_PHONE}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/nststudio.in/';
export const FACEBOOK_URL = 'https://www.facebook.com/share/1HAfkeHAq5/';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/nststudio/';

/** Opens WhatsApp (app or web) with `message` pre-filled, addressed to the studio. */
export function openWhatsApp(message: string) {
  // Use direct api.whatsapp.com endpoint to prevent wa.me tracking-filter/adblock blocks
  const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

  try {
    // Native anchor click avoids the Chromium window.open('noopener,noreferrer') about:blank bug
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    window.location.href = url;
  }
}
