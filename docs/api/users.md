# Users

## Current user

Get json data about the current user.

```
GET /users/current
```

```json
{
    "data": {
        "type": "user",
        "id": "1",
        "attributes": {
            "email": "user@example.com",
            "first_name": "Admin",
            "last_name": "Developer",
            "country": "GB",
            "status": true
        },
        "links": {
            "self": "https://example.com/api/users/1"
        }
    }
}
```
