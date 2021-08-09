define({ "api": [
  {
    "type": "post",
    "url": "/items",
    "title": "create a new item",
    "name": "createItem",
    "group": "Item",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n   \"status\": \"success\",\n   \"message\": \"Created\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>User does not have the permission for adding new items</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 accessDenied\n{\n      \"message\": \"access denied\",\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/itemController.js",
    "groupTitle": "Item"
  },
  {
    "type": "delete",
    "url": "/items/:id",
    "title": "Remove an item from database.",
    "name": "deleteItem",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n   \"status\": \"success\",\n   \"message\": \"deleted\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>User does not have the permission for adding new items</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 accessDenied\n{\n      \"message\": \"access denied\",\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/itemController.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/items",
    "title": "requesting all items from database.",
    "name": "getAllItems",
    "group": "Item",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"success\",\n    \"results\": 2,\n    \"data\": {\n        \"items\": [\n            {\n                \"_id\": \"6110ebbeb030da6d0cdd9b1a\",\n                \"title\": \"Item number ten\",\n                \"slug\": \"slug number ten\",\n                \"price\": 1000,\n                \"description\": \"description for the tenth item\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"61110e90fab753848776b398\",\n                \"title\": \"Item number ten12\",\n                \"slug\": \"slug number ten12\",\n                \"price\": 2000,\n                \"description\": \"description for the tenth12 item\",\n                \"__v\": 0\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "isEmpty",
            "description": "<p>there are no records in the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 isEmpty\n{\n      \"message\": \"collection is empty\",\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/itemController.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/items/:id",
    "title": "requesting an item from database.",
    "name": "getItem",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n   \"status\": \"success\"\n   \"data\": {\n               \"_id\": \"6110ebbeb030da6d0cdd9b1a\",\n               \"title\": \"Item number ten\",\n               \"slug\": \"slug number ten\",\n               \"price\": 1000,\n               \"description\": \"description for the tenth item\",\n               \"__v\": 0\n           }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notfound",
            "description": "<p>There are no records with this fields in the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 notFound\n{\n      \"message\": \"No such item\",\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/itemController.js",
    "groupTitle": "Item"
  },
  {
    "type": "patch",
    "url": "/items/:id",
    "title": "update an item from database.",
    "name": "updateItem",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n     \"status\": \"success\",\n     \"message\": \"updated\",\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notfound",
            "description": "<p>There are no records with this fields in the database</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "accessDenied",
            "description": "<p>User does not have the permission for this action</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 notFound\n{\n      \"message\": \"No such item\",\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/itemController.js",
    "groupTitle": "Item"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Request User information",
    "name": "DeleteUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID. *</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"success\",\n    \"message\": \"deleted\",\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notFound",
            "description": "<p>The collection of the Users does not have a record with this idy.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Users does not have the permissions for this route.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 AccessDenied\n{\n  \"message\": \"access denied\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request User information",
    "name": "GetAllUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"success\",\n    \"results\": 2,\n    \"data\": {\n        \"items\": [\n            {\n                \"_id\": \"6110ebbeb030da6d0cdd9b1a\",\n                \"title\": \"Item number ten\",\n                \"slug\": \"slug number ten\",\n                \"price\": 1000,\n                \"description\": \"description for the tenth item\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"61110e90fab753848776b398\",\n                \"title\": \"Item number ten12\",\n                \"slug\": \"slug number ten12\",\n                \"price\": 2000,\n                \"description\": \"description for the tenth12 item\",\n                \"__v\": 0\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "isEmpty",
            "description": "<p>The collection of the Users is empty.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Users does not have the permissions for this route.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 AccessDenied\n{\n  \"message\": \"access denied\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request the information about specific user",
    "name": "GetUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"success\",\n    \"data\": {\n        {\n            \"_id\": \"6110ebbeb030da6d0cdd9b1a\",\n            \"title\": \"Item number ten\",\n            \"slug\": \"slug number ten\",\n            \"price\": 1000,\n            \"description\": \"description for the tenth item\",\n            \"__v\": 0\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notFound",
            "description": "<p>In the collection does not exist an user with this id.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Users does not have the permissions for this route.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 AccessDenied\n{\n  \"message\": \"access denied\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/:id",
    "title": "Request User information",
    "name": "GetUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"success\",\n    \"message\": \"updated\",\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notFound",
            "description": "<p>there are no records with this id.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Users does not have the permissions for this route.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"message\": \"access denied\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/logout",
    "title": "Logout an user",
    "name": "logout",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully lodged out\",\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "couldNotDestroyToken",
            "description": "<p>Could not destroy jwt token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 error\n{\n        \"message\": \"Could not destroy jwt token\",\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/authController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/register",
    "title": "Register a new user",
    "name": "register",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for new User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n   \"status\": \"success\",\n   \"message\": \"created\",\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Users does not have the permissions for this route.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 AccessDenied\n{\n        \"message\": \"not an admin\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/authController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Authenticate an user",
    "name": "signin",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for new User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"user\": {\n        \"_id\": \"61110f70c0fd768585a3b2e9\",\n        \"name\": \"vendor\",\n        \"photo\": \"adds\",\n        \"role\": \"vendor\",\n        \"email\": \"alina.enache1@gmail.com\",\n        \"password\": \"$2a$10$FMmhUf1lpQ7fREORyl/BueBmSdMR02RUpoMi76FoSvGaw5qc6b/CO\",\n        \"passwordConfirm\": \"$2a$10$FMmhUf1lpQ7fREORyl/BueBmSdMR02RUpoMi76FoSvGaw5qc6b/CO\",\n        \"__v\": 0\n    },\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjExMTBmNzBjMGZkNzY4NTg1YTNiMmU5IiwiZW1haWwiOiJhbGluYS5lbmFjaGUxQGdtYWlsLmNvbSIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE2Mjg1MDg0MTAsImV4cCI6MTYyODUxNTYxMH0.pLqw4LB4VGQsCEI45vIdk77QLf87cQMIdibdml4vB2o\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notFound",
            "description": "<p>Could not find a user with this credentials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Not Found\n{\n        \"message\": \"not found\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/alina/WebstormProjects/udemyApi/controlers/authController.js",
    "groupTitle": "Users"
  }
] });
