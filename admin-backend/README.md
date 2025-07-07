# Admin Backend

## Paleidimas

```bash
cd projektas/admin-backend
npm install
node index.js
```

Serveris veiks ant http://localhost:3001

## API Endpointai

- `POST /api/login` – prisijungimas (body: `{ password }`)
- `GET /api/data` – gauti visus duomenis
- `POST /api/data` – atnaujinti duomenis (reikia JWT tokeno)
- `POST /api/upload` – įkelti nuotrauką (reikia JWT tokeno, form-data: `file`)

## Slaptažodis

Numatytasis slaptažodis: `admin123` 