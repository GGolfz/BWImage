import { useEffect, useState } from "react";

function App() {
  const [size, setSize] = useState(32);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    handleRandomImage();
  }, []);
  const handleRandomImage = () => {
    const temp = Array(size)
      .fill(0)
      .map(() =>
        Array(size)
          .fill(0)
          .map(() => Math.random().toFixed(2))
      );
    setData(temp);
    setDisplay([...temp]);
  };
  const handleChangeDisplay = (e) => {
    setDisplay(JSON.parse(e.target.value));
  };
  const handleGenerateImage = () => {
    const dataText = document.getElementById("dataImage").value;
    console.log(dataText);
    setData(JSON.parse(dataText));
  };
  const handleEditSpecific = (i,j) =>{
    const val = prompt("Enter your value");
    try {
      let parsedValue = parseFloat(val).toFixed(2);
      if(parsedValue < 0 || parsedValue > 1) throw new Error("Value is out of bound");
      let temp =[...data]
      temp[i][j] = parsedValue
      setData(temp)
      setDisplay([...temp])
    } catch(err){
      console.log(err)
    }
  }
  const handleCopy = () => {
    var copyText = document.getElementById("dataImage");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }
  const renderImage = () => {
    return (
      <div style={{ display: "flex", flexFlow: "column" }}>
        {data.map((e, i) => (
          <div key={"row" + i} style={{ display: "flex" }}>
            {e.map((l, j) => (
              <div
                key={"col" + j}
                style={{
                  background: `rgba(0,0,0,${l})`,
                  maxWidth: `${100 / size}%`,
                  maxHeight: `${100 / size}%`,
                  width: "24px",
                  height: "24px",
                }}
                onClick={()=>handleEditSpecific(i,j)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div
      className="App"
      style={{
        width: "100vw",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{margin:'.25rem'}}>BWImage</h1>
      <textarea
        onChange={handleChangeDisplay}
        id="dataImage"
        style={{ width: "640px", margin: ".5rem" }}
        rows="10"
        value={JSON.stringify(display)}
      ></textarea>
      <div>
        <button style={{ margin: ".25rem" }} onClick={handleGenerateImage}>
          Generate
        </button>
        <button style={{ margin: ".25rem" }} onClick={handleRandomImage}>
          Random
        </button>
        <button style={{ margin: ".25rem" }} onClick={handleCopy}>
          Copy to clipboard
        </button>
      </div>
      <div
        style={{
          width: "90%",
          height: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderImage()}
      </div>
    </div>
  );
}

export default App;
