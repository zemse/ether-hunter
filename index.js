const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const ethers = require('ethers');
const fs = require('fs');

let result = 0;
const alreadyChecked = {};

const doIt = () => {
  let intervalId;
  try {
    for(let i ) {
      async () => {
      const mnemonic = bip39.generateMnemonic(128);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const hdWallet = hdkey.fromMasterSeed(seed);
      const privateKey = hdWallet.derivePath("m/44'/60'/0'/0/0")._hdkey._privateKey;
      const wallet = new ethers.Wallet(privateKey);
      const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/d64e4d75857d4bbe8e196ca93328c4b7');
      const balance = (await provider.getBalance(wallet.address)).toNumber();

      console.log(wallet.address, balance, alreadyChecked[Number(wallet.address)] ? true:false );
      //console.log(`No of Results: ${result}`)

      //console.log('0x689C56AEf474Df92D44A1B70850f808488F9769C', (await provider.getBalance(ethers.utils.bigNumberify('0x689C56AEf474Df92D44A1B70850f808488F9769C'))).toNumber());

      alreadyChecked[Number(wallet.address)] = true;

      if(balance) {
        fs.appendFile('result.txt', `${mnemonic}\n${balance}\n\n`, function (err) {
          result++;
          if (err) throw err;
          console.log('Saved!');
        });

      }


  } catch (e) {

  }

}
