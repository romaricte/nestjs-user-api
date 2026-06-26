Un module encapsule ses providers.
Un provider n’est pas automatiquement disponible partout.
Pour partager un provider, il faut l’exporter.
Pour consommer un provider exporté, il faut importer son module.
AppModule ne doit pas devenir un fichier géant.
FeatureModule contient une fonctionnalité métier.
SharedModule contient des outils réutilisables.
CoreModule contient les services techniques centraux.
useValue injecte une valeur.
useClass injecte une classe choisie.
useFactory construit dynamiquement un provider.
Les dépendances circulaires doivent être évitées.