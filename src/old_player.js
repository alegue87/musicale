
class OldPlayer extends React.Component{
    constructor(props){
      super(props)
  
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
          const osmd = new OpenSheetMusicDisplay(document.getElementById("score"));
          const audioPlayer = new window.OsmdAudioPlayer();
          window.audioPlayer = audioPlayer
          /*const scoreXml = await axios.get(
            "https://opensheetmusicdisplay.github.io/demo/sheets/MuzioClementi_SonatinaOpus36No3_Part1.xml"
          );*/
          //const scoreXml = await axios.get("http://localhost/note/assets/4zba3x0zkfwgsw8w")
          //const scoreXml = await axios.get("http://localhost/note/assets/t03nrnnn4rkkg04k")
          //const scoreXml = await axios.get("http://localhost/note/assets/ricnus2wvhck44cs")
          //const scoreXml = await axios.get("http://localhost/note/assets/9d0c5hil8w00ko40")
          const scoreXml = await axios.get("http://localhost/note/assets/jnsadsljwk088os8")
  
          await osmd.load(scoreXml.data);
          osmd.load(xml)
          await osmd.render();
          window.osmd = osmd
          await audioPlayer.loadScore(osmd);
          audioPlayer.on('iteration', notes => {
            console.log(notes);
          });
        
          //hideLoadingMessage();
          //registerButtonEvents(audioPlayer);
        })();
      },1000)
    
    }
    render(){
      return(null)
    }
  }