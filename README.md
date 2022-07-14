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

