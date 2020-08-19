# add-doom-fire
## adicione doom fire ao seu projeto react.js (ou outro framework) ou js puro

### JS Puro:

*Download do arquivo fire.js e remova a linha `module.exports = Fire`*

#### Adicione o script no arquivo html:

```html
    <body>
        <canvas width="300" height="300"></canvas>
        <script src="./fire.js"></script>

        <script>
            const canvas = document.querySelector("canvas"); //Tag canvas
            const context = canvas.getContext("2d"); //Contexto 2d do canvas

            const fireWidth = canvas.width; //largura do canvas
            const fireHeight = canvas.height; //altura do canvas
            const proportionalValue = 5; //Tamanaho do quadro que o fogo vai renderizar (padrão 5 ou 10)
            const backgroundIntensity = 0; //Fundo do canvas, cores disponíves: { 0, 1, 2... 36 }

            fire = new Fire(context, fireWidth, fireHeight, proportionalValue, backgroundIntensity);
            fire.Start(); 
        </script>
    </body>
```

### Exemplo com React.js:

#### Adicione o `add-doom-react`

```
    yarn add add-doom-fire
```

#### Or

```
    npm install add-doom-fire
```

#### Importe o `useRef` do react e o `add-doom-fire` 

```js
    import React, { useRef } from 'react';
    import Fire from "add-doom-fire";
```

#### Crie um userRef

```js
    const canvasHTMLElement = useRef();
    let fire;
```

#### Retorne um HTML com uma tag canvas
Passe o atributo ref na tag canvas e adicione dois botões com uma função de click

```tsx
    return (
        <div className="App">
            <canvas ref={canvasHTMLElement} width="300" height="300"></canvas>
            <button onClick={createFire}>Start Fire</button>
            <button onClick={stopFire}>Stop Fire</button>
        </div>
  );
```

#### Manipule o objeto pra criar o fogo ao clicar no botão

```js
  function createFire() {
    const canvas = canvasHTMLElement.current; //Tag canvas
    const context = canvas.getContext("2d"); //Contexto 2d do canvas

    const fireWidth = canvas.width; //largura do canvas
    const fireHeight = canvas.height; //altura do canvas
    const proportionalValue = 5; //Tamanaho do quadro que o fogo vai renderizar (padrão 5 ou 10)
    const backgroundIntensity = 0; //Fundo do canvas, cores disponíves: { 0, 1, 2... 36 }
    
    fire = new Fire(context, fireWidth, fireHeight, proportionalValue, backgroundIntensity);
    fire.Start(); //Inicia o fogo do DOOM
  }

  function stopFire() {
    fire.Stop() // Para o fogo do doom
  }
```

> Image by FilipeDeschamps
<img src="https://github.com/filipedeschamps/doom-fire-algorithm/raw/master/doom-fire.gif?raw=true" width="300px" height="300px">