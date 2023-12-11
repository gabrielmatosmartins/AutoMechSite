import Table from 'react-bootstrap/Table';
import { TableRow } from './tableRow';

export function TableData(){
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <TableRow data1="1" data2="Troca de óleo" data3="R$120,00"/>
          <TableRow data1="3" data2="Instalação de Turbina Caterpillar 950g 966d 120h / 2500841" data3="R$6900,00"/>
        </tbody>
      </Table>
  );
}