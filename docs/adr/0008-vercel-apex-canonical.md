# 0008 — Déploiement Vercel, domaine racine comme canonical

**Statut** : Acceptée

## Contexte

Domaine `brunoschvartz.dev` acheté chez Cloudflare ; hébergement décidé sur Vercel (plan Hobby, gratuit pour un usage personnel/non-commercial, ce que ce site est).

## Décision

`brunoschvartz.dev` (sans `www`) est le domaine canonique du site (`metadataBase`, Open Graph, `sitemap.xml`) ; `www.brunoschvartz.dev` redirige en 308 vers l'apex. Le DNS reste chez Cloudflare, avec les enregistrements demandés par Vercel en mode « DNS only » (proxy Cloudflare désactivé), pour que Vercel gère lui-même l'émission du certificat SSL.

## Conséquences

Une URL canonique unique évite de diluer le référencement entre apex et `www`. En échange, le proxy/CDN Cloudflare (cache, protection DDoS) n'est pas actif sur ces enregistrements : c'est directement l'edge network de Vercel qui sert le trafic.
