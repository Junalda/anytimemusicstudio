/**
 * ───────────────────────────────────────────────────────────────
 *  ANYTIME MUSIC STUDIO — central configuration
 * ───────────────────────────────────────────────────────────────
 *
 *  This is the ONE place to edit practical studio details.
 *  Secrets (WiFi password) are read from environment variables so
 *  they never live in the repository. See `.env.example`.
 *
 *  Values without a matching env var fall back to the defaults
 *  below, so the site still builds during local development.
 */

const env = import.meta.env;

export interface WifiConfig {
  /** Network name (SSID). */
  ssid: string;
  /** Network password. Kept build-side only — never rendered as text. */
  password: string;
  /** Security type used when encoding the join QR code. */
  encryption: 'WPA' | 'WEP' | 'nopass';
  /** Set true only for hidden networks. */
  hidden: boolean;
}

export interface StudioConfig {
  name: string;
  headline: string;
  subheadline: string;
  /** Support WhatsApp number, digits only, full international format. */
  whatsappNumber: string;
  supportEmail: string;
  /** Optional POST endpoint for the "Report an issue" form. */
  issueFormEndpoint: string;
  wifi: WifiConfig;
}

export const studio: StudioConfig = {
  name: 'Anytime Music Studio',
  headline: 'Welcome to Anytime Music Studio.',
  subheadline: 'Create freely. Respect the space.',

  whatsappNumber: env.PUBLIC_WHATSAPP_NUMBER ?? '31612345678',
  supportEmail: env.PUBLIC_SUPPORT_EMAIL ?? 'hello@anytimemusic.studio',
  issueFormEndpoint: env.PUBLIC_ISSUE_FORM_ENDPOINT ?? '',

  wifi: {
    ssid: env.WIFI_SSID ?? 'Anytime Music Studio',
    password: env.WIFI_PASSWORD ?? 'change-me',
    encryption: (env.WIFI_ENCRYPTION as WifiConfig['encryption']) ?? 'WPA',
    hidden: (env.WIFI_HIDDEN ?? 'false') === 'true',
  },
};

/** Build a WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${studio.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Encode WiFi credentials in the standard `WIFI:` QR payload format.
 * A phone's camera reads this and offers a one-tap join — the
 * password is inside the QR image, never shown as readable text.
 */
export function wifiQrPayload(wifi: WifiConfig = studio.wifi): string {
  const esc = (v: string) => v.replace(/([\\;,:"])/g, '\\$1');
  if (wifi.encryption === 'nopass') {
    return `WIFI:T:nopass;S:${esc(wifi.ssid)};;`;
  }
  return `WIFI:T:${wifi.encryption};S:${esc(wifi.ssid)};P:${esc(wifi.password)};${
    wifi.hidden ? 'H:true;' : ''
  };`;
}
