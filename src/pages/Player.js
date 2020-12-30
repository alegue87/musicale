import React from 'react'
import { Container, List, Loader, Button, Input, Panel, Icon, Tag} from 'rsuite'

import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";



export default class Player extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            loading:true,
            songList: [],
            songId: 0, 
            bpm:80
        }

        const appendScript = (scriptToAppend) => {
            const script = document.createElement("script");
            script.src = scriptToAppend;
            script.async = false;
            document.body.appendChild(script);
          }
          appendScript("https://cdn.jsdelivr.net/npm/osmd-audio-player/umd/OsmdAudioPlayer.min.js")
          

        
    }
    componentDidMount(){
        setTimeout(() => {
            (async () => {
                window.osmd = new OpenSheetMusicDisplay(document.getElementById("score"));
                window.audioPlayer = new window.OsmdAudioPlayer();

                window.api.getItems("song", { sort: 'order' })
                .then( result => {
                    this.setState({loading:false, songList: result.data})
                    console.log(result)
                    this.loadAndRender(result.data[0].xml)
                })
                .catch( error => {
                    console.log(error)
                })

            })();
        },1000)  
    }

    async loadAndRender(xml){

        await window.osmd.load(xml)
        await window.osmd.render();
        await window.audioPlayer.loadScore(window.osmd);
        window.audioPlayer.on('iteration', notes => {
            console.log(notes);
        });
    }

    setSong(id, xml){
        window.audioPlayer.stop() // evita sfasamento
        this.setState({songId: id})
        this.loadAndRender(xml)
    }
    

    render(){
        const { loading, songList, bpm } = this.state

        return(
            <Container style={{display:'flex', flexDirection:'row'}}>
                <Panel header="Melodie" shaded style={{flex:'0.2'}}>
                    { loading ? <Loader 
                        style={{margin:'10px'}}
                        size='sm' content='Caricamento melodie..'></Loader>
                        :
                        <List style={{height:'80vh'}} hover>
                            { songList.map( (song, i) => {
                                return <List.Item
                                    style={{textAlign:"left", padding:"10px", cursor:'pointer'}}
                                    onClick={ () => this.setSong(song.id, song.xml) }
                                    ><div>
                                        {song.title}
                                    </div>
                                    <div style={{minHeight:'20px'}}>
                                        <Tag color='green' style={{float:"right", fontSize:'11px'}}>
                                            {song.tags[0]}</Tag>
                                    </div>
                                </List.Item>
                            })}
                        </List>
                    }
                </Panel>
                <Panel shaded header={'Player'} style={{flex:'0.8'}}>
                    <div id="score"/>            
                    { loading ? <Loader 
                        style={{margin:'10px'}}></Loader> :
                        <Container 
                            className={"buttonbar"} 
                            style={{width:"350px", height:"50px", display:"flex", flexDirection:"row"}}>
                            <Button onClick={()=>window.audioPlayer.play()}><Icon icon='play'/></Button>
                            <Button onClick={()=>window.audioPlayer.stop()}><Icon icon='stop'/></Button>
                            <Button onClick={()=>window.audioPlayer.pause()}><Icon icon='pause'/></Button>
                            <Input
                                onChange={ (value) => window.audioPlayer.setBpm(value) }
                                defaultValue={`${bpm}`} style={{width:"60px"}}/>
                                <div 
                                style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    Bpm</div> 
                        </Container>
                    }
                </Panel>
            </Container>
          )
    }
}


