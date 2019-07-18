# projekt-collectibles
Projekt 6. Semester zu "Konzept zum Sammeln digitaler Güter mittels Blockchain-Technologie"

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Vorraussetzungen

Benötigt werden nodejs sowie der npm Paketmanager.
Download unter [nodejs.org](https://nodejs.org/en/)

```
nodejs>=v8.10.0
npm>=3.50
```

## Verzeichnisstruktur

```
Application
```
Hauptverzeichnis des Projekts. [Truffle](https://www.trufflesuite.com/)  Back-End und Entwicklungsumgebung mit den Quellcodes der Smart Contracs sowie Migrationsskripts.
```
Application\app
```
Verzeichnis des Front-Ends der Platform. Basiert auf [Drizzle](https://github.com/trufflesuite/drizzle) und [Drizzle React](https://github.com/trufflesuite/drizzle-react).


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

## Deployment
### Frontend
Das Frontend kann über `npm start` gestartet werden.
```
~/projekt-collectibles/Application$ npm start
```
###Backend/Smart Contracts

Um die Smart Contracts zu deployen, wird entsprechend eine Blockchain benötigt.
Lokal kann diese über [Ganache](https://www.trufflesuite.com/ganache) erzeugt werden.

Eine Anleitung zur Installation von Ganache ist hier zu finden: [Ganache Installation](https://www.trufflesuite.com/docs/ganache/quickstart).

Empfohlene Einstellungen in Ganache: 

**Server:**
![Server](https://github.com/karateditti/projekt-collectibles/blob/master/imgWiki/ganache_screenshot1.PNG)
**Accounts & Keys:**
![AccountsKeys](https://github.com/karateditti/projekt-collectibles/blob/master/imgWiki/ganache_screenshot2.PNG)
**Chain:**
![Chain](https://github.com/karateditti/projekt-collectibles/blob/master/imgWiki/ganache_screenshot3.PNG)

## Built With


## Authors


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
