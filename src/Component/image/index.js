import image from "./image";
import schema from "./config";
import { reg } from "../reg";
reg({
    tpl: image,
    schema: schema,
    type: image.name
});