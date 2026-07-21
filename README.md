# Kaikudata

Interaktiivinen syvyyskartta kaikuluotaimen GPX-datalle. Suunniteltu käytettäväksi
puhelimen selaimella veneillessä. Täysin staattinen – ei palvelinta, ei build-vaihetta.

👉 **Sovellus:** https://markushytonenpd.github.io/kaikudata/

## Ominaisuudet

- **Valmis pohjadata:** sovellukseen on paketoitu kaikuluotausdataa (`sample/`), joka
  latautuu automaattisesti tuoreella laitteella – näkyy siis heti kaikilla laitteilla.
- Lataa lisää yksi tai useita **GPX-tiedostoja** (Raymarine Dragonfly). Uudet lisätään vanhojen päälle.
- **Interpoloitu syvyyspinta** (🌊): väritetty pinta piirretään vain sinne, mistä on dataa.
  Yksittäinen luotauslinja saa n. 15 m leveyden; kahden linjan väli täytetään vain jos ne
  ovat alle 50 m etäisyydellä toisistaan. Näkymänapista voi vaihtaa: pinta → pinta+pisteet → pisteet.
- **Jatkuva väriliukuma** hienojakoiseen syvyyden erotteluun: matala = lämmin (varoittava),
  syvä = viileä (turvallinen), ≥ 20 m valkoinen. Sävyn sisällä tummasta vaaleaan ennen sävynvaihtoa.
  Legenda pystysuorana gradienttipalkkina.
- Syvyyspisteet **värillisinä ympyröinä** piirretään canvakselle, joten toimii sujuvasti myös
  50 000+ pisteellä.
- **Syvyyden tekstimerkinnät** valikoiden ruudukon paikallisista ääripisteistä.
- **Omat merkit** 📍: napauta kartalle, raahaa paikalleen, anna nimi ja syvyys. **Mittaustyökalu** 📏
  juoksevalla matkalla.
- **Waypointit** kalasymbolina 🐟, popup nimellä ja syvyydellä.
- **Data laitteesta toiseen** (📋-paneeli): *Vie data* pakkaa kaiken (ladatut tiedostot + omat merkit)
  yhteen JSON-tiedostoon, jonka toisella laitteella avaa *Tuo data* -napilla. *Vie GPX* vie omat
  merkit Raymarine-yhteensopivana GPX:nä.
- **Oma sijainti ja kulkusuunta** (GPS-bearing, ei kompassia).
- **Heading-up**: kartta pyörii kulkusuunta ylöspäin; 🔒 lukitsee pohjoiseen.
- **Zoom-lukitus** estää vahingossa tapahtuvan pinch-zoomin.
- **Taustakartta:** MML Maastokartta (WMTS).
- **Offline:** service worker välimuistittaa sovelluksen, pohjadatan ja karttaruudut.
- **Pysyvyys:** ladattu data ja omat merkit säilyvät selaimessa (IndexedDB) uudelleenlatauksen yli.

## Käyttö

1. Avaa sovellus selaimessa – pohjadata näkyy heti.
2. **📁 Lataa** lisää GPX-tiedostoja tarvittaessa.
3. **📋** avaa paneelin: ladatut tiedostot, datan vienti/tuonti ja tyhjennys.
4. **📍 Hae sijainti** näyttää oman paikan ja suunnan (vaatii paikannusluvan; iOS pyytää
   myös liikeanturin luvan).
5. Datan siirto toiselle laitteelle: **⬆️ Vie data** → siirrä tiedosto → **⬇️ Tuo data** toisella laitteella.

## Tekniikka

Pelkkä HTML + CSS + JavaScript yhdessä tiedostossa (`index.html`), karttakirjastona
[Leaflet](https://leafletjs.com/) CDN:stä. Data pysyy selaimessa, mitään ei lähetetä.

## Julkaisu (GitHub Pages)

Settings → Pages → Source: `main` branch, hakemisto `/ (root)`.
Sovellus toimii osoitteessa `https://<käyttäjä>.github.io/kaikudata/`.
