import Select from "./scripts/select.js";
class App extends Select {
    constructor() {
        super(document.querySelector(".content-select"), ["Introdução", "teste1", "teste2"]);
        this.template = "";
        this.containerApp = document.createElement("div");
        this.containerApp.setAttribute("id", "appTonDoid");
    }
    // private mounted() {
    //   this.template = `
    //     <style>
    //       @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap');
    //       * {
    //         padding: 0;
    //         margin: 0;
    //       }
    //       ul, li {
    //         list-style: none;
    //       }
    //       p, li, h1, h2, h3, span {
    //         font-family: 'Poppins', sans-serif;
    //       }
    //       button {
    //         border: none;
    //         outline: none;
    //         background-color: transparent;
    //       }
    //       .tonDroid {
    //         position: relative;
    //         padding: 12px;
    //         width: 487px;
    //         background-color: #121212;
    //         border-radius: 8px;
    //       }
    //       .tonDroid-controls {
    //         position: absolute;
    //         right: 12px;
    //         display: flex;
    //         align-items: center;
    //       }
    //       .controls-minimize,
    //       .controls-close {
    //         height: 36px;
    //         width: 40px;
    //         cursor: pointer;
    //       }
    //       .controls-minimize {
    //         font-size: 27px;
    //         color: #89898B;
    //       }
    //       .controls-minimize:hover {
    //         color: #D3D3D5;
    //       }
    //       .controls-close:hover svg path {
    //         fill: #CF6679;
    //       }
    //       .tonDroid-contents {
    //         display: flex;
    //         justify-content: space-between;
    //       }
    //       .content-title {
    //         margin-bottom: 12px;
    //         font-size: 14px;
    //         font-weight: 400;
    //         color: #D3D3D5;
    //       }
    //       .content-toggle input {
    //         display: none;
    //       }
    //       .content-toggle input:checked + label {
    //         background-color: #8B62E9;
    //       }
    //       .content-toggle input:checked + label::before {
    //         left: 24px;
    //       }
    //       .content-toggle label {
    //         position: relative;
    //         display: block;
    //         width: 38px;
    //         height: 17px;
    //         padding: 3px;
    //         background-color: #252525;
    //         border-radius: 14px;
    //         cursor: pointer;
    //         transition: all 0.3s ease;
    //       }
    //       .content-toggle label::before {
    //         content: "";
    //         position: absolute;
    //         left: 3px;
    //         width: 17px;
    //         height: 17px;
    //         background-color: #C4C4C4;
    //         border-radius: 50%;
    //         transition: all 0.3s ease;
    //       }
    //       .content-select {
    //         margin-bottom: 8px;
    //         position: relative;
    //       }
    //       .select-current {
    //         display: flex;
    //         justify-content: space-between;
    //         align-items: center;
    //         padding: 8px;
    //         max-width: 170px;
    //         background-color: #252525;
    //         border-radius: 4px;
    //         cursor: pointer;
    //       }
    //       .select-current p {
    //         margin-right: 8px;
    //         text-overflow: ellipsis;
    //         overflow: hidden;
    //         white-space: nowrap;
    //         font-size: 12px;
    //         color: #89898B;
    //       }
    //       .select-options {
    //         display: none;
    //         width: 100%;
    //         max-width: 170px;
    //         position: absolute;
    //         top: calc(100% + 4px);
    //         z-index: 1;
    //         border-radius: 4px;
    //         background-color: #252525;
    //       }
    //       .select-options.show {
    //         display: block;
    //         animation: fadeTop 0.4s forwards ease;
    //       }
    //       .select-options.closing {
    //         display: block;
    //         animation: fadeTop 0.9s forwards ease reverse;
    //       }
    //       .select-option {
    //         padding: 8px;
    //         cursor: pointer;
    //       }
    //       .select-option:first-child {
    //         border-radius: 4px 4px 0 0;
    //       }
    //       .select-option:last-child {
    //         border-radius: 0 0 4px 4px;
    //       }
    //       .select-option:hover {
    //         background-color: #393939;
    //       }
    //       .select-option p { 
    //         text-overflow: ellipsis;
    //         overflow: hidden;
    //         white-space: nowrap;
    //         font-size: 12px;
    //         color: #D3D3D5;
    //       }
    //       .select-option input {
    //         display: none;
    //       }
    //     </style>
    //     <div class="tonDroid">
    //       <div class="tonDroid-controls">
    //         <button class="controls-minimize">
    //           -
    //         </button>
    //         <button class="controls-close">
    //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#89898B"/>
    //           </svg>
    //         </button>
    //       </div>
    //       <header>
    //         <img 
    //           src="./assets/icon.png" 
    //           alt="Ton Droid, bot para realizar curso umentor"
    //         >
    //       </header>
    //       <div class="tonDroid-contents">
    //         <div class="tonDroid-content">
    //           <h2 class="content-title">
    //             Fazer prova
    //           </h2>
    //           <div class="content-toggle">
    //             <input id="toggleFazerProva" type="checkbox">
    //             <label for="toggleFazerProva"></label>
    //           </div>
    //         </div>
    //         <div class="tonDroid-content">
    //           <h2 class="content-title">
    //             Finalizar módulos
    //           </h2>
    //           <div class="content-select">
    //             <div class="select-current">
    //               <p>
    //                 Selecione um módulo
    //               </p>
    //               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M4.94 5.72668L8 8.78002L11.06 5.72668L12 6.66668L8 10.6667L4 6.66668L4.94 5.72668Z" fill="#89898B"/>
    //               </svg>
    //             </div>
    //             <ul class="select-options">
    //               <li class="select-option">
    //                 <p>
    //                   Introdução
    //                 </p>
    //                 <input value="Introdução" type="text">
    //               </li>
    //               <li class="select-option">
    //                 <p>
    //                   Estrategias validas para ecommerce
    //                 </p>
    //                 <input value="Estrategias validas para ecommerce" type="text">
    //               </li>
    //               <li class="select-option">
    //                 <p>
    //                   Relacionamento feedback retorno
    //                 </p>
    //                 <input value="Relacionamento feedback retorno" type="text">
    //               </li>
    //               <li class="select-option">
    //                 <p>
    //                   Todos os módulos
    //                 </p>
    //                 <input value="Todos os módulos" type="text">
    //               </li>
    //             </ul>
    //           </div>
    //           <div class="content-toggle">
    //             <input id="toggleModulos" type="checkbox">
    //             <label for="toggleModulos"></label>
    //           </div>
    //         </div>
    //         <div class="tonDroid-content">
    //           <h2 class="content-title">
    //             Finalizar curso
    //           </h2>
    //           <div class="content-toggle">
    //             <input id="toggleCurso" type="checkbox">
    //             <label for="toggleCurso"></label>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   `;
    //   this.containerApp.innerHTML = this.template;
    //   document.querySelector("body")?.appendChild(this.containerApp);
    // }
    init() {
        // this.mounted();
        // this.startSelect();
    }
}
console.log("oi");
export default App;
// export default App;
// const select = new Select(document.querySelector(".content-select")!, ["Introdução", "teste1", "teste2"]);
// select.start();
