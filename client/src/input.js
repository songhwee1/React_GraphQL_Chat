
import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
const write = gql`
  mutation write($writer: String!, $description: String!) {
    write(writer: $writer, description: $description)
  }
`;

const Input = () => {
  const [writer, setWriter] = useState("");
  useEffect(() => {
    const writer = prompt('Name');
    setWriter(writer);
  }, []);
  const [description, setDescription] = useState("");
  const [mutation] = useMutation(write, {
    variables: {
      writer,
      description
    }
  });

  return (
    <div>
      <input
        type="text"
        value={description}
        placeholder="내용을 입력하세요"
        onChange={e => {
          setDescription(e.target.value);
        }}
        onKeyPress={e => {
          if(e.key === 'Enter') {
            setDescription("");
            mutation();
          }
        }}
      />
      <button
        onClick={() => {
          setDescription("");
          mutation();
        }}
      >
        확인
      </button>
    </div>
  );
};

export default Input;