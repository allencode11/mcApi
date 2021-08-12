### <div align = "center">Rest Api

 <div align = "center"> This is a simple api with crud operations on  item and user model with authentication and authorization, built with nodejs, express and mongoose.
</div>

>Tools
1. nodejs
2. express
3. mongoDb / mongoose
4. Jwt token

> Run the app

To run this app you will need to have the nodejs installed on your computer and to install/clone it locally using npm :
```bash
$ npm clone https://github.com/allencode11/mcApi/auth

$ npm init

$ node index

// or 
$ npm run Dev

// or
$ npm start
```

> Run the tests

To run the tests you will need the mocha framework. 

```bash
$ npm test
```
 ### Api features 
1. get all items or a specific item by his id;
2. create a new item;
3. deleting item if you are its owner
4. update an item if you are its owner
5. login / logout
6. register a new user


### HTTP verbs

|  <center> Method </center>| <center> Crud operation </center> | <center> url </center>|<center> url:id </center> | <center> description </center> |
|---|---|---|---|---|
| <center> post </center>| <center> create </center> |  <center> /items/ </center>|  <center> x </center> | create a new item |
| <center> get </center> | read |  /items/ | /items/:id| get all items or an item with this specific id |
| <center> delete </center> | <center> delete </center> |  <center> x </center> | <center> /items/:id </center> | delete from database the item with this id if the user is also the owner |
| <center> patch </center> | <center> update </center> |  <center> x </center> | <center> /items/:id </center> | change the specification of the item with this id if the user is the owner of this item |
| <center> register </center> | <center> create </center> | <center> /users/register </center> | <center> x </center> | create a new account (this feature is only for admin |
| <center> login </center> | <center> get </center> | <center> /users/login </center> | <center> x </center> | authenticate the user and create the jwt token |
| <center> get </center> | read |  /users/ | /users/:id| get all users or an user with this specific id (feature only for admin)|
| <center> delete </center> | <center> delete </center> |  <center> x </center> | <center> /users/:id </center> | delete the user from database if the id and user are the same or if the user is admin |
| <center> patch </center> | <center> update </center> |  <center> x </center> | <center> /users/:id </center> | allow users to reset the password for their accounts |


#### request example
http://localhost:3000/items


#### response example
```json
{
"status": "success",
"results": 3,
"data": {
    "items": [
      {
        "_id": "6114c81cc49adc1f5c38edee",
        "title": "Item number two13",
        "owner": "alina.enache@gmail.com",
        "slug": "slug number two13",
        "price": 100,
        "description": "description for the second item13",
        "__v": 0
      },
      {
        "_id": "6114c81cc49adc1f5c38edfe",
        "title": "Item number two14",
        "owner": "alina.enache@gmail.com",
        "slug": "slug number two15",
        "price": 200,
        "description": "description for the second item13",
        "__v": 0
      },
      {
        "_id": "6114c81cc49adc1f5c38edwe",
        "title": "Item number two15",
        "owner": "alina.enache@gmail.com",
        "slug": "slug number two15",
        "price": 300,
        "description": "description for the second item15",
        "__v": 0
      }
    ]
  }
}
```
