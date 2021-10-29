const PORT = process.env.PORT || 5000;

const server = require("./api/server");

server.listen(PORT, () => {
  consol.log(`listening on port ${PORT}`);
});
