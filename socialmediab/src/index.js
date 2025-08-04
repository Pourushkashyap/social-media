import dotenv from 'dotenv'
import connectdb from './db/index.js';
import app from './app.js'

dotenv.config({
    path:'./.env'
});

app.get('/login',(req,res) =>{
    req.send("hello,  my name is pourush");

})

connectdb()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`App is listening on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.log('Error happened on listening:', error);
    });