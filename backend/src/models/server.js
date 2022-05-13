const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app            = express();
        this.port           = process.env.PORT;
        this.loginPath      = "/api/login";
        this.userPath       = "/api/user";
        this.estadiosPath   = "/api/estadios";
        this.equiposPath    = "/api/equipos";
        this.partidosPath   = "/api/partidos";
        this.quinielasPath  = "/api/quinielas";
        this.fasesPath      = "/api/fases";
    

        this.middelwares();

        this.routes();
    }
    middelwares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }
    routes() {
        this.app.use(this.loginPath,    require("../routes/login.routes"));
        this.app.use(this.userPath,     require("../routes/user.routes"));
        this.app.use(this.estadiosPath, require("../routes/estadio.routes"));
        this.app.use(this.equiposPath,  require("../routes/equipos.routes"));
        this.app.use(this.partidosPath, require("../routes/partidos.routes"));
        this.app.use(this.quinielasPath,require("../routes/quinielas.routes"));
        this.app.use(this.fasesPath,    require("../routes/fases.routes"));
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor corriendo en el puerto ", process.env.PORT);
        });
    }
}
module.exports = Server;
