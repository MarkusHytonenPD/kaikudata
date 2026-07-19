# Kaikudata

Interaktiivinen syvyyskartta kaikuluotaimen GPX-datalle. Suunniteltu käytettäväksi
puhelimen selaimella veneillessä. Täysin staattinen – ei palvelinta, ei build-vaihetta.

👉 **Sovellus:** https://markushytonenpd.github.io/kaikudata/

## Ominaisuudet

- Lataa yksi tai useita **GPX-tiedostoja** (Raymarine Dragonfly). Uudet lisätään vanhojen päälle.
- Syvyyspisteet **värillisinä ympyröinä** (vihreä = matala → violetti = syvä), piirretään
  canvakselle joten toimii sujuvasti myös 50 000+ pisteellä.
- **Syvyyden tekstimerkinnät** valikoiden ruudukon paikallisista ääripisteistä.
- **Waypointit** kalasymbolina 🐟, popup nimellä ja syvyydellä.
- **Oma sijainti ja kulkusuunta** (GPS-bearing, ei kompassia).
- **Heading-up**: kartta pyörii kulkusuunta ylöspäin; 🔒 lukitsee pohjoiseen.
- **Zoom-lukitus** estää vahingossa tapahtuvan pinch-zoomin.
- **Taustakartta:** MML Maastokartta (WMTS).
- **Offline:** service worker välimuistittaa sovelluksen ja karttaruudut.

## Käyttö

1. Avaa sovellus selaimessa.
2. **📁 Lataa GPX** ja valitse tiedostot.
3. **📍 Hae sijainti** näyttää oman paikan ja suunnan (vaatii paikannusluvan; iOS pyytää
   myös liikeanturin luvan).

## Tekniikka

Pelkkä HTML + CSS + JavaScript yhdessä tiedostossa (`index.html`), karttakirjastona
[Leaflet](https://leafletjs.com/) CDN:stä. Data pysyy selaimessa, mitään ei lähetetä.

## Julkaisu (GitHub Pages)

Settings → Pages → Source: `main` branch, hakemisto `/ (root)`.
Sovellus toimii osoitteessa `https://<käyttäjä>.github.io/kaikudata/`.
