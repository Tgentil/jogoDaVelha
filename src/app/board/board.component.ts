import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  quadrados: any[];  // um array que representa os quadrados do jogo
  xIsNext: boolean;  // uma variável que controla se é a vez do jogador 'X' ou 'O'
  vencedor: string;  // uma variável que armazena o vencedor do jogo

  constructor() {
  }

  ngOnInit() {
      this.novoJogo();  // inicia um novo jogo
  }

  novoJogo() {
    this.quadrados = Array(9).fill(null);  // cria um array com 9 elementos e inicializa com null
    this.vencedor = null;  // reinicia o vencedor do jogo
    this.xIsNext = true;   // inicia a vez do jogador 'X'
  }

  get jogador() {
    return this.xIsNext ? 'X' : 'O';  // retorna o jogador atual
  }

  jogada(idx: number) {

    if (this.vencedor !== null) {
      return; // retorna imediatamente se o jogo já acabou
    }

    if (!this.quadrados[idx] ) {
      this.quadrados.splice(idx, 1, this.jogador);  // atualiza o quadrado clicado com a jogada do jogador atual
      this.xIsNext = !this.xIsNext;  // muda a vez do jogador
    }

    this.vencedor = this.calcularVencedor();  // verifica se houve um vencedor após a jogada
  }

  calcularVencedor() {
    const linhas = [
      [0, 1, 2], // linha de cima
      [3, 4, 5], // linha do meio
      [5, 7, 8], // linha de baixo
      [0, 3, 6], // coluna da esquerda
      [1, 4, 7], // coluna do meio
      [2, 5, 8], // coluna da direita
      [0, 4, 8], // diagonal da esquerda
      [2, 4, 6] // diagonal da direita
    ];

    // verifica se alguma das linhas, colunas ou diagonais tem todas as jogadas iguais
    for (let i = 0; i < linhas.length; i++) {
      const [a, b, c] = linhas[i];
      if (
        this.quadrados [a] &&
        this.quadrados [a] === this.quadrados[b] &&
        this.quadrados[a] === this.quadrados[c]
      ) {
        return this.quadrados[a];  // retorna o vencedor
      }
    }

    return null;  // não houve vencedor ainda
  }
}
