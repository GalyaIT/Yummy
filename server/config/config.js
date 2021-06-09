const config = {
    PORT:4000, 
    // DB_URI:'mongodb://localhost/Yummy',
    DB_URI:'mongodb+srv://galina:SAn7b6t68b4JGdRa@freecluster.gdzjo.mongodb.net/YummyDB?retryWrites=true&w=majority',
    SALT_ROUNDS:10,
    SECRET:'supersecret',
    COOKIE_NAME:'USER_SESSION',
}
module.exports = config;

