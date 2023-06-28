const currentUserRole = 'Director'

const newGameNight = {
    id: null,
    date: "",
    parseObject: null,
    options: []
}

const newCredentials = {
    username: '',
    password: ''
}

const login = {
    "objectId": "7vR9hH9JG9",
    "username": "ya",
    "createdAt": "2021-10-30T22:43:26.382Z",
    "updatedAt": "2021-10-30T22:43:26.382Z",
    "roles": [currentUserRole],
    "ACL": {
        "*": {
            "read": true,
            "write": true
        }
    },
    "sessionToken": "r:46008f49e00cf39391ab752133674c6e"
}


const newUser = {
    parseObject: null,
    createdAt: null,
    roles: [],
    id: "",
    username: "",
    isApproved: false,
    groupRole: null,
    createBankAccount: false
}

const users = {
    "results": [
        {
            "objectId": "ScPJhZhiYy",
            "username": "djimenez",
            "createdAt": "2021-04-08T23:45:45.777Z",
            "updatedAt": "2021-11-07T14:02:01.889Z",
            "roles": ["Director"],
            "ACL": {
                "*": {
                    "read": true
                },
                "ScPJhZhiYy": {
                    "read": true,
                    "write": true
                }
            }
        },
        {
            "objectId": "1231512re",
            "username": "ya",
            "createdAt": "2021-04-08T23:45:45.777Z",
            "updatedAt": "2021-11-07T14:02:01.889Z",
            "roles": [currentUserRole],
            "ACL": {
                "*": {
                    "read": true
                },
                "1231512re": {
                    "read": true,
                    "write": true
                }
            }
        },
        {
            "objectId": "VXgWG7dGjW",
            "username": "jcanty",
            "createdAt": "2021-10-26T03:45:11.089Z",
            "updatedAt": "2021-11-07T14:03:35.327Z",
            "roles": ["Staff"],
            "ACL": {
                "*": {
                    "read": true
                },
                "VXgWG7dGjW": {
                    "read": true,
                    "write": true
                }
            }
        },
        {
            "objectId": "7vR9hH9JG9",
            "username": "Yeet",
            "createdAt": "2021-11-01T00:20:26.329Z",
            "updatedAt": "2021-11-07T14:01:18.842Z",
            "roles": ["Cadet"],
            "ACL": {
                "7vR9hH9JG9": {
                    "read": true,
                    "write": true
                },
                "*": {
                    "read": true
                }
            }
        },
        {
            "objectId": "n29DH7w6Vw",
            "username": "Temaris",
            "createdAt": "2021-11-03T19:16:55.545Z",
            "updatedAt": "2021-11-07T01:30:05.081Z",
            "roles": ["Staff"],
            "ACL": {
                "*": {
                    "read": true
                },
                "n29DH7w6Vw": {
                    "read": true,
                    "write": true
                }
            }
        },
        {
            "objectId": "SwONbdgcpV",
            "username": "test2",
            "createdAt": "2021-11-06T17:00:31.632Z",
            "updatedAt": "2021-11-06T17:11:52.321Z",
            "roles": ["Teen"],
            "ACL": {
                "*": {
                    "read": true
                },
                "SwONbdgcpV": {
                    "read": true,
                    "write": true
                }
            }
        },
        {
            "objectId": "DhitI8jDbZ",
            "username": "test3",
            "createdAt": "2021-11-06T17:06:58.084Z",
            "updatedAt": "2021-11-06T17:11:37.603Z",
            "roles": ["Junior"],
            "ACL": {
                "*": {
                    "read": true
                },
                "DhitI8jDbZ": {
                    "read": true,
                    "write": true
                }
            }
        },
        {
            "objectId": "BSXBqo8J7I",
            "username": "test7",
            "createdAt": "2021-11-06T17:08:13.906Z",
            "updatedAt": "2021-11-06T17:10:08.270Z",
            "roles": ["Intermediate"],
            "ACL": {
                "*": {
                    "read": true
                },
                "BSXBqo8J7I": {
                    "read": true,
                    "write": true
                }
            }
        }
    ]
}



// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
    newCredentials,
    newUser,
    newGameNight,
    users,
    login
};
