import { app as application } from "./app";
import messager from "../utils/Messager";
import config from "../infra/config";

application.listen(config.web_port, () => {
  messager.serverMessage("Web server running on *:" + config.web_port)
})

