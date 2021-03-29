const config = {
    PORT:5000,
    DB_URI:'mongodb://localhost/Yammy',
    SALT_ROUNDS:10,
    SECRET:'supersecret',
    COOKIE_NAME:'USER_SESSION',
}
module.exports = config;