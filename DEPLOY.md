# Getting snehajain.co.uk live on GitHub Pages

Follow these once. After that, publishing changes is `git push`.

---

## 1. Put the site on GitHub

Create the repository first, on github.com:

- **New repository** → name it `snehajain.co.uk` (any name works when you use a
  custom domain, this one just makes it obvious what it is).
- **Public.** GitHub Pages needs a public repo on free accounts.
- Do **not** tick "Add a README", because this folder already has one.

Then, in a terminal in this folder:

```
git init
git add -A
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/snehajain.co.uk.git
git push -u origin main
```

This machine has Git Credential Manager installed, so the first push opens a
browser window to sign in to GitHub. Approve it there and the credentials are
saved to Windows Credential Manager, so later pushes are silent. You do **not**
need to create a personal access token by hand.

If the browser window never appears, run `git config --global credential.helper manager`
and push again.

## 2. Turn on GitHub Pages

Repository → **Settings** → **Pages**:

- **Source:** Deploy from a branch
- **Branch:** `main`, folder `/ (root)` → **Save**

Wait a minute, then the site is live at
`https://YOUR-GITHUB-USERNAME.github.io/snehajain.co.uk/`. Check it works there
before touching DNS, because it isolates "is the site fine" from "is the domain fine".

## 3. Point the domain at GitHub

Two halves: tell GitHub about the domain, and tell the domain about GitHub.

**a) In the repo.** The `CNAME` file already contains `snehajain.co.uk`, so
Settings → Pages → Custom domain should already show it. If not, type it in and
save.

**b) At your registrar** (wherever you bought snehajain.co.uk: 123-reg, GoDaddy,
Namecheap, Cloudflare…), open the DNS settings and create these records.

Four **A** records, all with host/name `@` (some registrars want the field left
blank, or the domain itself):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Four **AAAA** records, also on `@` (IPv6, optional but worth adding):

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

One **CNAME** record so `www.snehajain.co.uk` works too:

```
Host: www    →    Value: YOUR-GITHUB-USERNAME.github.io
```

Delete any parking-page or "coming soon" A record the registrar added when you
bought the domain, or it will fight these.

> **If your DNS is on Cloudflare:** set the records to **DNS only** (grey cloud),
> not proxied, until HTTPS is working. Cloudflare's proxy in front of GitHub's
> certificate check is the single most common reason this step stalls.

## 4. Turn on HTTPS

DNS takes anywhere from 10 minutes to a few hours to propagate. Once it has:

Settings → Pages → tick **Enforce HTTPS**.

The tickbox is greyed out until GitHub has issued the certificate, which it does
automatically after it sees the DNS pointing at it. If it is still grey after a
few hours, clear the custom domain field, save, re-enter it, and save again. That
kicks the certificate process off afresh.

Check progress meanwhile:

```
nslookup snehajain.co.uk
```

You want the four `185.199.x.153` addresses back.

## 5. Email on the domain

The site currently uses `designspacebysj@gmail.com`, which works today. A domain
address such as `hello@snehajain.co.uk` is optional polish. GitHub Pages hosts web
pages only, never email, so it has to come from somewhere else. Options, cheapest first:

- **Email forwarding.** Most UK registrars include it free. `hello@snehajain.co.uk`
  simply lands in an existing Gmail inbox. Fine to start with; replies come *from*
  the Gmail address unless you configure send-as.
- **Zoho Mail.** Free tier for one custom-domain mailbox, proper webmail.
- **Google Workspace or Microsoft 365.** About £5 to £6 a month, full mailbox, sends
  and receives as `hello@snehajain.co.uk`. Worth it once enquiries are real.

Whichever you pick, it adds MX records at the registrar. MX records are separate
from the A records above and do not interfere with them.

---

## Afterwards

**Publishing a change.** Edit the files, then:

```
git add -A
git commit -m "Add new project"
git push
```

Live in under a minute. GitHub keeps every version, so nothing is ever really lost.

**Worth doing in the first week**

- Submit the site to [Google Search Console](https://search.google.com/search-console)
  and give it `https://snehajain.co.uk/sitemap.xml`. Without this, Google may take
  weeks to notice a brand-new domain.
- Make `assets/img/og.png` (1200×630) so shared links show a preview image.
- Add the domain to her Instagram bio, LinkedIn and email signature. Inbound links
  are what actually get a new domain indexed.

**Troubleshooting**

| Symptom | Cause |
| --- | --- |
| 404 on the custom domain, works on github.io | DNS not propagated yet, or the `CNAME` file was deleted by a push |
| "Enforce HTTPS" stays greyed out | Certificate not issued yet. Check DNS is DNS-only, wait, then re-save the domain |
| Site loads unstyled | `assets/styles.css` did not get committed. Check `git status` |
| Changes not appearing | Hard refresh (Ctrl+F5); check the Actions tab for a failed deploy |
