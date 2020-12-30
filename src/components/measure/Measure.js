

export function Measure({number, attributes, children, width}){

    return(
        <measure number={number} width={width}>
            {attributes ? attributes : null}
            {children}
        </measure>
    )
}

