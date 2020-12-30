
export function Attributes({divisions, time, clef, keyAlterations}){

    let alterations = []
    if( keyAlterations ) {
        for( let alteration of keyAlterations ){
            alterations.push(<key-step>{alteration.step}</key-step>)
            if(alteration.accidental === "bemolle"){
                alterations.push(<key-alter>-1</key-alter>)
                alterations.push(<key-accidental>flat</key-accidental>)
            }
            else if(alteration.accidental === "diesis"){
                alterations.push(<key-alter>1</key-alter>)
                alterations.push(<key-accidental>sharp</key-accidental>)
            }
        }
    }
    return(
        <attributes>
            <divisions>{divisions}</divisions>
            <key>
                <fifths>0</fifths>
                {alterations}
            </key>
            {time}
            {clef}
        </attributes>
    )
}

export function Time({beats, beatType}){
    return(
        <time>
            <beats>{beats}</beats>
            <beat-type>{beatType}</beat-type>
        </time>
    )
}

export function Clef({sign, line}){
    return(
        <clef>
            <sign>{sign}</sign>
            <line>{line}</line>
        </clef>
    )
}