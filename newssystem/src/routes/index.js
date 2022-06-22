import Login from "../pages/Login";
import NewsSendBoxLayout from "../pages/SandBoxLayout";
import Home from "../pages/SandBoxLayout/Home";
import UserList from "../pages/SandBoxLayout/UserManage";
import RoleList from "../pages/SandBoxLayout/RightManage/Role";
import RightList from "../pages/SandBoxLayout/RightManage/Right";
import {Navigate} from "react-router-dom";
import NoPermission from "../pages/SandBoxLayout/NoPermission";
import NewsAdd from "../pages/SandBoxLayout/NewsManage/NewsAdd";
import NewsDraft from "../pages/SandBoxLayout/NewsManage/NewsDraft";
import NewsCategory from "../pages/SandBoxLayout/NewsManage/NewsCategory";
import Audit from "../pages/SandBoxLayout/AduitManage/Audit";
import AuditList from "../pages/SandBoxLayout/AduitManage/AuditList";
import Unpublished from "../pages/SandBoxLayout/PublishManage/Unpublished";
import Published from "../pages/SandBoxLayout/PublishManage/Published";
import Sunset from "../pages/SandBoxLayout/PublishManage/Sunset";

const SuperAdminRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <NewsSendBoxLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/home'/>
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'user-manage/list',
                element: <UserList/>
            },
            {
                path: 'right-manage',
                children: [
                    {
                        path: 'role/list',
                        element: <RoleList/>
                    },
                    {
                        path: 'right/list',
                        element: <RightList/>
                    }
                ]
            },
            {
                path: 'news-manage',
                children: [
                    {
                        path: 'add',
                        element: <NewsAdd/>
                    },
                    {
                        path: 'draft',
                        element: <NewsDraft/>
                    },
                    {
                        path: 'category',
                        element: <NewsCategory/>
                    }
                ]
            },
            {
                path: 'audit-manage',
                children: [
                    {
                        path: 'audit',
                        element: <Audit/>
                    },
                    {
                        path: 'list',
                        element: <AuditList/>
                    }
                ]
            },
            {
                path: 'publish-manage',
                children: [
                    {
                        path: 'unpublished',
                        element: <Unpublished/>
                    },
                    {
                        path: 'published',
                        element: <Published/>
                    },
                    {
                        path: 'sunset',
                        element: <Sunset/>
                    }
                ]
            },
            {
                path: '*',
                element: <NoPermission/>
            }
        ]
    }
]

const AdminRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <NewsSendBoxLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/home'/>
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'user-manage/list',
                element: <UserList/>
            },
            {
                path: 'news-manage',
                children: [
                    {
                        path: 'add',
                        element: <NewsAdd/>
                    },
                    {
                        path: 'draft',
                        element: <NewsDraft/>
                    },
                    {
                        path: 'category',
                        element: <NewsCategory/>
                    }
                ]
            },
            {
                path: 'audit-manage',
                children: [
                    {
                        path: 'audit',
                        element: <Audit/>
                    },
                    {
                        path: 'list',
                        element: <AuditList/>
                    }
                ]
            },
            {
                path: 'publish-manage',
                children: [
                    {
                        path: 'unpublished',
                        element: <Unpublished/>
                    },
                    {
                        path: 'published',
                        element: <Published/>
                    },
                    {
                        path: 'sunset',
                        element: <Sunset/>
                    }
                ]
            },
            {
                path: '*',
                element: <NoPermission/>
            }
        ]
    }
]

const EditorRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <NewsSendBoxLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/home'/>
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'news-manage',
                children: [
                    {
                        path: 'add',
                        element: <NewsAdd/>
                    },
                    {
                        path: 'draft',
                        element: <NewsDraft/>
                    },
                ]
            },
            {
                path: 'audit-manage',
                children: [
                    {
                        path: 'list',
                        element: <AuditList/>
                    }
                ]
            },
            {
                path: 'publish-manage',
                children: [
                    {
                        path: 'unpublished',
                        element: <Unpublished/>
                    },
                    {
                        path: 'published',
                        element: <Published/>
                    },
                    {
                        path: 'sunset',
                        element: <Sunset/>
                    }
                ]
            },
            {
                path: '*',
                element: <NoPermission/>
            }
        ]
    }
]

const routes = [SuperAdminRoutes, AdminRoutes, EditorRoutes]

export default routes