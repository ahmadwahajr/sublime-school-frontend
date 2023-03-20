import React, { useState, useEffect } from "react";
import { Card } from "antd";
const gridStyle = {
  width: "25%",
  textAlign: "center"
};
function History({ data }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      console.log("DATA: ", data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);
  return (
    <div>
      {!loading && (
        <>
          {data.map((d, index) => (
            <Card
              key={index}
              title={`Date: ${d?.year}/${parseInt(d?.month) + 1}/${d?.date}`}
              style={{ marginBottom: "10px" }}
            >
              <Card.Grid style={gridStyle}>
                School fee: {d?.payment?.schoolFee}
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                Syllabus Fee: {d.payment?.syllabusFee}
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                Registration Fee: {d?.payment?.registrationFee}
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                Annual Fee: {d?.payment?.annualFee}
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                Late Fine: {d?.payment?.lateFine}
              </Card.Grid>
              {/* <Card.Grid style={gridStyle}>Content</Card.Grid> */}
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default History;
