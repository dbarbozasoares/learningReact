const Challenge = () => {
  const a = 5;
  const b = 6;
  console.log(
    `Imprimindo valores dentro do componente Challenge a(${a} + b(${b}) = ${parseInt(
      a + b
    )})`
  );

  const buttonClicked = () => {
    console.log(parseInt(a + b));
  };
  return <button onClick={buttonClicked}>SUM HERE</button>;
};

export default Challenge;
