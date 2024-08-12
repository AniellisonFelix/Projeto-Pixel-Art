// CRIA TITULO
document.getElementById('title').innerText = 'Paleta de Cores';
// FUNÇÃO DE CAPTURA DE CLASS E ID
const pegaelementos = (idClass) => {
  const elements = document.querySelectorAll(idClass);
  if (elements.length === 0) return;
  if (elements[0].className) return elements;
  const element = document.querySelector(idClass);
  if (element[0].id) return element;
};
// CAPTURAS
const div = document.createElement('div');
const body = document.querySelector('body');
const primeiroFilho = body.firstElementChild;
const segundoFilho = primeiroFilho.nextElementSibling;
// CRIA PALETA DE CORES
div.id = 'color-palette';
primeiroFilho.after(div);
const elementoDiv = '<div></div>';
div.insertAdjacentHTML('beforeend', elementoDiv.repeat(4));
const divsFilhas = div.querySelectorAll('div');
for (let index = 0; index < divsFilhas.length; index += 1) {
  const divFilha = divsFilhas[index];
  divFilha.classList.add('color');
}
const colorClass = pegaelementos('.color');
colorClass[0].style.backgroundColor = 'blue';
colorClass[1].style.backgroundColor = 'orange';
colorClass[2].style.backgroundColor = 'red';
colorClass[3].style.backgroundColor = 'green';
// ADICIONA CLASSE SELECTED
const colorSelect = (event) => {
  for (let index = 0; index < colorClass.length; index += 1) {
    if (colorClass[index].classList.contains('selected')) {
      colorClass[index].classList.remove('selected');
      break;
    }
  }
  event.target.classList.add('selected');
};
// CRIA BOTÃO LIMPAR
const botao = document.createElement('button');
botao.innerText = 'Limpar';
botao.id = 'clear-board';
const terceiroFilho = body.children[2];
body.insertBefore(botao, terceiroFilho);
const limpaQuadro = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
};
const idBotao = document.getElementById('clear-board');
idBotao.addEventListener('click', limpaQuadro);
// CRIA IMPUT
const input = document.createElement('input');
input.id = 'board-size';
input.placeholder = "DIGITE O TAMANHO DESEJADO AQUI"
body.insertBefore(input, terceiroFilho);
const idInput = document.getElementById('board-size');
idInput.type = 'number';
idInput.min = '1';
// SALVA TAMANHO DO QUADRO
const salvaTamanho = () => {
  const valorInput = idInput.value;
  localStorage.setItem('boardSize', valorInput);
};
// SALVANDO QUADRO NO LOCALSTORAGE
const salvaLocalStorage = () => {
  const pixelClass = document.querySelectorAll('.pixel');
  let todosElementos = '';
  for (let index = 0; index < pixelClass.length; index += 1) {
    todosElementos += pixelClass[index].outerHTML;
  }
  localStorage.setItem('pixelBoard', todosElementos);
};
// PINTA QUADRO
const pixelSelect = (event) => {
  for (let index = 0; index < colorClass.length; index += 1) {
    if (colorClass[index].classList.contains('selected')) {
      const corDeFundo = colorClass[index].style.backgroundColor;
      event.target.style.setProperty('background-color', corDeFundo);
      break;
    }
  }
  salvaLocalStorage();
};
// COLOCA CLIK NOS PIXELS
const clickOnPixels = () => {
  const pixelClass = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixelClass.length; index += 1) {
    const element = pixelClass[index];
    element.addEventListener('click', pixelSelect);
  }
};
clickOnPixels();
// ADICIONA CLASSE PIXEL AO QUADRO
const idQuadroPixel = 'pixel-board';
const addclassPixel = () => {
  const idDiv2 = document.getElementById(idQuadroPixel);
  const getFilhas = idDiv2.querySelectorAll('div');
  for (let index = 0; index < getFilhas.length; index += 1) {
    const divFilha = getFilhas[index];
    divFilha.classList.add('pixel');
  }
};
// CARREGA TAMANHO DO QUADRO
const fitContent = 'fit-content';
const recuperaTamanho = () => {
  if (localStorage.getItem('boardSize')) {
    const boardSize = parseInt(localStorage.getItem('boardSize'), 10);
    const div2 = document.createElement('div');
    div2.id = idQuadroPixel;
    segundoFilho.after(div2);
    const quadrado = boardSize ** 2;
    const divs = elementoDiv.repeat(quadrado);
    const idDiv2 = document.getElementById(idQuadroPixel);
    idDiv2.innerHTML = divs;
    addclassPixel();
    const templateColumns = `repeat(${boardSize}, 1fr)`;
    idDiv2.style.gridTemplateColumns = templateColumns;
    idDiv2.style.display = 'grid';
    idDiv2.style.width = fitContent;
    clickOnPixels();
  }
};
recuperaTamanho();
// CARREGA QUADRO SALVO
const recuperaQuadroPintado = () => {
  if (localStorage.getItem('pixelBoard')) {
    const pixelBoard = localStorage.getItem('pixelBoard');
    const idPixelBord = document.querySelector('#pixel-board');
    idPixelBord.innerHTML = pixelBoard;
  }
  clickOnPixels()
};
recuperaQuadroPintado();
// CRIA QUADRO DE PIXELS
if (localStorage.getItem('boardSize') === '' || localStorage.getItem('pixelBoard') === null) {
  const div2 = document.createElement('div');
  div2.id = idQuadroPixel;
  segundoFilho.after(div2);
  const idDiv2 = document.getElementById(idQuadroPixel);
  idDiv2.style.display = 'grid';
  idDiv2.style.width = fitContent;
  div2.insertAdjacentHTML('beforeend', elementoDiv.repeat(25));
  idDiv2.style.gridTemplateColumns = 'repeat(5, 1fr)';
  localStorage.setItem('boardSize', 5);
  addclassPixel();
  clickOnPixels();
}
// SELECIONA COR NA PALETA
for (let index = 0; index < colorClass.length; index += 1) {
  const element = colorClass[index];
  element.addEventListener('click', colorSelect);
}
// CRIA BOTÃO VQV
const botao3 = document.createElement('button');
botao3.innerText = 'Tamanho-Do-Quadro';
body.insertBefore(botao3, terceiroFilho);
botao3.id = 'generate-board';
const idbotao3 = document.getElementById('generate-board');
// CRIA BOTÃO CORES ALEATÓRIAS
const botao2 = document.createElement('button');
botao2.innerText = 'Cores aleatórias';
botao2.id = 'button-random-color';
body.insertBefore(botao2, terceiroFilho);
const coresAleatorias = () => {
  for (let index = 0; index < colorClass.length; index += 1) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgb(${r}, ${g}, ${b})`;
    colorClass[index].style.backgroundColor = color;
  }
};
botao2.addEventListener('click', coresAleatorias);
// LIMITE DE DIMENSAO DO QUADRO
const limiteQuadro = () => {
  if (idInput.value < 5 && idInput.value !== '') {
    idInput.value = '5';
  }
  if (idInput.value > 50) {
    idInput.value = '50';
  }
};
// REDIMENSIONA O QUADRO
const mudaTamanho = () => {
  const idDiv2 = document.getElementById(idQuadroPixel);
  const valorInput = idInput.value;
  const quadrado = valorInput ** 2;
  const divs = elementoDiv.repeat(quadrado);
  idDiv2.innerHTML = divs;
  addclassPixel();
  const templateColumns = `repeat(${valorInput}, 1fr)`;
  idDiv2.style.gridTemplateColumns = templateColumns;
  idDiv2.style.display = 'grid';
  idDiv2.style.width = fitContent;
  clickOnPixels();
  salvaTamanho();
  salvaLocalStorage();
};
const reDimensao = () => {
  limiteQuadro();
  const valorInput = idInput.value;
  if (valorInput === '') {
    alert('Board inválido!');
    return;
  }
  localStorage.removeItem('boardSize');
  localStorage.removeItem('pixelBoard');
  mudaTamanho();
};
idbotao3.addEventListener('click', reDimensao);
