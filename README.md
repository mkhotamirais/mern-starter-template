# client

reactjs - vite

```
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
@tailwind base;
@tailwind components;
@tailwind utilities;
```

npm i react-router-dom

# server

.gitignore:

.env

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@mydbcluster.zlvfqus.mongodb.net/<database>?retryWrites=true&w=majority
ACCESS_TOKEN=access_random_string
REFRESH_TOKEN=refresh_random_string
# untuk mendapatkan random string ketik perintah berikut di terminal
# node (enter) masuk node di terminal lalu
# require('crypto').randomBytes(64).toString('hex')

```
