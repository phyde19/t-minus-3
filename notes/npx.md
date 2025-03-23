📦 Priority Lookup Order
When you run:

bash
Copy
Edit
npx some-tool
Here’s how it decides what to run:

Looks in your local node_modules/.bin/
If it's already installed locally, it uses that.

If not found, it downloads from npm into a temp cache

Installs the latest version (unless you specify one)

Caches it in your user directory

Then runs it

Does not install it into your package.json

🗂 Where Does It Store Stuff?
Cached downloads go into:

arduino
Copy
Edit
~/.npm/_npx/<random-hash>/
(or %AppData%\npm-cache on Windows)

These are temporary — they get cleaned over time