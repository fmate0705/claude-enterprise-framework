import type { GeneratedFile } from '@cef/core';
import type { TemplateContext } from '../context.js';

/**
 * MANDATORY disclaimer. Generated legal documents are drafts and must be reviewed by a
 * qualified legal professional before publication (framework legal standard). It is placed
 * prominently at the top of every generated legal document and never omitted.
 */
const DISCLAIMER_EN =
  '> **DRAFT — NOT LEGAL ADVICE.** This document was generated as a starting template. It is ' +
  '**not** a substitute for legal advice and **must be reviewed and adapted by a qualified ' +
  'legal professional** for your jurisdiction and business before publication.';

const DISCLAIMER_HU =
  '> **TERVEZET — NEM JOGI TANÁCS.** Ezt a dokumentumot kiindulási sablonként generáltuk. ' +
  '**Nem** helyettesíti a jogi tanácsadást, és közzététel előtt **szakképzett jogi szakértővel ' +
  'felül kell vizsgáltatni** és az adott joghatóságra és vállalkozásra kell szabni.';

const isHungary = (ctx: TemplateContext): boolean => {
  const country = ctx.spec.country.trim().toLowerCase();
  return (
    country === 'hungary' ||
    country === 'magyarország' ||
    country === 'magyarorszag' ||
    ctx.spec.primaryLanguage.trim().toLowerCase().startsWith('hu')
  );
};

const doc = (title: string, disclaimer: string, body: string): string =>
  `# ${title}\n\n${disclaimer}\n\n_Last updated: [DATE]_\n\n${body}\n`;

function english(ctx: TemplateContext): GeneratedFile[] {
  const name = ctx.spec.name;
  return [
    {
      path: 'content/legal/privacy-policy.md',
      content: doc(
        'Privacy Policy',
        DISCLAIMER_EN,
        `This Privacy Policy explains how **${name}** ("we") collects, uses, and protects personal data.

## Data we collect
- Contact data you provide (e.g. name, email).
- Usage data collected automatically (e.g. device, pages viewed).

## How we use data
- To provide and improve the service.
- To communicate with you.
- To comply with legal obligations.

## Legal basis, retention, and your rights
- We process data on the applicable legal bases and retain it only as long as necessary.
- You may request access, correction, deletion, or portability of your data.

## Contact
Data controller: [Company Name], [Address], [Email].`,
      ),
    },
    {
      path: 'content/legal/terms.md',
      content: doc(
        'Terms of Service',
        DISCLAIMER_EN,
        `These Terms govern your use of **${name}**.

## Use of the service
- You agree to use the service lawfully and not to misuse it.

## Accounts and content
- You are responsible for your account and any content you submit.

## Liability and changes
- The service is provided "as is" to the extent permitted by law.
- We may update these Terms; continued use constitutes acceptance.

## Contact
[Company Name], [Address], [Email].`,
      ),
    },
    {
      path: 'content/legal/cookie-policy.md',
      content: doc(
        'Cookie Policy',
        DISCLAIMER_EN,
        `This Cookie Policy explains how **${name}** uses cookies and similar technologies.

## Categories
- **Essential** — required for the site to function.
- **Analytics** — help us understand usage (only with consent).
- **Marketing** — used for advertising (only with consent).

## Managing cookies
You can accept or decline non-essential cookies via the consent banner and your browser settings.`,
      ),
    },
    {
      path: 'content/legal/impressum.md',
      content: doc(
        'Impressum / Legal Notice',
        DISCLAIMER_EN,
        `Information about the operator of **${name}**.

- **Operator:** [Company Name]
- **Address:** [Registered Address]
- **Contact:** [Email], [Phone]
- **Registration:** [Company Registration Number]
- **VAT ID:** [VAT Number]`,
      ),
    },
  ];
}

function hungarian(ctx: TemplateContext): GeneratedFile[] {
  const name = ctx.spec.name;
  return [
    {
      path: 'content/legal/adatkezelesi-tajekoztato.md',
      content: doc(
        'Adatkezelési Tájékoztató',
        DISCLAIMER_HU,
        `Ez a tájékoztató bemutatja, hogyan kezeli a **${name}** a személyes adatokat a GDPR és a
vonatkozó magyar jogszabályok szerint.

## Kezelt adatok
- Az Ön által megadott kapcsolattartási adatok (pl. név, e-mail).
- Automatikusan gyűjtött használati adatok.

## Az adatkezelés célja és jogalapja
- A szolgáltatás nyújtása és fejlesztése; kapcsolattartás; jogi kötelezettségek teljesítése.

## Adatmegőrzés és az Ön jogai
- Az adatokat csak a szükséges ideig őrizzük meg.
- Ön kérheti a hozzáférést, helyesbítést, törlést és az adathordozhatóságot.

## Adatkezelő
[Cégnév], [Cím], [E-mail].`,
      ),
    },
    {
      path: 'content/legal/aszf.md',
      content: doc(
        'Általános Szerződési Feltételek (ÁSZF)',
        DISCLAIMER_HU,
        `A jelen ÁSZF a **${name}** szolgáltatás használatának feltételeit szabályozza.

## A szolgáltatás használata
- A szolgáltatást jogszerűen, rendeltetésszerűen kell használni.

## Felhasználói fiók és tartalom
- A felhasználó felel a fiókjáért és az általa feltöltött tartalomért.

## Felelősség és módosítás
- A szolgáltatást a jogszabályok által megengedett mértékben "adott állapotban" nyújtjuk.
- Az ÁSZF módosulhat; a további használat az elfogadást jelenti.

## Üzemeltető
[Cégnév], [Cím], [E-mail].`,
      ),
    },
    {
      path: 'content/legal/cookie-tajekoztato.md',
      content: doc(
        'Cookie (Süti) Tájékoztató',
        DISCLAIMER_HU,
        `A **${name}** sütiket és hasonló technológiákat használ.

## Kategóriák
- **Alapvető** — a működéshez szükséges.
- **Analitikai** — a használat megértéséhez (csak hozzájárulással).
- **Marketing** — hirdetésekhez (csak hozzájárulással).

## A sütik kezelése
A nem alapvető sütiket a hozzájárulási sávban és a böngésző beállításaiban fogadhatja el vagy
utasíthatja el.`,
      ),
    },
    {
      path: 'content/legal/impresszum.md',
      content: doc(
        'Impresszum',
        DISCLAIMER_HU,
        `A **${name}** üzemeltetőjének adatai.

- **Üzemeltető:** [Cégnév]
- **Székhely:** [Székhely címe]
- **Kapcsolat:** [E-mail], [Telefon]
- **Cégjegyzékszám:** [Cégjegyzékszám]
- **Adószám:** [Adószám]`,
      ),
    },
  ];
}

/** Generates jurisdiction-appropriate legal drafts (Hungarian when the country is Hungary). */
export function legalFiles(ctx: TemplateContext): GeneratedFile[] {
  return isHungary(ctx) ? hungarian(ctx) : english(ctx);
}
