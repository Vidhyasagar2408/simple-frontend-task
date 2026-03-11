import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");

  const [allUser, setallUser] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    setallUser([...allUser, {title, number}]);

    setTitle("");
    setNumber("");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          placeholder="enter name"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter phone number"
          value={number}
          required
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />

        <button>Submit</button>
      </form>

      {allUser.map(function (elem, idx) {
        return (
          <div className="details" key={idx}>
            <h4 className="h4">{elem.title}</h4>
            <p className="p">{elem.number}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
