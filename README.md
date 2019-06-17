# projekt-collectibles
Projekt 6. Semester zu "Konzept zum Sammeln digitaler Güter mittels Blockchain-Technologie"

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Vorraussetzungen

Benötigt werden nodejs sowie der npm Paketmanager.

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


## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With


## Authors


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
