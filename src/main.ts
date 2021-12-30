import App from "./app.js";

const app = new App();
// console.log("antes",app.init());

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// async function injectFile() {
//   let tab = await getCurrentTab();
//   chrome.scripting.executeScript({
//     target: {tabId: tab.id},
//     files: ['./dist/app.js']
//   });
// }

// injectFile();
const test2 = 2
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

async function injectFunction() {
  let tab = await getCurrentTab();

  let name = 'World';
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: test,
    args: [test2]
  }, (e: any) => {
    console.log("q isso", e)
  });
};
injectFunction();

