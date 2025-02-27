import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, Login, Signup,AllPosts,AddPost,EditPost,Post,Home } from './components';


const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
        </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
        </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
            {" "}
            <AllPosts/>
        </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost/>
        </AuthLayout>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            {" "}
            <EditPost/>
        </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:<Post/>
      }
    ]
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

