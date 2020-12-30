
import Sheet from './Sheet'
import { Measure } from "./measure/Measure"
import { Attributes, Time, Clef } from './measure/Attributes'
import { Note, Beam, Tie } from './measure/Note'


export function TestSheet({title, children}){

    return(
        <Sheet title="Sheet di prova">
            <Measure number={1} 
                attributes={
                    <Attributes 
                        divisions={960} /* semiminima 1/4 = 960 )*/
                        time={<Time beats={4} beatsType={4}/>} /* 2 da 1/4 */
                        clef={<Clef sign={'G'} line={2}/>}
                    />}
            >         

                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>begin</Beam>}/>
                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>continue</Beam>}/>

                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>continue</Beam>}/>
                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>continue</Beam>}/>
                
                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>continue</Beam>}/>      
                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>continue</Beam>}/>
                
                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>continue</Beam>}/>
                <Note step="G" type="eighth" divisions={960} beam={<Beam number={1}>end</Beam>}/>
            </Measure>
            <Measure number={2}>
                <Note step="G" type="quarter" divisions={960}/>
                <Note step="G" type="quarter" divisions={960}/>
                <Note step="G" type="quarter" divisions={960}/>
                <Note step="G" type="quarter" divisions={960}/>
            </Measure>

            <Measure number={3}>
                <Note step="G" type="half" divisions={960}/>
                <Note step="G" type="half" divisions={960}/>
            </Measure>


            <Measure number={4}>
                <Note step="G" type="whole" divisions={960}/>
            </Measure>
        </Sheet>
    )
}

