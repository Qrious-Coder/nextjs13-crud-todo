#Use Next.js 13 to build and deploy a CRUD application
## Project structure
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
