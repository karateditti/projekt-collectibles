# Fractals on Blockchain
Projekt 6. Semester zu "Konzept zum Sammeln digitaler Güter mittels Blockchain-Technologie"

## Zielsetzung der README

Die Anleitung beschreibt das Kopieren des Projekts sowie das Starten der Anwendung auf einer lokalen Maschine. Wie in der Dokumentation (Wiki) beschrieben, wurden während des Projekts zwei Ansätze zur Generation von Zufallszahlen verfolgt.
Primär beschreibt diese README das Aufsetzen einer lokalen Instanz mit der Generation von pseudozufälligen Zahlen. Dennoch werden zusätzliche Informationen geliefert, zum Verwenden eines Oracles.

### Vorraussetzungen

Benötigt werden nodejs sowie der npm Paketmanager.
Download unter [nodejs.org](https://nodejs.org/en/)

```
git>=2.0.0
nodejs>=v8.10.0
npm>=3.50
```

## Verzeichnisstruktur
```
+-- Application
|   +-- app
|   +-- contracts
|   +-- migrations
|   +-- package.json
|   +-- package-lock.json
|   +-- truffle-config.js
+-- Realisierung mit Bridge (Contracts)
+-- Scripts
```
Allgemeine Struktur. `Application` beeinhaltet die Dapp (Frontend und Backend).
 `Realisierung mit Bridge (Contracts)` beinhaltet eine alternative Implementierung der Contracts mit der Verwendung eines Oracles.
`Scripts ` enthält Python Scripts zur Verwendung von L-Systemen zum zeichnen von Fraktalen (lediglich aus Testzwecken erstellt).
```
Application
```
Hauptverzeichnis des Projekts. [Truffle](https://www.trufflesuite.com/)  Back-End und Entwicklungsumgebung mit den Quellcodes der Smart Contracs sowie Migrationsskripts.
```
Application\app
```
Verzeichnis des Front-Ends der Platform. Basiert auf [Drizzle](https://github.com/trufflesuite/drizzle) und [Drizzle React](https://github.com/trufflesuite/drizzle-react).
```
Application\contracts
```
Beinhaltet die SmartContracts.

### Installation

Zunächst ist das Repository zu klonen.
```
$ git clone https://github.com/karateditti/projekt-collectibles
```
Mittels npm müssen die benötigten Paketabhängigkeit jeweils für das Front- und Back-End installiert werden.

```
~/projekt-collectibles/Application$ npm install 
~/projekt-collectibles/Application/app$ npm install 
```

Durch ausführen von `truffle version` im Verzeichnis kann die erfolgreiche Installation überprüft werden:

```
~/projekt-collectibles/Application$ truffle version
Truffle v5.0.19 (core: 5.0.19)
Solidity v0.5.0 (solc-js)
Node v8.10.0
Web3.js v1.0.0-beta.37
```

## Starten der Anwendung
### Frontend
Das Frontend kann über `npm start` gestartet werden.
```
~/projekt-collectibles/Application/app$ npm start
```
### Backend
#### Blockchain (Ganache)
Um die Smart Contracts zur Verfügung zu stellen, wird eine Blockchain benötigt.
Lokal kann diese über [Ganache](https://www.trufflesuite.com/ganache) erzeugt werden.

Eine Anleitung zur Installation von Ganache ist hier zu finden: [Ganache Installation](https://www.trufflesuite.com/docs/ganache/quickstart).

Empfohlene Einstellungen in Ganache: 

**Server:**
![Server](https://github.com/karateditti/projekt-collectibles/blob/master/imgWiki/ganache_screenshot1.PNG)
**Accounts & Keys:**
![AccountsKeys](https://github.com/karateditti/projekt-collectibles/blob/master/imgWiki/ganache_screenshot2.PNG)
**Chain:**
![Chain](https://github.com/karateditti/projekt-collectibles/blob/master/imgWiki/ganache_screenshot3.PNG)

### Smart Contracts
Wenn die Blockchain aufgesetzt wurde, können die Smart Contracts mit den Befehlen `truffle compile` und `truffle migrate` kompiliert und migriert werden.
```
~/projekt-collectibles/Application$ truffle compile
~/projekt-collectibles/Application$ truffle migrate
```

Bei erfolgreichem durchführen wird in der Konsole folgendes angezeigt:

**compile:**
```
> Compiled successfully using:
   - solc: 0.5.10+commit.5a6ea5b1.Emscripten.clang
```

**migrate:**
```
Summary
=======
> Total deployments:   2
> Final cost:          0.07680498 ETH
```
Die Dapp ist nun verwendbar unter: http://localhost:3000/

### Backend mit Oracle
Im Folgenden wird beschrieben, wie die Generierung von Zufallszahlen mittels eines Oracles genutzt werden kann.

Zuallerest müssen die Contracts in `/projekt-collectibles/Application/contracts` mit den Contracts aus `/projekt-collectibles/Realisierung mit Bridge (Contracts)` ersetzt werden.


#### Ethereum-Bridge
Um auf einer lokalen Blockchain Oraclefunktionen verwenden zu können, ist die sog. [Ethereum-Bridge](https://github.com/provable-things/ethereum-bridge) notwendig.
Über `npm install` wurde diese bereits installiert.
Ganache muss bereits laufen, um die Bridge zu starten.

Gestartet wird die Bridge in der Konsole wie folgt:

```
~/projekt-collectibles/Application/node_modules/ethereum-bridge$ ethereum-bridge -H localhost:7545 -a 9
```

-a 9 bedeutet, dass der Account mit Index 9 (10. Account) als Bridge verwendet wird.

Wenn die Bridge erfolgreich gestartet wurde, zeigt die Konsole folgendes:

![Bridge](https://github.com/karateditti/projekt-collectibles/blob/master/imgWiki/bridge_screenshot.PNG)

Die Zeile `OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);` muss nun in den Konstruktor des SmartContracts `RandomNumber.sol `

#### Random.org API

Unter https://api.random.org/dashboard muss ein API-Key beantragt werden, um die Schnittstelle von Random.org zu verwenden.

anschließend muss der generierte Key in `RandomNumber.sol` in der update-Methode eingetragen werden.
```
function update() public payable{
            emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        bytes32 res =oraclize_query(
            "URL",
            "json(https://api.random.org/json-rpc/2/invoke).result.random.data.0",
            '\n{"jsonrpc":"2.0","method":"generateIntegers","params":{"apiKey":"HIER KEY EINFÜGEN!","n":1,"min":1,"max":1000,"replacement":true,"base":10},"id":2994}');
    }
```

Nun wie davor:

```
~/projekt-collectibles/Application$ truffle compile
~/projekt-collectibles/Application$ truffle migrate
```

Bei erfolgreichem durchführen wird in der Konsole folgendes angezeigt:
**compile:**
```
> Compiled successfully using:
   - solc: 0.5.10+commit.5a6ea5b1.Emscripten.clang
```

**migrate:**
```
Summary
=======
> Total deployments:   2
> Final cost:          0.07680498 ETH
```
Die Dapp ist nun verwendbar unter: http://localhost:3000/

## Verwendete Tools und Frameworks
* Node.js 
* Truffle Suite (Truffle, Ganache, Drizzle)
* React
* ethereum-bridge
