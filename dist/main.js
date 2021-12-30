var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import App from "./app.js";
const app = new App();
// console.log("antes",app.init());
function getCurrentTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = yield chrome.tabs.query(queryOptions);
        return tab;
    });
}
// async function injectFile() {
//   let tab = await getCurrentTab();
//   chrome.scripting.executeScript({
//     target: {tabId: tab.id},
//     files: ['./dist/app.js']
//   });
// }
// injectFile();
const test2 = 2;
function test(test2) {
    console.log(test2);
    // console.log(document.body);
    // document.body.style.backgroundColor = "red";
    // const listModulos = [...document.querySelectorAll(".list-group-item .topico-nome")];
    // const listNomeModulos = [];
    // listModulos.forEach(modulo => {
    //   listNomeModulos.push(modulo.innerText);
    // });
    // return listNomeModulos;
}
function injectFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        let tab = yield getCurrentTab();
        let name = 'World';
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: test,
            args: [test2]
        }, (e) => {
            console.log("q isso", e);
        });
    });
}
;
injectFunction();
