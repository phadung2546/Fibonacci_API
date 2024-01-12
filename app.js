const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fibonacci API",
      version: "1.0.0",
      description: "A Simple Fibonacci API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["app.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//swagger UI
/**
 * @swagger
 * /api/v1/test/{number}:
 *   get:
 *     summary: Get item by number
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         description: The number parameter
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
app.get("/api/v1/test/:number", (req, res) => {
  //var number1 = parseInt(req.params['number']);
  let number1 = req.params.number;
  if (number1 < 0) {
    res.status(400).send("Please enter positiv");
  } else if (number1 > 100 || number1 == 0) {
    res.status(400).send("Please enter your number between 1 - 100");
  } else {
    var fibo_list = [0, 1];

    for (var i = 2; i < number1; i++) {
      fibo_list.push(fibo_list[i - 1] + fibo_list[i - 2]);
    }

    res.json({
      "member-count": fibo_list.length,
      sequence: fibo_list,
      total: fibo_list.reduce((a, b) => a + b, 0),
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
