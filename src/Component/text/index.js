import text from "./text";
import schema from "./config";
import { reg } from "../reg";
reg({
    tpl: text,
    schema: schema,
    type: text.name
});