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

###### Sub-routes obtain the list of back-end routes through axios and generate dynamic routes according to different roles



### Layout 

###### Using the Layout component in Antd to achieve a two-column layout on the side, when the horizontal space of the page is limited, the side navigation can be collapsed

```react
<Layout>
...
</Layout>
```

### TopHeader

