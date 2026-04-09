# RentEase - Rental Platform (India)

Full-stack rental platform where owners can list houses/farmhouses/villas and customers can search, save, and send booking requests.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Authentication: JWT
- Uploads: Multer

## Folder Structure
```
client/
server/
  config/
  controllers/
  middleware/
  models/
  routes/
```

## Backend Setup
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

## Frontend Setup
```bash
cd client
npm install
npm run dev
```

## API Endpoints
### Auth
- `POST /api/register`
- `POST /api/login`

### Properties
- `POST /api/properties`
- `GET /api/properties`
- `GET /api/properties/:id`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`

### Filters
Use query params:
`GET /api/properties?state=&city=&pincode=&type=&priceMin=&priceMax=&landmark=`

### Other
- `POST /api/bookings`
- `GET /api/bookings/me`
- `GET/POST/DELETE /api/wishlist`
- `GET /api/admin/users`
- `GET /api/admin/properties/pending`

## Notes
- New properties are created with `isApproved=false`; admin must approve before appearing in public listing.
- Signup role options include owner and customer. Admin users can be seeded directly in DB.
