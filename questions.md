QUESTIONS
Merci de répondre librement et le plus clairement possible aux questions suivantes:

PUT & PATCH
Quelle est la différence entre un PUT un PATCH
PUT c'est une methode qui sert a mettre a jour une ressource dans son entierete, tandis que patch sert a mettre a jour seulement les attributs choisis, ca permet donc aussi d'alleger le payload

FETCH/AXIOS
Pourquoi un call vers mon api depuis Postman fonctionne mais semble bloqué lorsque le même call est exécuté par Firefox?
Il peut y avoir des problemes de CORS, des problemes de certif SSL, ces 2 la pouvant etre regles par le biais de header, par exemple allow origin all pour le cors ou encore des verify_peer a false pour le ssl (en tout cas en curl php je fais comme ca ahah) mais aussi des problemes de firewall (par exemple des json en get a mon entreprise on refuse la requete) ou juste le navigateur qui bloque simplement

NGINX/APACHE
Qu'est ce qui justifie d'avoir en plus de notre api node un serveur web comme Apache ou Nginx?
On a les avantages des serveurs web : gestion de la charge et sa repartition de la securite en plus avec le htaccess par exemple, faire du proxy


PERFORMANCES
Citez 3 axes vus en cours pour améliorer les performance d'une api Rest
Mise en cache, Opti de la bdd histoire de pas avoir une repose a rallonge et aussi de la compression de donnees