import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function Home() {
  return (
    <>
      <h1 className="text-center">Tours</h1>

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>Larry the Bird</td>
              <td>@facebook</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Ajay</td>
              <td>gorakhpur</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Home;
