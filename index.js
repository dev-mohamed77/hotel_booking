const express = require('express');
const customer_route = require("./route/customer.route");
const authRouter = require("./route/auth.route");
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


dotenv.config();

const app = express();

const port = process.env.PORT || 3100;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/customer", customer_route);
app.use("/auth", authRouter);


app.listen(port, () => {
    console.log("Server running on port " + port);
});