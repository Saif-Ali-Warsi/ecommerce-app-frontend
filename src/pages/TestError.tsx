function TestError() {
  throw new Error("Testing Error Boundary");

  return (
    <>
      <h3>Error handling using Error Boundaries</h3>
    </>
  );
}

export default TestError;
