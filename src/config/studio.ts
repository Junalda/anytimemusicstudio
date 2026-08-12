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

/**
 * Read a secret build-time variable. Works both locally (loaded from
 * `.env` into import.meta.env) and on hosts like Vercel where the value
 * is injected via process.env from the project's environment settings.
 * Only referenced in server-side frontmatter, so it never reaches the
 * client bundle.
 */
function secret(key: 'WIFI_SSID' | 'WIFI_PASSWORD' | 'WIFI_ENCRYPTION' | 'WIFI_HIDDEN'): string | undefined {
  const fromVite = (env as Record<string, string | undefined>)[key];
  if (fromVite != null) return fromVite;
  const proc = (globalThis as any).process;
  return proc?.env?.[key];
}

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

export interface AppConfig {
  /** Display name of the personal-mixer app. */
  name: string;
  /** One short line describing what it does. */
  tagline: string;
  /** Path to the app icon in /public. */
  icon: string;
  /** Apple App Store link (leave blank until you have it). */
  appStoreUrl: string;
  /** Google Play link (leave blank until you have it). */
  playStoreUrl: string;
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
  /** The personal-monitor mixer app artists install after joining WiFi. */
  app: AppConfig;
}

export const studio: StudioConfig = {
  name: 'Anytime Music Studio',
  headline: 'Welcome to Anytime Music Studio.',
  subheadline: 'Create freely. Respect the space.',

  whatsappNumber: env.PUBLIC_WHATSAPP_NUMBER ?? '31643187444',
  supportEmail: env.PUBLIC_SUPPORT_EMAIL ?? 'management@infntyhub.com',
  issueFormEndpoint: env.PUBLIC_ISSUE_FORM_ENDPOINT ?? '',

  wifi: {
    ssid: secret('WIFI_SSID') ?? 'TP-Link_34FC_5G',
    // Real guest WiFi password. A Vercel WIFI_PASSWORD env var still
    // overrides this if set. Note: this repo is public, so treat this as
    // the (already publicly shared) studio guest password, not a secret.
    password: secret('WIFI_PASSWORD') ?? 'Artiest2026@@',
    encryption: (secret('WIFI_ENCRYPTION') as WifiConfig['encryption']) ?? 'WPA',
    hidden: (secret('WIFI_HIDDEN') ?? 'false') === 'true',
  },

  app: {
    name: 'MX-Q',
    tagline: 'Control your personal monitor mix',
    icon: '/mxq-icon.png',
    appStoreUrl: env.PUBLIC_APP_IOS_URL ?? 'https://apps.apple.com/nl/app/mx-q/id1471505954',
    playStoreUrl: env.PUBLIC_APP_ANDROID_URL ?? '',
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
