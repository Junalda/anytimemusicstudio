import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { studio } from '../config/studio';

export const prerender = true;

/**
 * Serves an Apple Configuration Profile (.mobileconfig) that carries the
 * studio WiFi credentials. On iPhone/iPad, opening this URL prompts the
 * user to install a profile — after one "Install" tap they are joined to
 * the network automatically (AutoJoin), without typing the password.
 *
 * This is the closest a web link can get to a one-tap WiFi join on iOS.
 * The profile necessarily contains the password, so it is only meant to
 * be reached after the visitor accepts the House Rules.
 *
 * NOTE: this profile is UNSIGNED, so iOS shows a "Not Verified" label
 * during install (still fully installable). To remove that label, sign
 * the profile with an Apple-issued certificate.
 */

/** Deterministic UUID derived from a seed, so re-installs update in place. */
function uuidFrom(seed: string): string {
  const h = createHash('sha1').update(seed).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`.toUpperCase();
}

/** Escape a value for inclusion in an XML plist <string>. */
function xml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = () => {
  const { ssid, password, encryption, hidden } = studio.wifi;

  // Apple accepts: WEP | WPA (covers WPA/WPA2/WPA3 Personal) | Any | None
  const encryptionType = encryption === 'nopass' ? 'None' : encryption === 'WEP' ? 'WEP' : 'WPA';

  const wifiUuid = uuidFrom(`wifi:${ssid}`);
  const profileUuid = uuidFrom(`profile:${ssid}`);

  const passwordEntry =
    encryption === 'nopass'
      ? ''
      : `
      <key>Password</key>
      <string>${xml(password)}</string>`;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.apple.wifi.managed</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>studio.anytimemusic.wifi</string>
      <key>PayloadUUID</key>
      <string>${wifiUuid}</string>
      <key>PayloadDisplayName</key>
      <string>${xml(studio.name)} WiFi</string>
      <key>SSID_STR</key>
      <string>${xml(ssid)}</string>
      <key>HIDDEN_NETWORK</key>
      <${hidden ? 'true' : 'false'}/>
      <key>AutoJoin</key>
      <true/>
      <key>EncryptionType</key>
      <string>${encryptionType}</string>${passwordEntry}
    </dict>
  </array>
  <key>PayloadDisplayName</key>
  <string>${xml(studio.name)} WiFi</string>
  <key>PayloadDescription</key>
  <string>Joins the ${xml(studio.name)} WiFi network.</string>
  <key>PayloadOrganization</key>
  <string>${xml(studio.name)}</string>
  <key>PayloadIdentifier</key>
  <string>studio.anytimemusic.profile</string>
  <key>PayloadUUID</key>
  <string>${profileUuid}</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>PayloadRemovalDisallowed</key>
  <false/>
</dict>
</plist>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/x-apple-aspen-config; charset=utf-8',
      'Content-Disposition': 'attachment; filename="anytime-music-wifi.mobileconfig"',
    },
  });
};
