# Hostinger Deployment Guide (`/panel/index.html`)

This directory contains the standalone, production-ready Google Ads landing page that dynamically syncs with your Next.js Supabase CMS.

---

## 📁 File Structure

```
panel/
└── index.html       <-- Upload this directly to Hostinger
```

---

## 🚀 How to Host on Hostinger in 2 Minutes

### Method 1: Via Hostinger File Manager (Recommended)

1. Log in to your **Hostinger hPanel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Go to **Websites** → click **Manage** next to your domain.
3. In the sidebar, open **Files** → **File Manager**.
4. Double-click to enter `public_html`.
5. Click **New Folder** at the top right and name it `panel`.
6. Enter the newly created `panel` folder.
7. Click the **Upload** button (arrow pointing up) and upload `index.html`.
8. Visit your live page:
   ```
   https://yourdomain.com/panel/
   ```
   *(or `https://yourdomain.com/panel/index.html`)*

---

### Method 2: Via FTP (FileZilla or Cyberduck)

1. Connect to your Hostinger FTP using credentials found in **hPanel → Files → FTP Accounts**.
2. Navigate to `/public_html/`.
3. Create a directory named `panel/`.
4. Upload `index.html` into that `panel/` folder.

---

## 🔄 How the CMS Dynamic Sync Works

The `index.html` page connects directly to your Supabase project:
- **Supabase Project**: `https://zyajcfamtdrildvhwqcs.supabase.co`
- Whenever you change any text, buttons, banner image, or promo banner inside your Next.js CMS (`/admin/edit`), the changes are immediately saved to Supabase.
- When anyone visits `https://yourdomain.com/panel/`, `index.html` automatically fetches the latest data via the Supabase REST API and updates the page seamlessly!
- If the visitor has an ad-blocker or no internet, it gracefully displays the default Google Ads festive template so there is never an empty screen.
