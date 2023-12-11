import { DoubleInput } from './DoubleInput';
import { TableData } from './table/Table';

export function Historico(){
    return(
        <div className='normalBackground'>
            <div className='container'>     
                <DoubleInput
                    placeholder1 = "Descrição reparo"
                    placeholder2 = "Valor reparo"
                />
                
                <TableData/>
            </div>
        </div>
    );
}