const users = [
    { username: "sonu", password: "123" }
];

function findUser(username, password) {
    return users.find(
        u => u.username === username && u.password === password
    );
}

module.exports = { findUser };