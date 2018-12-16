/**
 * Code made by github.com/SavjeeTutorials
 */

import * as sha256 from 'crypto-js/sha256'

export class Block {

    public hash: string;

    constructor(public index: number, public timestamp: string, public data: any, public previousHash: string = '') {
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(this.index.toString() + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

export class Blockchain {

    public chain: Block[];

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(): Block {
        return new Block(0, "01/01/2017", "Genesis Block", "0");
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newblock: Block): void {
        newblock.previousHash = this.getLatestBlock().hash;
        newblock.hash = newblock.calculateHash();
        this.chain.push(newblock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];
    
          if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
          }
    
          if (currentBlock.previousHash !== previousBlock.calculateHash()) {
            return false;
          }
        }
    
        return true;
      }
}