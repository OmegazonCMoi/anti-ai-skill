# Règles de suppression (anti-slop)

Objet : liste courte, en français, des tics de design « IA / Claude par défaut » à retirer, plus deux modes de travail (Build et Audit). Le détail de chaque règle (détection, exceptions, remplacements) reste dans [anti-patterns.md](anti-patterns.md) ; l'identifiant entre parenthèses y renvoie. « (nouveau) » signale une règle sans équivalent existant.

## Cadre

- Chaque élément ci-dessous est une **valeur par défaut à retirer**, pas un interdit absolu. Il redevient autorisé quand le brief le justifie explicitement ; la justification est écrite en une phrase dans le rapport.
- Remplacer un défaut par un autre défaut ne règle rien. Retirer le violet pour tomber sur crème + serif + terracotta, ou retirer les cartes pour tomber sur un bento, c'est le même problème (voir [art-direction.md](art-direction.md#step-4b-push-past-the-median)).
- Une règle = une ligne : « Interdit : X. Exception : Y. »

## A. Titres

- Interdit : un mot en serif italique, surligné ou en couleur d'accent au milieu d'un titre en gras. Exception : la charte définit ce contraste avec un sens (nom propre, citation, titre d'œuvre) et l'applique partout pareil. (GEN-017)
- Interdit : le texte en dégradé (`bg-clip-text text-transparent`, dégradés violet → bleu). Exception : dégradé issu de la marque, contraste vérifié sur tout le texte. (GEN-005)
- Interdit : les gros titres en serif italique comme signature par défaut. Exception : la direction artistique les choisit pour une raison liée au produit et l'écrit. (GEN-017)

## B. Typographie

- Interdit : Inter ou Geist comme seule police. Exception : police imposée par la marque ou le design system existant. (GEN-016)
- Interdit : « serif de titre + sans-serif de corps » comme combinaison automatique. Exception : chaque famille a un rôle nommé et une raison tirée du brief. (GEN-016)
- Interdit : un petit libellé au-dessus de chaque titre de section (eyebrow en majuscules espacées, souvent précédé d'un tiret). Exception : le libellé porte une information utile (fil d'Ariane, date, étape réelle). (GEN-001, GEN-014)
- Interdit : la monospace sur des chiffres et compteurs décoratifs (« 01 / 07 »). Exception : données réelles (tableaux, code, métriques) où les chiffres doivent s'aligner. (GEN-027)
- Interdit : plus de deux familles de polices par page. Exception : le brief ou la charte imposent une troisième famille, avec son rôle. (nouveau)

## C. Couleurs

- Interdit : crème chaud + titrage serif contrasté + accent terracotta. Exception : couleurs tirées de la marque ou de la matière du produit (papier, cuisine, artisanat). (GEN-026)
- Interdit : fond quasi noir + un unique accent vert acide ou vermillon. Exception : marque existante, ou outil sombre par usage (montage, code) avec un accent qui a un sens. (GEN-008)
- Interdit : mise en page façon journal (filets fins, aucun arrondi, colonnes denses) comme look par défaut. Exception : contenu réellement éditorial ou presse, choisi comme direction « print-inspired » dans la direction artistique. (nouveau)
- Interdit : violet ou indigo en couleur de CTA (`#6366f1`, teintes 255–280). Exception : couleur de la marque. (GEN-005, GEN-008)
- Interdit : des dégradés sur plusieurs surfaces de la page. Exception : un dégradé unique qui porte une information (échelle, matière, moment de la journée). (GEN-005)
- Interdit : lueurs et néon non demandés (`shadow-[0_0_*]`, `text-shadow` saturé). Exception : le brief les demande, contraste vérifié. (GEN-008)
- Interdit : une seule couleur d'accent vive appliquée à tout (boutons, liens, icônes, bordures, fonds). Exception : le brief impose une identité monochrome assumée ; sinon l'accent reste rare pour garder son sens. (nouveau)

## D. Composants et mise en page

- Interdit : le squelette hero centré + 3 ou 4 cartes identiques (icône, titre, phrase) + CTA. Exception : les éléments sont des entités indépendantes que l'utilisateur compare ou choisit (offres, produits). (GEN-001, GEN-002)
- Interdit : l'enchaînement hero → fonctionnalités → preuves sociales → tarifs → FAQ → pied de page quand le brief ne l'exige pas. Exception : chaque section répond à une question réelle du visiteur, avec du vrai contenu. (GEN-010)
- Interdit : des arrondis uniformes (`rounded-2xl`/`rounded-3xl` partout, boutons à `9999px`). Exception : échelle d'arrondis liée au rôle des composants, ou pilule réservée à un type précis (filtres, jetons). (GEN-006)
- Interdit : la même ombre sur chaque carte. Exception : l'élément est réellement au-dessus du contenu (menu, dialogue, élément déplacé). (GEN-004)
- Interdit : le trio shadcn non modifié (`rounded-lg border bg-card shadow-sm`) et les composants Radix/shadcn laissés par défaut. Exception : outil interne ou prototype annoncé comme tel. (GEN-020)
- Interdit : le badge « NEW » ou la pilule au-dessus du titre. Exception : fonctionnalité réellement nouvelle ou en bêta, une seule fois. (GEN-001)
- Interdit : les captures d'écran dans une fausse fenêtre de navigateur. Exception : le cadre apporte une information (URL réelle, extension de navigateur). (nouveau)
- Interdit : les cartes sombres à lueur douce. Exception : le brief demande explicitement l'effet ; sinon l'élévation se montre par la clarté de la surface. (GEN-008)
- Interdit : les emojis en guise d'icônes. Exception : contenu utilisateur, réactions, chat. (GEN-011)
- Interdit : les bandeaux de texte défilant (ticker, marquee) sans raison. Exception : flux réellement temps réel, avec un bouton pause. (GEN-015)
- Interdit : le zoom au survol sur chaque carte, l'apparition au scroll sur chaque section, le détournement du scroll. Exception : l'animation a un rôle nommé (orientation, retour d'action) et respecte `prefers-reduced-motion`. (GEN-015)

## E. Texte

- Interdit : les formules creuses « Transform », « Supercharge », « Unleash », « Unlock », « Empower », « Boost your workflow », et les noms de fonctionnalités en deux mots du type « Seamless Integration ». Exception : une affirmation précise et vérifiable qui emploie un de ces mots. (GEN-023, GEN-025)
- Interdit : chiffres, notes, logos clients ou avis inventés ou invérifiables. Exception : aucune ; à la place, un emplacement clairement marqué (« [Avis client réel, environ 20 mots] »). (GEN-013, GEN-024)

## F. Finitions (contrôle avant livraison)

- Interdit : du texte provisoire restant (« suggestion de présentation », lorem ipsum, alt de substitution). Exception : aucune en livraison. (GEN-013)
- Interdit : une même image réutilisée à plusieurs endroits sans raison. Exception : répétition voulue et visible (logo, motif de marque). (nouveau)
- Interdit : un compteur ou indicateur (« 01 / 07 ») qui ne correspond pas au nombre réel de sections. Exception : aucune ; corriger ou retirer. (GEN-027)
- Interdit : un `<img>` sans `alt` descriptif, ou avec un `alt` vide. Exception : voir « Conflits ouverts » ci-dessous (images décoratives). (A11Y-006)
- Interdit : une balise `meta` vide, des noms collés aux initiales dans les avis (« MarieD. »), des fautes dans les noms de plats ou de produits. Exception : aucune. (nouveau)

## Mode Build

À utiliser avant d'écrire le code d'une nouvelle page ou d'une refonte complète. Aucune ligne de code avant ces quatre décisions écrites, chacune justifiée par le brief :

1. **Direction visuelle** : une phrase, plus l'idée signature ([art-direction.md](art-direction.md#step-4b-push-past-the-median)).
2. **Polices** : deux familles au maximum, rôle et raison du choix pour chacune.
3. **Palette** : couleurs et raison du choix (marque, domaine, contexte d'usage), pas une palette de la liste C.
4. **Structure de la page** : les sections dans l'ordre, chacune liée à une question du visiteur (pas l'enchaînement de la liste D par défaut).

Référence obligatoire : demander à l'utilisateur une image ou un site de référence. Les sources ci-dessous rapportent qu'un essai avec référence évite le rendu générique, ce qu'aucun skill de design n'obtient seul (constat non revérifié dans ce dépôt). Tirer de la référence des principes, jamais une copie ([source-verification.md](source-verification.md)).

Puis relire la liste A–F avant de livrer.

## Mode Audit

À utiliser sur du code existant (Tailwind, CSS, JSX, HTML). **Ne rien réécrire sans accord explicite de l'utilisateur.**

1. Chercher les signaux ci-dessous. Un résultat de recherche est un indice, pas un verdict : lire le contexte avant de conclure.
2. Pour chaque cas retenu, vérifier l'exception de la règle.
3. Produire un rapport, une ligne par constat :

| Règle (A–F) | Pattern détecté | Fichier:ligne | Correctif proposé |
| --- | --- | --- | --- |

Signaux de recherche (non exhaustifs) :

| Section | Chercher |
| --- | --- |
| A | `bg-clip-text`, `text-transparent`, `<em>`/`<i>`/`<span>` coloré à l'intérieur de `h1`–`h3`, `italic` + `font-serif` sur un titre |
| B | `Inter` ou `Geist` comme unique `font-family` ; nombre de familles distinctes ; `uppercase tracking-` juste avant un titre ; `font-mono` sur des numéros |
| C | `#6366f1`, `indigo-`, `violet-`, `purple-`, teintes `hsl` entre 255 et 280, `from-…to-` répétés, `shadow-[0_0_`, `text-shadow`, fond crème + accent terracotta |
| D | `rounded-2xl`, `rounded-3xl`, `rounded-full` sur des boutons, `rounded-lg border bg-card shadow-sm`, `hover:scale-`, `whileInView`, `marquee`, emojis dans le JSX, faux cadre de navigateur (trois points colorés) |
| E | `Transform`, `Supercharge`, `Unleash`, `Unlock`, `Empower`, `Boost`, `Seamless`, chiffres ronds (`10k+`, `99.9%`), étoiles et avis sans source |
| F | `lorem`, texte provisoire, `alt=""` ou `alt="image"`, `content=""` dans `meta`, même `src` d'image dans plusieurs sections, compteurs « 0x / 0y » à comparer au nombre réel de sections |

Procédure complète d'audit de code : [../workflows/audit-existing-code.md](../workflows/audit-existing-code.md).

## Conflits ouverts

Points où cette liste contredit le reste du skill. Non tranchés : à décider par le mainteneur.

- **`alt` vide** (F) : [accessibility.md](accessibility.md) et WCAG 1.1.1 demandent un `alt` vide pour les images purement décoratives ; la règle F l'interdit.
- **Mise en page façon journal** (C) : [art-direction.md](art-direction.md#step-4-composition-strategy) propose « print-inspired » et « raw / brutalist » comme directions à explorer, et l'étape 4b demande au moins une direction non conventionnelle.
- **Référence obligatoire** (mode Build) : SKILL.md section 3 demande d'inférer et de poser au plus une question, section 13 de choisir un défaut prudent si l'utilisateur est indisponible ; le mode Build bloque le code sans référence.
- **Deux familles maximum** (B) : [typography.md](typography.md) admet une troisième famille si elle a une raison ; la règle B ne l'admet que si le brief ou la charte l'imposent.

## Sources

Reformulées, non citées. Contenu non revérifié dans cette session.

- Northeast Times, « AI design tools are making every website look the same » (31/07/2026) : serif italique, crème + orange rouille, chiffres en monospace, bandeaux défilants.
- CodeMySpec, « How to Keep Your Website From Looking Like Every Other Vibe Coded Website » : les trois looks que le skill frontend d'Anthropic déconseille lui-même (liste C).
- ClaudeCodeHQ, « Unslop UI » : classement des tells tiré d'un catalogue de 3 033 commentaires Reddit.
- Velox Themes, « How to Vibe Code a Website That Doesn't Look Like AI Slop » : titre mêlant gras et serif italique, badge NEW, étiquettes à tiret.
- UX Planet, « How to spot AI-generated design » : microcopy vague, hero prévisible.
