const Cooldown = ({ cooldown }) => {
  return (
    <div data-testid="cooldown-text-div">
      <p>A user can only play brain once a day. </p>
      <p> Please come back in {cooldown} hours</p>
    </div>
  );
};

export default Cooldown;
