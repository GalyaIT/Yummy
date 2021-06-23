const dotenv =require('dotenv')
dotenv.config();
const config = {
    PORT:process.env.PORT || 4000,     
    DB_URI:process.env.DB_URI,
    SALT_ROUNDS:process.env.SALT_ROUNDS,
    SECRET:process.env.SECRET,
    COOKIE_NAME:process.env.COOKIE_NAME,
}
module.exports = config;

