const config = {
    PORT:4000,
    DB_URI:'mongodb://localhost/Yummy',
    SALT_ROUNDS:10,
    SECRET:'supersecret',
    COOKIE_NAME:'USER_SESSION',
}
module.exports = config;