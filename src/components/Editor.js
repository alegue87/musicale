
import React from 'react'
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import axios from "axios";
import ReactDomServer, { renderToStaticMarkup } from 'react-dom/server'

import { 
  Button, Container, Input, Loader, Panel, Icon, Divider, List, Notification } from 'rsuite'
//import { TestSheet } from './TestSheet'
import Sheet from './Sheet'
import { Measure } from './measure/Measure';
import { Attributes, Time, Clef } from './measure/Attributes'
import { Note, Beam, Tie, calcDuration } from './measure/Note'
import XMLViewer from 'react-xml-viewer'
import _ from 'lodash'


export default class Editor extends React.Component {
    constructor(props){
      super(props)

      const beats    = 2,
            beatType = 4

      this.state = {
          ready:false,
          xml:"",
          title: "",
          sheet: <Sheet title="empty">
            <Measure 
              number={1}
              attributes={<Attributes
                divisions={960} /* semiminima 1/4 = 960 )*/
                time={<Time beats={beats} beatType={beatType}/>} /* 2 da 1/4 */
                clef={<Clef sign={'G'} line={2}/>}/> }
              />
            </Sheet>,

          noteList: [],
          divisions: 960, // valore di una semiminima (1/4) 
          measureList: [],
          currentAction: "",
          beamNumber: 1,
          metric: { beats: beats, beatType: beatType},
          alterations: [],  // alterazioni bemolle / diesis
          textList: []      // Testo sopra le note
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

          // per far funzionare il cursore.. 
          //const scoreXml = await axios.get("http://localhost/note/assets/jnsadsljwk088os8")
          
          this.loadAndRender()
          
          setTimeout(() => {
            if(window.audioPlayer.scheduler === undefined ){
              this.setState({ready:false})
            }
            else{
              this.setState({ready:true})                  
            }
          }, 1000);
          //hideLoadingMessage();
          //registerButtonEvents(audioPlayer);
        })();
      },1000)
    
    }

    makeSheet(){
      const { noteList, measureList, divisions, metric, title, alterations, textList } = this.state

      if(noteList.length === 0){
        return <Sheet title={title}>
          <Measure
            number={1}
            attributes={ <Attributes 
              divisions={divisions} 
              time={<Time beats={metric.beats} beatType={metric.beatType}/>}
              clef={<Clef sign={'G'} line={2}/>}
              keyAlterations={alterations}            
            />}
          >
          </Measure> 
        </Sheet>
      }

      let measureDuration = 0;
      let measureNotes = []
      let measures = []
      let measureIndex = 0
      let i = 0
      for( let note of noteList ){
        measureDuration += note.props.duration

        if(measureDuration > divisions*metric.beats){ // measure duration
          measureDuration = note.props.duration
          measureIndex++
          measureNotes = []
        }
        
        if( textList[i] !== undefined ){
          measureNotes.push(textList[i])
        }
        measureNotes.push(note)
        measures[measureIndex] = measureNotes
        i++
      }

      measureList.clear()
      i = 0
      for( let measure of measures ){
        measureList.push(
          <Measure key={i}
            number={i+1}
            attributes={ i === 0 ? 
              <Attributes 
                divisions={divisions} /* semiminima 1/4 = 960 )*/
                time={<Time beats={metric.beats} beatType={metric.beatType}/>} /* 2 da 1/4 */
                clef={<Clef sign={'G'} line={2}/>}
                keyAlterations={alterations}
              /> 
              : null 
            }>
            {measure} 
          </Measure>  
        )
        i++
      }

      return <Sheet title={title}>
        {measureList}
      </Sheet>
    }

    async loadAndRender(){
      let xml = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">'
      //const markup = ReactDomServer.renderToStaticMarkup(<TestSheet/>);
      const markup = ReactDomServer.renderToStaticMarkup(
         this.makeSheet()
      )
      xml += markup
      await window.osmd.load(xml)
      this.setState({xml: xml})
      await window.osmd.render();
      await window.audioPlayer.loadScore(window.osmd);
      window.audioPlayer.on('iteration', notes => {
        console.log(notes);
      });
    }

    componentDidUpdate(){
    }

    action(){
      const { noteList, alterations, divisions, currentAction, textList } = this.state
    
      const value = currentAction.toLowerCase()
      let info = value.split(' ')
      let note = null
      let type = "", step = ""

      switch(info[0]) {
        case "del":
          noteList.pop()

          this.setState({noteList: noteList})
          this.loadAndRender()
          return

        case "reset":
          this.setState({noteList: []})
          this.loadAndRender()
          return

        case "rest":
          type = info[1]
          if( 
            "whole half quarter eighth 16th".split(" ").contains(type)
          ) {
            console.log("Pausa " + type)
            note = <Note 
              type={type} 
              rest={true}
              duration={calcDuration(type, false, divisions)}
            />
          }
          noteList.push( note )
          this.setState({noteList: noteList, currentAction: ""})
          this.loadAndRender()
          break
        
        // alterazione su key ( linee )
        case "alter": // Non supportate!
          step = info[1]       // A, B, C..
          let accidental = info[2] // sharp / flat , diesis / bemolle
          if(
            "a b c d e f g".split(" ").contains(step) &&
            ["diesis", "bemolle"].contains(accidental)
          )
          {
            const alter = {step: step.toUpperCase(), accidental: accidental}
            alterations.push(alter)
            this.setState({alterations: alterations})
            this.loadAndRender()
          }
          return

        // Testo sopra alla nota
        case "text":
          // Inserisce testo sopra la nota
          const text = currentAction.split('text')[1].trim()
          let textUp = 
          <direction>
            <direction-type>
              <words default-y="19.95" relative-y="20.00">
              {text}
              </words>
              <words></words>
            </direction-type>
          </direction>
          textList[noteList.length] = textUp
          this.setState({textList: textList, currentAction: ""})
          //this.loadAndRender()
          Notification['success']({
            title:'Testo aggiunto',
            description:`"${text}"`
          })
          break

        default:
          step = info[0]
          const octave = info[1]
          type = info[2]
          if( 
            "a b c d e f g".split(" ").contains(step) &&
            (octave > 1 && octave < 7) &&
            "whole half quarter eighth 16th".split(" ").contains(type)
            ){
              const dot = info.contains("dot")
              const beam = this.getBeam(info)
              const tie = this.getTie(info)
              const alter = this.getAlter(info)
              
              console.log(
                step + " " + octave + " " + type + " ,dot " + dot + " ,tie " + tie, ", alter ", alter)
              note = <Note 
                step={step.toUpperCase()}
                octave={octave}
                type={type}
                dot={ dot ? true : false}
                beam={ beam ? beam : null}
                tie={tie}
                duration={calcDuration(type, dot, divisions)}
                alter={alter}
              />
            
              noteList.push( note )
              this.setState({noteList: noteList, currentAction: ""})
              this.loadAndRender()
          }

      }

      /* prova.. 
      if(note){
        noteList.push( note )
        this.setState({noteList: noteList, currentAction: ""})
        this.loadAndRender()

        
        setTimeout( ()=>{
          const notes = document.getElementsByClassName("vf-stavenote")
          let i = 0
          _.each(notes, (note, i)=>{
            console.log(note)
            note.addEventListener("mouseover", ()=> { 
              console.log(i) 
              window.audioPlayer.cursor.show()
              window.audioPlayer.jumpToStep(i)
            })
          })
        },1000)
        
      }
      */
    }

    getTie(info){
      let type = ''
      if(info.contains("tieb")) {
        return 'start'
      }
      else if (info.contains("tiee")) {
        return 'stop'
      }
      else {
        return null
      }
    }

    getBeam(info){
      const { beamNumber } = this.state
      let type = ''
      if(info.contains('beamb')){
        type = 'begin'
      } else if (info.contains("beamc")) {
        type = 'continue'
      }
      else if (info.contains("beame")){
        //this.setState({beamNumber: beamNumber+1})
        type = 'end'
      }
      else {
        return null
      }

      console.log("beam " + type)
      return <Beam number={beamNumber}>{type}</Beam>

    }

    getAlter(info){
      if( info.contains('bem')) { // bemolle
        return 'b'
      }
      else if( info.contains('die')) { // diesis
        return 'd'
      }
      return ''
    }

    render(){
      const { ready, currentAction, xml } = this.state
      return(
        <Container style={{display:"flex", flexDirection:"row"}}>
          <Panel shaded style={{flex:"0.2", padding:'10px'}}>
            <Input placeholder={"\"Titolo\" + ⏎ "} size='lg' 
              onChange={ (v) => this.setState({title:v})}
              onPressEnter={ () => this.loadAndRender() }
              style={{textAlign:'center'}}
            />
            <Input placeholder={"Metrica es: \"4/4\" + ⏎ "} size='lg'
              onChange={ (v) => this.setMetric(v) }
              onPressEnter={ () => this.loadAndRender() }
              style={{textAlign:'center'}}
            />
            <Input size='lg'
              placeholder={"Nota: \"G 4 half\" + ⏎ "}
              onChange={ _.debounce( (v) => this.setState({currentAction: v}), 100 ) }
              onPressEnter={ this.action.bind(this) }
              style={{textAlign:'center'}}
            />
            { !ready ? <Loader></Loader> :
                <Container className={"buttonbar"} style={{textAlign:"center"}}>                  
                  <Button onClick={()=>window.audioPlayer.play()}><Icon icon='play'/></Button>
                  <Button onClick={()=>window.audioPlayer.stop()}><Icon icon='stop'/></Button>
                  <Button onClick={()=>window.audioPlayer.pause()}><Icon icon='pause'/></Button>
                </Container>
            }
            <Istruzioni/>
          </Panel>
          <Panel header={'Composer'} shaded style={{flex:"0.8"}}>
            <div id="score"/>  
            <Divider><h3>MusicXML</h3></Divider>  
            <XMLViewer onClick={( (v) => window.v = v )} style={{textAlign:"left"}} xml={this.state.xml}/>
          </Panel>
        </Container>
      )
      
    }

    copy(e){
      window.e = e
    }

    setMetric(value){
      const values = value.split('/')
      let metric = {}
      try{
        metric = {
          beats: values[0],
          beatType: values[1]
        }
      }
      catch(e){
        alert("Metrica " + value + " errata")
        return
      }
      this.setState({metric:metric})
    }
}  
  
function Istruzioni(){
  return (
    <Panel collapsible header='Istruzioni'>
      <Divider>Note</Divider>
      <List bordered>
        <List.Item>A - LA</List.Item>
        <List.Item>B - SI</List.Item>
        <List.Item>C - DO</List.Item>
        <List.Item>D - RE</List.Item>
        <List.Item>E - MI</List.Item>
        <List.Item>F - FA</List.Item>
        <List.Item>G - SOL</List.Item>
      </List>
      <Divider>Durata</Divider>
      <List bordered>
        <List.Item>whole - intera</List.Item>
        <List.Item>half - metà</List.Item>
        <List.Item>quarter - 1/4</List.Item>
        <List.Item>eighth - 1/8</List.Item>
        <List.Item>16th - 1/16</List.Item>
        <List.Item>32th - 1/32</List.Item>
      </List>
      <Divider>Beam ( code )</Divider>
      <List bordered>
        <List.Item>beamb - bean begin</List.Item>
        <List.Item>beamc - bean continue</List.Item>
        <List.Item>beame - bean end</List.Item>
      </List>
      <Divider>Tie ( legature )</Divider>
      <List bordered>
        <List.Item>tieb - tie begin</List.Item>
        <List.Item>tiee - tie end</List.Item>
      </List>
      <Divider>Alterazioni</Divider>
      <List bordered>
        <List.Item>bem - bemolle (b)</List.Item>
        <List.Item>die - diesis (#)</List.Item>
      </List>
      <Divider>Altro</Divider>
      <List bordered>
        <List.Item>dot - punto</List.Item>
        <List.Item>del - delete nota</List.Item>
        <List.Item>reset - cancella tutto</List.Item>
      </List>
    </Panel>
  )
}
