Endpoints

Users
POST /users/register: Register a new user.
POST /users/login: Authenticate a user and return a token.
GET /users/profile: Get the profile of the logged-in user.

Items
GET /items: Retrieve all auction items (with pagination).
GET /items/ : Retrieve a single auction item by ID.
POST /items : Create a new auction item. (Authenticated users, image upload)
PUT /items/ : Update an auction item by ID. (Authenticated users, only item owners or admins)
DELETE /items/ : Delete an auction item by ID. (Authenticated users, only item owners or admins)

Bids
GET /items/
/bids: Retrieve all bids for a specific item.
POST /items/
/bids: Place a new bid on a specific item. (Authenticated users)

Notifications
GET /notifications: Retrieve notifications for the logged-in user.
POST /notifications/mark-read: Mark notifications as read.

WebSocket Events
Bidding
bid: Place a new bid on an item.
update: Notify all connected clients about a new bid on an item.

Notifications
notify: Send notifications to users in real-time.

Technologies Used
Node.js
Express
Socket.io
MySQL
Sequelize
JWT (JSON Web Tokens)
bcrypt (for password hashing)
