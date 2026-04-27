+++
title = "Pourquoi la RAM explose : Stargate, HBM et le grand gâchis"
date = 2026-04-27T10:00:00+02:00
draft = false
description = "Comment le projet Stargate d'OpenAI et le pivot des fabricants vers la HBM ont provoqué une pénurie mondiale de mémoire DDR5 qui fait exploser les prix pour les consommateurs."
tags = ["RAM", "IA", "Stargate", "HBM", "OpenAI", "Actu Tech"]
categories = ["Actu Tech"]
preview = "/20260427-ram/01-flambee-prix.png"
+++

![](/20260427-ram/01-flambee-prix.png)

Si vous avez voulu upgrader votre PC ces derniers mois, vous avez sans doute eu un choc en caisse : un kit DDR5 32 Go qui coûtait 150 à 200 euros en Europe avant septembre 2025 dépasse désormais les 500 euros. Certains kits haute fréquence franchissent même les 600 euros. La PS5 a officiellement augmenté de 100 euros au 2 avril 2026. Les smartphones haut de gamme suivent la même tendance. Ce n'est pas l'inflation classique. C'est le contrecoup d'un pari industriel à 500 milliards de dollars qui s'est révélé partiellement creux.

---

## La machine à rêves : Stargate et les 900 000 wafers

Le 21 janvier 2025, Donald Trump annonce en grande pompe le projet Stargate : OpenAI, SoftBank et Oracle s'engagent à investir jusqu'à 500 milliards de dollars sur quatre ans dans des infrastructures d'IA aux États-Unis. 100 milliards sont promis immédiatement. La mise en scène est spectaculaire.

Quelques semaines plus tard, Sam Altman se rend à Séoul. Face aux dirigeants de Samsung et SK Hynix, les deux plus grands fabricants de mémoire au monde avec Micron (ils contrôlent ensemble 90 à 95 % du marché mondial), il formule une demande hors norme : 900 000 wafers par mois dédiés à la production de HBM (High Bandwidth Memory), la mémoire ultrarapide utilisée dans les puces d'IA. Ce chiffre représente environ 40 % de la production mondiale de RAM.

Les fabricants signent. Mais ils signent des LOI : des *letters of intent*, des lettres d'intention sans valeur juridique contraignante. À ce stade, personne ne s'arrête sur ce détail.

---

## Pourquoi les fabricants ont tout basculé

![](/20260427-ram/02-mecanisme-stargate.png)

Pour comprendre ce qui suit, une brève explication technique s'impose. La mémoire DDR5 que l'on trouve dans nos PC fonctionne sur des interfaces de 64 à 128 bits et délivre au maximum environ 51 Go par seconde par barrette. La HBM4, la dernière génération, utilise une interface de 2 048 bits et délivre 3 300 Go par seconde : un rapport de 64 pour 1.

Cette différence de performance a un coût de fabrication radical. Produire un gigaoctet de HBM consomme environ trois fois plus de surface de silicium (de *wafer*) que produire un gigaoctet de DDR5. Une usine ne peut pas faire les deux en même temps : chaque wafer affecté au HBM est un wafer retiré du marché grand public.

Face à la demande d'OpenAI et aux marges bien supérieures de la HBM, Samsung et SK Hynix ont massivement réorienté leurs lignes de production. La décision était rationnelle : des clients comme Nvidia signaient des contrats pluriannuels à des prix bien supérieurs à ceux du marché grand public.

---

## L'effet domino

![](/20260427-ram/03-effet-domino.png)

Les conséquences arrivent vite et fort.

**Octobre 2025 :** SK Hynix annonce lors de ses résultats trimestriels que toute sa production de HBM pour 2026 est déjà vendue. Il n'y a plus de capacité disponible.

**Décembre 2025 :** Micron, le troisième grand fabricant mondial, annonce l'arrêt de sa marque grand public Crucial, qui existait depuis 29 ans. La décision est nette : Micron concentre toutes ses ressources sur la HBM et les clients enterprise. Dans ses premiers résultats post-arrêt, le PDG déclare que l'entreprise ne peut répondre qu'à 50 à 66 % de la demande de DRAM conventionnelle. Pas par manque de volonté : par manque de wafers.

Sur les marchés de gros, les prix des contrats DRAM bondissent de 171,8 % en glissement annuel. L'IDC prédit une contraction du marché PC de 9 % en 2026 à cause de la pénurie. La plateforme allemande Mindfactory, référence pour les composants, décrit en février 2026 "un effondrement comme jamais vu en dix ans", avec une baisse de plus de 50 % des ventes de processeurs. Les gens arrêtent tout simplement d'acheter.

Micron prévient que la pénurie de DRAM durera au moins jusqu'en 2028.

---

## Le bluff

![](/20260427-ram/04-bluff-loi.png)

C'est là que l'histoire prend un tournant ironique.

Les 900 000 wafers par mois promis par OpenAI n'étaient pas des commandes fermes. C'étaient des lettres d'intention. Et début 2026, OpenAI revoit ses ambitions à la baisse. Les besoins en wafers sont réduits. Les partenaires commencent à se disputer le contrôle des data centers. Les projets Stargate en dehors des États-Unis sont mis en pause : le projet britannique est suspendu en avril 2026, OpenAI invoquant les coûts énergétiques et la réglementation locale.

Du côté de Nvidia, Jensen Huang déclare en mars 2026 que l'investissement de 100 milliards dans OpenAI "ne se fera probablement pas". À la place, Nvidia investit 30 milliards dans la nouvelle levée de fonds d'OpenAI, qui valorise l'entreprise à 730 milliards de dollars pré-money. La réduction est de 70 %.

Oracle, de son côté, abandonne l'extension de son campus d'Abilene (Texas) au-delà de 1,2 gigawatt. L'accord global de 4,5 GW reste formellement en place selon Oracle, mais l'ambition affichée a clairement rétréci.

Les fabricants de mémoire, eux, ont déjà réorganisé leurs lignes de production. On ne rebascule pas une usine de semiconducteurs du jour au lendemain. Les consommateurs paient la facture d'une décision industrielle prise sur la foi de promesses non contraignantes.

---

## Ce que ça change vraiment

![](/20260427-ram/05-ddr5-vs-hbm4.png)

L'écart de performance entre HBM et DDR5 est tel qu'il ne s'agit pas d'une simple question de prix. Ce sont deux marchés qui divergent structurellement.

La DDR5 reste la mémoire des ordinateurs personnels, des laptops, des smartphones. Elle sera de plus en plus rare et chère tant que les grandes usines restent orientées vers la HBM.

La HBM est la mémoire des data centers d'IA. Elle permet aux modèles de langage de fonctionner à la vitesse nécessaire pour traiter des milliards de requêtes. C'est une infrastructure, pas un composant grand public.

Dans ce contexte, Google a publié en mars 2026 un algorithme baptisé TurboQuant, présenté à la conférence ICLR 2026. TurboQuant compresse la mémoire de travail des modèles d'IA (appelée KV cache) par un facteur d'au moins 6, sans perte de précision, avec un gain de performance jusqu'à 8 fois sur les GPU Nvidia H100. C'est une avancée réelle.

Mais elle ne résoudra pas la pénurie de mémoire grand public. Une compression qui permet de faire tourner des modèles plus grands dans la même quantité de HBM ne libère pas des wafers pour produire de la DDR5. Elle permet aux développeurs de construire des modèles encore plus ambitieux avec les ressources existantes. C'est la même logique que les SSD qui n'ont pas réduit la demande en stockage : ils ont juste permis de stocker plus.

---

## Conclusion

La crise de la RAM n'est pas une bulle spéculative ordinaire. C'est le résultat d'une promesse industrielle colossale, formulée sur des lettres d'intention non contraignantes, qui a conduit les trois grands fabricants mondiaux à réorienter leur production vers un marché de niche ultra-rentable. Quand les ambitions ont été revues à la baisse, les lignes de production ne pouvaient pas suivre.

Le consommateur qui achète un kit de RAM, un PC ou un smartphone en 2026 paie le coût réel de ce pari. La normalisation n'est pas attendue avant 2027-2028, selon les estimations les plus optimistes.

La prochaine fois que vous lirez une annonce d'infrastructure IA à plusieurs centaines de milliards de dollars, cherchez les mots "letter of intent". Ils signifient que quelqu'un d'autre paiera si les plans changent.

---

## Sources et références

### Flambée des prix RAM

- [DRAM prices skyrocket 171% year-over-year — Tom's Hardware](https://www.tomshardware.com/pc-components/dram/dram-prices-surge-171-percent-year-over-year-ai-demand-drives-a-higher-yoy-price-increase-than-gold)
- [The RAM pricing crisis has only just started, Team Group GM warns — Tom's Hardware](https://www.tomshardware.com/pc-components/dram/the-ram-pricing-crisis-has-only-just-started-team-group-gm-warns-says-problem-will-get-worse-in-2026-as-dram-and-nand-prices-double-in-one-month)
- [Bewildered enthusiasts decry memory price increases of 100%+ — Tom's Hardware](https://www.tomshardware.com/pc-components/ram/bewildered-enthusiasts-decry-memory-price-increases-of-100-percent-or-more-the-ai-ram-squeeze-is-finally-starting-to-hit-pc-builders-where-it-hurts)
- [IDC warns PC market could shrink up to 9% in 2026 — Tom's Hardware](https://www.tomshardware.com/tech-industry/idc-warns-pc-market-could-shrink-up-to-9-percent-in-2026-due-to-skyrocketing-ram-pricing-even-moderate-forecast-hits-5-percent-drop-as-ai-driven-shortages-slam-into-pc-market)

### Stargate et la demande HBM

- [Open AI, Oracle, and SoftBank to invest $500 billion in 'Stargate' AI project — Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/open-ai-oracle-and-softbank-to-invest-usd500-billion-in-stargate-ai-project)
- [HBM supply from SK Hynix and Micron sold out until late 2025 — Tom's Hardware](https://www.tomshardware.com/pc-components/gpus/hbm-supply-from-sk-hynix-and-micron-sold-out-until-late-2025)

### Micron et Crucial

- [Micron is killing Crucial SSDs and memory in AI pivot — Tom's Hardware](https://www.tomshardware.com/pc-components/dram/micron-is-killing-crucial-ssds-and-memory-in-ai-pivot-company-refocuses-on-hbm-and-enterprise-customers)
- [Micron addresses Crucial exit backlash — DRAM drought could last until 2028 — Tom's Hardware](https://www.tomshardware.com/pc-components/ram/micron-addresses-crucial-exit-backlash-we-are-trying-to-help-consumers-around-the-world-company-warns-that-dram-drought-could-last-until-at-least-2028)
- [Micron outlines grim outlook for DRAM supply — can only meet 50-66% of demand — Tom's Hardware](https://www.tomshardware.com/pc-components/dram/micron-outlines-grim-outlook-for-dram-supply-in-first-earnings-call-since-killing-crucial-memory-and-ssd-brand-ceo-says-it-can-only-meet-half-to-two-thirds-of-demand)

### Recul d'OpenAI et Nvidia

- [Stargate AI data centers delayed by squabbles between partners — Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/stargate-ai-data-centers-for-openai-reportedly-delayed-by-squabbles-between-partners-sources-say-openai-oracle-and-softbank-disagreed-on-who-would-have-ultimate-control-of-the-planned-data-centers)
- [Nvidia's plan to invest $100 billion in OpenAI appears unlikely — Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidias-plan-to-invest-usd100-billion-in-openai-appears-unlikely-jensen-reportedly-criticizing-openais-business-decisions-in-private-discussions)

### Specs HBM4

- [JEDEC finalizes HBM4 memory standard — Tom's Hardware](https://www.tomshardware.com/pc-components/ram/jedec-finalizes-hbm4-memory-standard-with-major-bandwidth-and-efficiency-upgrades)

### TurboQuant

- [TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate — ICLR 2026 (papier)](https://openreview.net/pdf/6593f484501e295cdbe7efcbc46d7f20fc7e741f.pdf)
- [Google's TurboQuant reduces AI LLM cache memory requirements by 6x — Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/googles-turboquant-compresses-llm-kv-caches-to-3-bits-with-no-accuracy-loss)
- [Google unveils TurboQuant — TechCrunch](https://techcrunch.com/2026/03/25/google-turboquant-ai-memory-compression-silicon-valley-pied-piper/)
