window.alert('Snake game: Utilize as setas direcionais. Se bater ou voltar, a cobra volta ao tamanho inicial.')

window.onload = function(){//Só libera o jogo após tudo estar carregado

    var stage = document.getElementById('stage');//Busca o elemento tela de jogo
    var ctx = stage.getContext("2d");//Contexto: Onde será criada a parte visual do jogo 
    document.addEventListener("keydown", keyPush);//Executa uma função ao clicar nas setas
    setInterval(game, 120);
    //Define um intervalo para uma função ser chamada (velocidade da cobra)

    const vel = 1; //Quantas casas a cobra vai andar a cada atualização
    
    //Há a possibilidade de aumentar o tabuleiro passando a devida proporção para as variáveis tp e qp que definem a área de jogo

    var vx = vy = 0;//Definição inicial da velocidade
    var px = 10;//Ponto inicial coordenada x
    var py = 15;//Ponto inicial coordenada y
    var tp = 20;//Tamanho da peça do tabuleiro
    var qp = 20;//Quantidade de peças do tabuleiro
    var ax = ay = 15;//Posição inicial da maçã

    var trail = [];//elementos do rastro da cobra
    tail = 5;/*Tamanho da cauda*/

    function game(){ //Cada vez que passar por essa função, deve atualizar a posição da cabeça da cobra.
        px += vx;
        py += vy;

    //Definir o limite das bordas
 
        //Esquerda
        if (px < 0){
            px = qp-1;
        }
        //Direita
        if (px > qp-1){
            px = 0;
        }
        //Baixo
        if (py < 0){
            py = qp-1;
        }
        //Cima
        if (py > qp-1){
            py = 0;
        }
    
    ctx.fillStyle = 'black';/*estilo de preenchimento do stage*/
    ctx.fillRect(0, 0, stage.width, stage.height);
    //pinta o stage do ponto 0,0 até o final da largura e altura
    
    ctx.fillStyle = "red";/*estilo de preenchimento da maçã*/
    ctx.fillRect(ax*tp, ay*tp, tp, tp);
    //Posição inicial(x) X tamanho da peça, Posição inicial(y) X tamanho da peça
    //tp, tp = pinta o tamanho da peça para cima e para baixo

    ctx.fillStyle = "green";/*estilo de preenchimento da cobra*/
    for(var i=0; i<trail.length; i++){
        ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1, tp-1);//pintando os elementos do rastro da cobra nas coordenadas x e y
        //tp-1 pinta apenas 19 de 20, permitindo visualizar a quantidade de peças da cauda
            if(trail[i].x == px && trail[i].y == py){
                vx = xy = 0;
                tail = 5;
            }//Se a cabeça bater no rabo: reseta o tamanho
     }
     
    trail.push({x:px,y:py })//Desenha o rastro da cobra
    while (trail.length > tail){
        trail.shift();
    }
    if (ax==px && ay==py){//aumenta a cauda ao passar pela maçã
        tail++;
        
        //define um novo local aleatório para a maçã
        ax = Math.floor(Math.random()*qp);
        ay = Math.floor(Math.random()*qp);
    }


}/*Controles para mover a cobra*/
    function keyPush(event){

        switch (event.keyCode){
            case 37:/*left*/
            vx = -vel;
            vy = 0;
            break;
            case 38:/*up*/
            vx = 0;
            vy = -vel;
            break;
            case 39:/*right*/
            vx = vel;
            vy = 0;
            break;
            case 40:/*down*/
            vx = 0;
            vy = vel;
            default:

            break;

        }
    }
}