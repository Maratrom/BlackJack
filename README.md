# BlackJack

Note : remplacer pnpm par npm si vous n'avez que npm

Aller dans le dossier pour installer le projet et y ouvrir un terminal et faire :

- pip install virtualenv
- py -m venv .venv
- git clone https://github.com/Maratrom/BlackJack.git
- .venv\Scripts\activate
  - py -m pip install --upgrade pip
  - pip install Django django-cors-headers django-ninja

Dans un autre terminal, aller dans BlackJack/Frontend :

- pnpm install

Pour lancer le Back (depuis la racine du git BlackJack/) :

- cd Backend
- ..\..\.venv\Scripts\activate
  - py manage.py runserver

Pour lancer le front, dans un autre terminal (depuis la racine du git BlackJack/):

- cd Frontend
- pnpm run dev
