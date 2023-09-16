# SmartTesting JS

## Wymagania

W celu uruchomienia projektu należy mieć zainstalowane:

- [`node`](https://nodejs.org/en/download/) (v 18+)
- [`nvm`](https://github.com/nvm-sh/nvm#install--update-script)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Jeśli używasz procesora M1/M2 (apple silicon):
- **nie wszystkie zależności w ekosystemie JS zostały sportowane na apple silicon** (np. `puppeteer` wykorzystywany w module dot. testów End-to-End) i oficjalne rozwiązania tego problemu mogą nie być dostępne. W niektórych przypadkach mogą być potrzebne workarounds specyficzne dla danego systemu operacyjnego (np. [instalowanie chromium binary](https://github.com/puppeteer/puppeteer/issues/7740)).

## Setup

Każda lekcja ma swój dedykowany folder (np. `01-introduction-to-testing`), te z kolei mają swoje dedykowane pliki  `README.md` (z dodatkowym opisem dla każdej lekcji) oraz `package.json`. Standardowo, należy uruchomić:

- `npm i` aby zainstalowć zależności
- `npm t` aby uruchomić testy

W niektórych modułach można dodatkowo uruchomić testy w trybie _watch_ przy użyciu pakietu `chokidar`:

- `npm run test:watch`

## Uwagi do uczestników

Kod produkcyjny nie jest kodem referencyjnym. Koncentrujemy się na testowaniu, zaś kod produkcyjny jest jedynie poglądowy.
