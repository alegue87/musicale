import React from 'react'

export class Note extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const { 
            step,       // 'A', 'B', 'C'...
            octave,     // 4, 5..
            type,       // whole, quarter..
            beam,       // <Beam/>
            tie,        // start, stop
            dot,        // yes/no
            duration,   //
            rest,       // yes/no
            alter       // d diesis(sharp), b bemolle(flat)
        } = this.props
        
        if( rest ) {
            return (
                <note>
                    <rest/>
                    <duration>{duration}</duration>
                    <voice>1</voice>
                    <type>{type ? type : 'quarter'}</type>
                </note>
            )
        }
        else {
            let alteration
            switch(alter){
                case 'd': // sharp, Diesis
                    alteration = <alter>1</alter>
                    break
                case 'b': // flat, Bemolle
                    alteration = <alter>-1</alter>
            }
            return (
            <note>
                <pitch>
                    <step>{step}</step>
                    <octave>{octave ? octave : 4}</octave>
                    {alteration}
                </pitch>
                <duration>{duration}</duration>
                <voice>1</voice>
                <type>{type ? type : 'quarter'}</type>
        
                <stem>up</stem>                   {/*gambo*/}
                {beam}                            {/*bandiera*/}
        
                { dot ? <dot/> : null }
        
                { tie ? <tie type={tie}/> : null} {/*legatura*/}
                { tie ? <notations><tied type={tie}/></notations> : null} {/*legatura*/}
            </note>
            )
        }
    }
    
}

export function calcDuration(type, dot, divisions){

    let duration = 0;
    switch(type){
        case 'whole':
            duration = divisions*4
            break
        case 'half':
            duration = divisions*2
            break
        case 'quarter':
            duration = divisions/1
            break;
        case 'eighth':
            duration = divisions/2
            break
        case '16th':
            duration = divisions/4
    }
    if(dot === true){
        duration += duration/2
    }
    return duration
}




export function Note_({ 
    step,       // 'A', 'B', 'C'...
    octave,     // 4, 5..
    type,       // whole, quarter..
    beam,       // <Beam/>
    tie,        // start, stop
    dot,        // yes/no
    divisions   //
    }){

    let duration = 0;
    switch(type){
        case 'whole':
            duration = divisions*4
            break
        case 'half':
            duration = divisions*2
            break
        case 'quarter':
            duration = divisions/1
            break;
        case 'eighth':
            duration = divisions/2
            break
        case '16th':
            duration = divisions/4
    }
    if(dot === true){
        duration += duration/2
    }
    return(
    <note>
        <pitch>
            <step>{step}</step>
            <octave>{octave ? octave : 4}</octave>
        </pitch>
        <duration>{duration}</duration>
        <voice>1</voice>
        <type>{type ? type : 'quarter'}</type>

        <stem>up</stem>                   {/*gambo*/}
        {beam}                            {/*bandiera*/}

        { dot ? <dot/> : null }

        { tie ? <tie type={tie}/> : null} {/*legatura*/}
        { tie ? <notations><tied type={tie}/></notations> : null} {/*legatura*/}
    </note>
    )
}

export function Beam({number, children}){
    /* children = begin, continue, end */
    return(<beam number={number}>{children}</beam>)
}

export function Tie({type /* start,stop */}){
    return(
        <tie type={type}/>
    )
}