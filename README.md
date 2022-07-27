# News-Admin
React-based news release management system:newspaper:

## Introduction

###### This is a React-based global news release background management system.

###### The main functions implemented by the project are:

- ###### Login module

- ###### Data analysis: Display news information through data visualization

- ###### Authority management: User routing authority management

- ###### Role management: global administrator, regional administrator, regional editor

- ###### User management: all background management users

- ###### News management: including writing news, news categories and drafts

- ###### Moderation Management: Admin Moderation News

- ###### Release Management: News Release, Delisting and Deletion

###### Technology Stack:

- ###### React

- ###### Redux

- ###### Antd

- ###### Echarts

- ###### Axios

## Implement

### Routing Architecture

###### Parent Route:

- ###### `/`  main interface route

- ###### `/login` login route

- ###### `/news` Guest system route

- ###### `/detail/:id` Guest system route

###### Sub Route(/*):

- ###### `/user-manage/list` User manage list route

- ###### `/right-manage` Right manage route

  - ###### `/role/list` Role list route

  - ###### `/right/list` Right list route

- ###### `/news-manage` News manage route

  - ###### `/add` Add news route

  - ###### `/draft` News draft route

  - ###### `/category` News category route

  - ###### `/preview/:id` News preview route

  - ###### `/update/:id` New update route

- ###### `/audit-manage` Audit manage route

  - ###### `/audit` Audit route

  - ###### `/list` List route

- ###### `/publish-manage` Publish manage route

  - ###### `/unpublished`  Unpublished route

  - ###### `/published` Published route

  - ###### `/sunset` Subset route

###### Dynamic Subrouting:

- ###### Create a list of all routes-components ({key:path,value:component}) `LocalRouterMap`

- ###### Sub-routes obtain the list of back-end routes through axios and generate dynamic routes according to different roles

- ###### Determine whether to establish a route: 

  - ###### `checkRoute`: Permission switch and judging whether the routing path returned from the backend exists in LocalRouterMap

    ```react
    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }
    ```

    ###### `item.pagepermission`: Sidebar permission switch

    ###### `item.routerpermisson`: Routing permission switch

  - ###### `checkUserPermission`: Determine whether the current user has the permission

###### Route Guard:

- ###### Customize the `useLocalStorage` hook to store user information, and synchronize the state value in the browser's local storage when the page is refreshed.

  ```react
  import {useState} from "react";
  
  export const useLocalStorage = (keyName, defaultValue) => {
      const [storageValue, setStorageValue] = useState(() => {
          try {
              const value = window.localStorage.getItem(keyName);
              if (value) {
                  return JSON.parse(value)
              } else {
                  window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
                  return defaultValue
              }
          } catch (e) {
              return defaultValue
          }
      })
      const setValue = (value) => {
          try {
              window.localStorage.setItem(keyName, JSON.stringify(value))
          } catch (e) {
  
          }
          setStorageValue(value)
      }
      return [storageValue, setValue]
  }
  ```

- ###### A custom `useAuth` hook that will handle the state of the authenticated user using the `Context API` and the `useContext` hook

  ```react
  const AuthContext = createContext(null)
  
  export const AuthProvider = ({children}) => {
      const [user, setUser] = useLocalStorage("user", null)
      const navigate = useNavigate()
  
      const login = useCallback(async (data) => {
          await setUser(data)
          navigate('/')
      }, [])
  
      const logout = useCallback(async () => {
          await setUser(null)
          navigate('/login', {replace: true})
      }, [])
  
      const value = useMemo(() => ({
          user,
          login,
          logout
      }), [user])
  
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }
  
  export const useAuth = () => {
      return useContext(AuthContext)
  }
  ```

### Layout 

###### Using the Layout component in Antd to achieve a two-column layout on the side, when the horizontal space of the page is limited, the side navigation can be collapsed

```react
<Layout>
...
</Layout>
```

### TopHeader

###### Set the page header information, use the `Header` component, render a button on the left to control whether the sidebar shrinks, and use the `Dropdown` component on the right to display basic user information

###### Redux State Management:

- ###### Create CollapsedSlice

  ```react
  export const collapsedSlice = createSlice({
      name: 'collapsed',
      initialState: {
          isCollapsed: false
      },
      reducers: {
          changeCollapsed(state) {
              state.isCollapsed = !state.isCollapsed
          }
      }
  })
  
  export const {changeCollapsed} = collapsedSlice.actions
  
  export default collapsedSlice.reducer
  ```

- ###### Create Store

  ```react
  export default configureStore({
    reducer: {
      collapsed: CollapsedReducer
    }
  })
  ```

- ###### Operating State:useDispatch() returns a function that dispatches state, useSelector() returns the state managed in Redux

  ```react
  const dispatch = useDispatch()
  const {isCollapsed} = useSelector(state => state.collapsed)
  ```

### SideMenu

###### The sidebar showcases user-operable features: Use the `Sider` component to control the sidebar and sidebar shrinkage, and use the `Menu` component to render the sidebar content

###### Dynamic Sidebar:Read the sidebar page permissions from the backend, then process the data and pass it to the `Menu` component as items

###### `checkPagePermissions`: Verify that sidebar permissions are rendered to the interface

```react
function checkPagePermissions(items) {
    return items.filter(item => item.pagepermisson === 1 && rights.includes(item.key)).map(item => {
        item.children = item.children.filter(arr => arr.pagepermisson === 1 && rights.includes(arr.key)).map(arr => {
            return {key: arr.key, label: arr.title}
        })
        if (item.children.length > 0) {
            return {key: item.key, label: item.title, children: item.children, icon: iconList[item.key]}
        }
        return {key: item.key, label: item.title, icon: iconList[item.key]}
    })
}
```

### RightList

###### The Table component displays the list of permissions and implements the functions of permission switch and permission deletion

###### `switchMethod`: Permission switch, axios sends a patch request to the background, inverting the value of pagepermission

```react
const switchMethod = (item) => {
  item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
  if (item.grade === 1) {
    axios.patch(`/rights/${item.id}`, {
      pagepermisson: item.pagepermisson
    })
  } else {
    axios.patch(`/children/${item.id}`, {
      pagepermisson: item.pagepermisson
    })
  }
}
```

### RoleList

###### Use the Table component to display the list of roles, and use the Tree structure to display the list of roles' permissions

###### Edit role permissions：

- ###### `onCheck`: Permission switch function,set the current permission list

- ###### `handleOK`: Edit the successful processing function, set the modal box to hide, modify the DataSource, and modify the corresponding permission list data in the background 

### UserList

###### Realize user list display, add user, delete user and modify user functions.Extract the form component as a subcomponent of the modal box for adding users and updating users.Use forwardRef reference to pass, so that the parent component can get the information of the child component form

###### Add user:

```react
<UserForm regionList={regionList} roleList={roleList} ref={addForm}/>
```

###### Update user:

```react
<UserForm regionList={regionList} roleList={roleList} ref={updateForm}
                          isUpdateDisabled={isUpdateDisabled} isUpdate={true}/>
```

###### isUpdateDisabled: Controls whether the form area information can be selected, the super administrator cannot select the region

###### isUpdate: Is it an update status

```react
//Change whether the area box is optional
const changeRegionDisabled = (value) => {
    if (isUpdate) {
        return roleId !== 1;
    } else {
        if (roleId === 1) {
            return false
        } else {
            return value !== region
        }
    }
}
```

```react
//Change whether the role box is optional
const changeRoleDisabled = (item) => {
    if (isUpdate) {
        return roleId !== 1;
    } else {
        if (roleId === 1) {
            return false
        } else {
            return item.id !== 3
        }
    }
}
```

### Login

###### Use the Form component to realize the user's login box, and use tsparticles to realize the particle effect of the interface

### NewsManage

#### NewsAdd

###### The Steps component implements the step bar function, and wangEditor implements a rich text editor for writing news content. After the step bar is completed, it implements the function of submitting drafts and submitting for review.

###### Step bar next function:

```react
const next = () => {
    if (current === 0) {
        NewsRef.current.validateFields().then(res => {
            setFormInfo(res)
            setCurrent(current + 1);
        }).catch(err => {
            console.log(err)
        })
    } else {
        const pattern = /<p>(&nbsp;)*<\/p>/
        if (content === '' || pattern.test(content) || content === '<p><br></p>') {
            message.error('新闻内容不能为空')
        } else {
            setCurrent(current + 1);
        }
    }
}
```

#### NewsCategory

###### The Table component displays news categories, EditableRow implements editable rows, and EditableCell implements editable columns

```react
//Add this property to Table to enable editable cells
components={{
    body: {
        row: EditableRow,
            cell: EditableCell,
    },
```

#### NewsDraft

###### The Table component displays the news content edited by the current user, and realizes the functions of viewing news and deleting news

#### NewsPreview

###### Display of news content, including creator, creation time, release time, region, review status, release status, number of visits, number of comments and number of likes

```react
//audit status array
const auditList = ["未审核", '审核中', '已通过', '未通过']
//publish status array
const publishList = ["未发布", '待发布', '已上线', '已下线']
```

#### NewsUpdate

###### Route incoming dynamic id, display the corresponding interface, similar to the writing news interface, data and content are automatically filled, and the news content can be changed. After the update is completed, the notification widget is used to realize the notification function

### AuditManage

#### Aduit

















