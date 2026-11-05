# Projekt Stroški

## O projektu
Aplikacija za beleženje osebnih stroškov. Omogoča dodajanje, pregledovanje, urejanje in brisanje stroškov. Vključuje iskanje po imenu, filtriranje po kategorijah ter razvrščanje po imenu, znesku, kategoriji in datumu.

## Uporabljene tehnologije
**Frontend:**
- React (verzija 18)
- React Router DOM (verzija 6)
- Axios
- CSS

**Backend:**
- Java 17
- Spring Boot (verzija 3)
- Spring Data JPA
- PostgreSQL (verzija 18)
- Maven

## Struktura projekta
- `frontend/`: React aplikacija (komponente, servisi za API, stili).
- `backend/`: Spring Boot aplikacija (kontrolerji, modeli, repozitoriji, konfiguracija).

## Navodila za namestitev in zagon

### Predpogoji
- Nameščena Java (JDK 17+)
- Nameščen Node.js in npm
- Nameščen PostgreSQL

### Zagon baze podatkov
1. Zaženite PostgreSQL.
2. Ustvarite bazo z ukazom: `CREATE DATABASE stroski_db;`

### Zagon backenda
1. Odprite ukazno vrstico in pojdite v mapo backend: `cd backend`
2. Zaženite aplikacijo: `./mvnw spring-boot:run`
3. Backend bo dostopen na `http://localhost:8080`.

### Zagon frontenda
1. Odprite novo ukazno vrstico in pojdite v mapo frontend: `cd frontend`
2. Namestite odvisnosti: `npm install`
3. Zaženite aplikacijo: `npm start`
4. Frontend bo dostopen na `http://localhost:3000`.

## Navodila za razvijalce
- Projekt uporablja Git za verzioniranje. Glavna veja je `main`.
- Za novo funkcionalnost ustvarite novo vejo (npr. `feature/ime-funkcionalnosti`).
- Pred združitvijo v `main` preverite, da se koda uspešno zažene.

## Standardi kodiranja
- **Frontend:** Uporaba funkcijskih komponent in React Hooks. Zamik 2 presledka. Uporaba `const` in `let`.
- **Backend:** Sledenje Java konvencijam poimenovanja (PascalCase za razrede, camelCase za metode). Zamik 4 presledki. Uporaba Javadoc komentarjev za javne metode.
