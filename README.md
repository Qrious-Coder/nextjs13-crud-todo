#Use *Next.js* 13 to build and deploy a simple **CRUD** application

## Structure
```
├── components/
│   ├── EntryForm.jsx
│   ├── LoginBtn.jsx
│   ├── Nav.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── app/
│   ├── api/
│   │ 	├── auth
│   │	│ 	├── [...nextauth]
│   │	│ 	│  	├── route.js
│   │ 	├── todos/
│   │	│ 	├── [id].js
│   │	│ 	├── route.js
│   ├── entry/
│   │ 	├── page.js
│   ├── todos/
│   │ 	├── page.js
│   ├── layout.js
│   └── page.js
├── db/
│   ├── models/
│   │ 	├── TodoList.js
│   │ 	└── User.js
│   └── db.js
├── public/
│   ├── favicon.ico
│   └── ...
├── redux/
│   ├── actions/
│   │   ├── authActions.js
│   │   ├── todoActions.js
│   │   └── ...
│   ├── reducers/
│   │   ├── authReducer.js
│   │   ├── todoReducer.js
│   │   └── ...
│   ├── store.js
│   └── ...
└── styles/
    ├── globals.css
    └── tailwind.css
```
## Credential authentication with next-auth/next-connect/MongoDB, 
### ref: https://fullstackdigital.io/blog/authentication-starter-kit-for-next-js-and-mongodb/
#### Database
1. npm i mongoose next-auth next-connect validator bcrypt
2. Create a user model with mongoose
3. Create dbConnect()
#### Backend
1. Set up endpoints: _api/auth/register.js_ and _api/auth/[...nextauth].js 
2. Create (API route) handler with next-connect @/utils/handler.js 
3. Use handler to create register.js for new user api/auth/register.js
4. @[...nextauth].js : create a NextAuth function includes: 
   - session: Enable JSON Web Tokens
   - providers: use SSO or credentials(email and password)
   - callback: get token and user info
   - pages: '/login'
#### Frontend:
1. 
