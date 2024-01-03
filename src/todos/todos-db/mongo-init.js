conn = new Mongo();
db = conn.getDB('todos_db');
db.createUser({
    user: 'root',
    pwd: 'root',
    roles: [
        {
            role: 'dbOwner',
            db: 'todos_db'
        }
    ]
});
