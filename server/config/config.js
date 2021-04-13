const config = {
    PORT:4000,    
    DB_URI:'mongodb+srv://galina:hTCl55Da8bN4qW22@freecluster.gdzjo.mongodb.net/YummyDB?retryWrites=true&w=majority',
    SALT_ROUNDS:10,
    SECRET:'supersecret',
    COOKIE_NAME:'USER_SESSION',
}
module.exports = config;