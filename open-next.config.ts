import {defineCloudflareConfig} from '@opennextjs/cloudflare';

// Minimal config for marketing site + API route.
// Enable R2 incremental cache later if/when you introduce ISR.
export default defineCloudflareConfig({});
