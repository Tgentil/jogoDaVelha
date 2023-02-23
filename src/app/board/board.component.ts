import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  quadrados: any[];
  xIsNext: boolean;
  vencedor: string;

  constructor() {
  }

  ngOnInit() {
      this.novoJogo();
  }

  novoJogo() {
    this.quadrados = Array(9).fill(null);
    this.vencedor = null;
    this.xIsNext = true;
  }

  get jogador() {
    return this.xIsNext ? 'X' : 'O';
  }

  jogada(idx: number) {

    if (this.vencedor !== null) {
      return; // Jogo acabou
    }

    if (!this.quadrados[idx] ) {
      this.quadrados.splice(idx, 1, this.jogador);
      this.xIsNext = !this.xIsNext;
    }

    this.vencedor = this.calcularVencedor();
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
    for (let i = 0; i < linhas.length; i++) {
      const [a, b, c] = linhas[i];
      if (
        this.quadrados [a] &&
        this.quadrados [a] === this.quadrados[b] &&
        this.quadrados[a] === this.quadrados[c]
      ) {
        return this.quadrados[a];
      }
    }
    return null;
  }
}
