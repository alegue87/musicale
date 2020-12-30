import { Link } from "react-router-dom";
import { Container, Divider, List, Panel, Popover, Whisper } from "rsuite";

export default function Home(){
    return(
        <Container>
            <Panel shaded>
                {/*<h1>Musicale</h1>*/}
                <Whisper 
                    placement='top' 
                    trigger='hover'
                    speaker={<Popover title='Auguri 😊!'></Popover>}>

                    <img src='https://musicale.netsons.org/musicale.png'></img>
                </Whisper>
                <p>
                    è un Editor / Player di spartiti musicali in formato MusicXML.
                </p>
                <br></br>
                
                <Container style={{flexDirection:'row'}}>

                    <span style={{flex:'0.2'}}/>
                    <span style={{flex:'0.6', textAlign:"left"}}>
                        <p><Link to='/'>Musicale</Link> è composto da due parti:</p>
                        <p>
                        Il <Link to='/composer'>Composer</Link> semplice da usare: basta inserire il titolo,
                         la metrica dello spartito e le note negli appositi spazi facendo seguire ogni volta 
                        un invio (⏎) cosi da inserire i dati nello spartito a fianco.
                        Man mano che vengono inserite le note viene anche creato il file MusicXML visualizzato
                        al di sotto dello spartito.
                        </p>
                        <p>
                            Il <Link to='/player'>Player</Link> è ancora più semplice: basta selezionare 
                            la melodia e premere play per ascoltarla. Le melodie nella lista sono state 
                            create sempre con il <Link to='/composer'>Composer</Link>.
                        </p>
                        <br/>
                        <Divider><h3>Il composer</h3></Divider>
                        <p>
                        Dopo aver inserito il titolo ed eventualmente la metrica, le note vengono
                        inserite nello spartito attraverso del semplice testo.
                        Ad esempio se viene scritto <b>G 4 half</b>, viene inserito un SOL della 4a
                        ottava di durata "half" (metà - minima).
                        <br/>
                        In dettaglio:
                        </p>
                        <Divider>G 4 half</Divider>
                        <List bordered>
                            <List.Item><b>g</b> = SOL</List.Item>
                            <List.Item><b>4</b> = 4a ottava</List.Item>
                            <List.Item><b>half</b> = metà - minima</List.Item>
                        </List>
                        <br/>
                        <p>
                        Per un LA della solita ottava (4a) di durata 1/4 ( semiminima ), il testo sarà <b>A 4 quarter</b>,
                        seguito sempre da un invio.
                        <br/>
                        In dettaglio:
                        </p>                        
                        <Divider>A 4 quarter</Divider>
                        <List bordered>
                            <List.Item><b>a</b> = LA</List.Item>
                            <List.Item><b>4</b> = 4a ottava</List.Item>
                            <List.Item><b>quarter</b> = 1/8 - seminima</List.Item>
                        </List>
                        <br/>
                        <p>
                            L'inserimento è <b>case insensitive</b> quindi si può inserire utilizzando sia le maiuscole che le minuscole.
                            Per chiarezza prima ho utilizzato le note della notazione inglese in maiuscolo ma possono anche
                            essere inserte in minuscolo ( G=g, A=a ecc..)
                        </p>
                        <p>
                            Nelle istruzioni riportate nel <Link to='/composer'>Composer</Link> c'è tutta la lista di possibili
                            elementi combinabili e alcuni comandi per cancellare le note.
                        </p>
                        <p>
                            Al momento non è possibile editare le parti scritte ma solo ascoltarle e 
                            cancellarle.
                        </p>
                        <br/>
                        <h4>Le code ( beam ) </h4>
                        <p>
                            Le code hanno un inizio ( begin ), continuo ( continue ) e fine ( end ), queste
                            sono inseribili dopo la <u>durata</u> (half, quarter ecc.. ) della nota.
                        </p>
                        <Divider>beam( b-c-e )</Divider>
                        <List bordered>
                            <List.Item><b>beamb</b> - beam begin</List.Item>
                            <List.Item><b>beamc</b> - beam continue</List.Item>
                            <List.Item><b>beame</b> - beam end</List.Item>
                        </List>
                        
                        <br/>
                        <h4>Le legature ( tie )</h4>
                        <p>
                            Le legature hanno invece un inizio ( begin ) e fine ( end ), anche queste
                            sono inseribili dopo la <u>durata</u> (whole, half, quarter ecc.. ) della nota.
                            
                        </p>
                        <Divider>tie( b-e )</Divider>
                        <List bordered>
                            <List.Item><b>tieb</b> - tie begin</List.Item>
                            <List.Item><b>tiee</b> - tie end</List.Item>
                        </List>
                        <br/>
                        
                        <h4>Il punto ( dot )</h4>
                        <p>
                            Il punto, utile per aumentare la durata di mezzo valore è inseribile tramite
                            la parola <b>dot</b>, che va sempre dopo la durata della nota.
                        </p>
                        
                        <br/>
                        <h4>Le alterazioni</h4>
                        <p>
                            Come alterazioni c'è il bemolle - <b>bem</b> ed il diesis - <b>die</b> .
                            Non sono supportate le altezioni su le linee.. ( al momento ) dato che il display musicale
                            non le visualizza anche se nel linguaggio ci sono.
                        </p>
                        <Divider>alterations ( bem - die )</Divider>
                        <List bordered>
                            <List.Item><b>bem</b> - bemolle</List.Item>
                            <List.Item><b>die</b> - diesis</List.Item>
                        </List>
                    </span>

                    <span style={{flex:'0.2'}}/>
                </Container>
            </Panel>
        </Container>
    )
}