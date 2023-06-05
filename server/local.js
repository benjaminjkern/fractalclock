const app = require("./app");

const port = 8192;
app.listen(port, () => {
    console.log("Server listening on port: " + port);
});
