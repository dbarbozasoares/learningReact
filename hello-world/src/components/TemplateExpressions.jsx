const TemplateExpressions = () => {
  const name = "Diego";
  const data = {
    age: 25,
    job: "developer",
  };
  return (
    <div>
      <h1>
        Ola {name}, voce tem {data.age} e trabalha como {data.job}
      </h1>
    </div>
  );
};

export default TemplateExpressions;
