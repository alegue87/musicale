
28.12.20
v0.1.1
    Aggiunto diesis e bemolle
    Inserito testo ( da testare a modo )

24.12.20
v0.1.00
    Prima release musicale.netsons.org

23.12.20
v0.0.12
    Estetica e istruzioni con Home page

22.12.20
v0.0.11
    Estetica

21.12.20
v0.0.10
    Sorted by order

20.12.20
v0.0.9
    Player e Composer
    Collegato db Directus per visualizzare le canzoni nel player

18.12.20
v0.0.8
    Aggiunte tie ( legature )

17.12.20
v0.0.7
    Aggiunte pause ( rest )

16.12.20
v0.0.6
    Aggiunto inserimento titolo e metrica.
    Inserimento note dopo tasto invio.
    Visualizzazione xml migliorata

15.12.20
v0.0.5
    Metrica ok: funziona correttamente per metriche con denominatore 4 ( 2/4 4/4 ecc.. )

14.12.20
v0.0.4
    Inserite misure multiple calcolate sul valore delle note.
    Bug non varia la metrica ( 4/4 ecc.. )

13.12.20
v0.0.3
    inserimento da input delle note in un sola misura
    Bug: al resize(?) il cursore sparisce ( o tolto la dbg window?)


12.12.20
v0.0.2
    iniziato editor

    Il cursore continua a fuzionare solo dopo una richiesta ajax..

10.12.20
v.0.0.1

    Idea: https://github.com/amypellegrini/react-musicxml

    con il caricamento remoto dell'xml il selettore funziona

    per far aggiungere la prima misura,  aggiungere:
    <direction placement="above">
    <direction-type>
        <metronome>
        <beat-unit>quarter</beat-unit>
        <per-minute>120</per-minute>
        </metronome>
    </direction-type>
    <sound tempo="120"/>
    </direction>

    replace:
    <direction placement="above">
                <sound tempo="120"/>
            </direction>-->

    Per rimuovere le linee da sopra le note:
    rimuovere <staff-details>

    Per far fuzionare il play() attendere che lo scheduler sia != undefined