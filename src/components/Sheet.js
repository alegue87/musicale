

export default function Sheet({title, children}){
    return(
    <score-partwise>
        <work><work-title>{title}</work-title></work>
        <part-list>
            <score-part id="P1">
                <part-name>Piano</part-name>
                <part-abbreviation>Pno.</part-abbreviation>
                <score-instrument id="P1-I1">
                    <instrument-name>Piano</instrument-name>
                </score-instrument>
                <midi-device id="P1-I1" port="1"></midi-device>
                <midi-instrument id="P1-I1">
                    <midi-channel>1</midi-channel>
                    <midi-program>1</midi-program>
                </midi-instrument>
            </score-part>
        </part-list>
        <part id="P1">
            {children}
        </part>
    </score-partwise>
    )
}