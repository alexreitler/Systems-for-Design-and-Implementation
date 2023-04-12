import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi:"3.0.0",
        info: { title: "MPP LAB API", version : "1.0.0" },
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

export const swaggerDocs = (app, port) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    });
    console.log(
            `Swagger docs available at http://localhost:${port}/api-docs`
        );
};