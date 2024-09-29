import express from "express"; 
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import userRouter from "./api/users/user.router.js"; 
import postRouter from "./api/users/posts.router.js"; 
import dotenv from 'dotenv';
dotenv.config();  

// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('SERVER_PORT:', process.env.SERVER_PORT);
// console.log('database:', process.env.MYSQL_DB,);
// console.log('port:', process.env.DB_PORT,);


const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRouter); 
app.use("/posts", postRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log("server is running at localhost:", process.env.SERVER_PORT);
    
});
